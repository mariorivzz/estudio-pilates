'use client';

import BookingEmbed from '@/components/BookingEmbed';
import ScrollReveal from '@/components/ScrollReveal';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppUrl, formatDateES, getTomorrowDate } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import {
    TbArrowRight,
    TbBrandWhatsapp,
    TbCalendar,
    TbCalendarWeek,
    TbCheck,
    TbNotes,
    TbPhone,
    TbUser,
    TbYoga
} from 'react-icons/tb';

interface FormData {
  nombre: string;
  telefono: string;
  tipoClase: string;
  nivel: string;
  fecha: string;
  horario: string;
  notas: string;
  consentimiento: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const tiposClase = [
  'Pilates Reformer',
  'Pilates Suelo (Mat)',
  'Barre',
  'Asesoría de Nutrición',
  'No lo sé todavía',
];

const niveles = [
  'Iniciación',
  'Intermedio',
  'Avanzado',
];

const horarios = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '17:00', '18:00', '19:00', '20:00',
];

const INITIAL_FORM: FormData = {
  nombre: '',
  telefono: '',
  tipoClase: '',
  nivel: 'Iniciación',
  fecha: '',
  horario: '',
  notas: '',
  consentimiento: false,
};

/** Con proveedor de reservas dado de alta se muestra su calendario; si no, el formulario a WhatsApp. */
const useBookingWidget = siteConfig.booking.enabled && siteConfig.booking.embedUrl.length > 0;

export default function CitasSection() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (formData.nombre.trim().length < 2) next.nombre = 'Introduce tu nombre';
    if (!/^[679]\d{8}$/.test(formData.telefono.replace(/\s/g, '')))
      next.telefono = 'Teléfono no válido (9 dígitos)';
    if (!formData.tipoClase) next.tipoClase = 'Elige el tipo de clase';
    if (!formData.fecha) next.fecha = 'Elige una fecha';
    if (!formData.consentimiento)
      next.consentimiento = 'Necesitamos tu consentimiento para poder contactarte';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.phone,
    `Hola, quisiera reservar una clase:\n\n👤 Nombre: ${formData.nombre}\n📞 Teléfono: ${formData.telefono}\n🧘 Clase: ${formData.tipoClase} (${formData.nivel})\n📅 Fecha preferida: ${formatDateES(formData.fecha)}${formData.horario ? ` a las ${formData.horario}` : ''}\n${formData.notas ? `📝 Notas: ${formData.notas}` : ''}`
  );

  if (submitted) {
    return (
      <section id="citas" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary-bg rounded-3xl p-12 border border-border">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TbCheck className="text-primary" size={36} />
            </div>
            <h3 className="text-3xl font-bold text-secondary mb-3">¡Solicitud lista!</h3>
            <p className="text-muted text-lg mb-2">
              Tus datos están preparados. Confirma tu reserva por WhatsApp para que podamos recibirla.
            </p>
            <p className="text-muted text-sm mb-8">
              También puedes llamarnos al <strong className="text-secondary">{siteConfig.phone.replace('+34 ', '')}</strong>
            </p>

            {/* Resumen */}
            <div className="bg-white rounded-xl p-6 text-left space-y-2.5 mb-8 border border-border">
              <p className="text-sm"><span className="font-semibold text-secondary">Clase:</span> <span className="text-muted">{formData.tipoClase} ({formData.nivel})</span></p>
              <p className="text-sm"><span className="font-semibold text-secondary">Fecha:</span> <span className="text-muted">{formatDateES(formData.fecha)}{formData.horario ? ` · ${formData.horario}h` : ''}</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-3.5 rounded-full font-semibold transition-colors"
              >
                <TbBrandWhatsapp size={20} />
                Confirmar por WhatsApp
              </a>
              <button
                onClick={() => { setSubmitted(false); setFormData(INITIAL_FORM); }}
                className="inline-flex items-center justify-center gap-2 border border-border text-muted hover:text-primary hover:border-primary px-7 py-3.5 rounded-full font-medium transition-colors text-sm"
              >
                Nueva solicitud
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="citas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info lateral */}
          <ScrollReveal animation="slide-left">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Reserva online
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-4 leading-tight">
              Reserva tu clase
            </h2>
            <div className="section-divider-left mb-6" />
            <p className="text-muted text-lg leading-relaxed mb-10">
              {useBookingWidget
                ? 'Elige el día y la hora que mejor te vengan y reserva tu plaza al instante.'
                : 'Rellena el formulario y te confirmamos la plaza por WhatsApp o teléfono en el mismo día.'}
            </p>

            {/* Puntos clave */}
            <div className="space-y-5">
              {[
                useBookingWidget
                  ? {
                      icon: TbCalendar,
                      title: 'Reserva inmediata',
                      desc: 'Consulta las plazas libres y confirma en el momento.',
                    }
                  : {
                      icon: TbCalendar,
                      title: 'Confirmación rápida',
                      desc: 'Te contactamos el mismo día para confirmar tu plaza.',
                    },
                {
                  icon: TbYoga,
                  title: 'Pilates, Barre o Nutrición',
                  desc: 'Adaptamos cada clase o consulta a tus objetivos y a tu nivel.',
                },
                {
                  icon: TbPhone,
                  title: 'También por teléfono',
                  desc: `Llámanos directamente al ${siteConfig.phone.replace('+34 ', '')}.`,
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary-bg rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary text-sm">{title}</h4>
                    <p className="text-muted text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Horario */}
            <div className="mt-10 bg-primary-bg rounded-2xl p-6 border border-border">
              <p className="font-semibold text-secondary text-sm mb-3 flex items-center gap-2">
                <TbCalendarWeek className="text-primary" size={16} />
                Horario del centro
              </p>
              <div className="space-y-1.5 text-sm text-muted">
                <p><span className="text-secondary font-medium">Lunes – Jueves</span>  {siteConfig.hours.lunes}</p>
                <p><span className="text-secondary font-medium">Viernes</span>  {siteConfig.hours.viernes}</p>
                <p><span className="text-secondary font-medium">Sábado</span>  {siteConfig.hours.sabado}</p>
                <p><span className="text-muted font-medium">Domingo</span>  {siteConfig.hours.domingo}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Calendario del proveedor o, mientras no lo haya, formulario a WhatsApp */}
          {useBookingWidget ? (
            <ScrollReveal animation="fade-in-up" delay={200}>
              <BookingEmbed />
            </ScrollReveal>
          ) : (
          <ScrollReveal className="card p-8" animation="fade-in-up" delay={200}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-secondary mb-1.5">
                  Tu nombre <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <TbUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={17} />
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre y apellidos"
                    autoComplete="name"
                    maxLength={100}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-background border rounded-xl outline-none transition-colors
                      ${errors.nombre ? 'border-primary' : 'border-border focus:border-primary'}`}
                  />
                </div>
                {errors.nombre && <p className="text-primary text-xs mt-1">{errors.nombre}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-secondary mb-1.5">
                  Teléfono de contacto <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <TbPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={17} />
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="612 345 678"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={15}
                    className={`w-full pl-10 pr-4 py-3 text-sm bg-background border rounded-xl outline-none transition-colors
                      ${errors.telefono ? 'border-primary' : 'border-border focus:border-primary'}`}
                  />
                </div>
                {errors.telefono && <p className="text-primary text-xs mt-1">{errors.telefono}</p>}
              </div>

              {/* Tipo de clase + nivel en fila */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tipoClase" className="block text-sm font-medium text-secondary mb-1.5">
                    Tipo de clase <span className="text-primary">*</span>
                  </label>
                  <select
                    id="tipoClase"
                    name="tipoClase"
                    value={formData.tipoClase}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm bg-background border rounded-xl outline-none transition-colors
                      ${errors.tipoClase ? 'border-primary' : 'border-border focus:border-primary'}`}
                  >
                    <option value="">Selecciona</option>
                    {tiposClase.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  {errors.tipoClase && <p className="text-primary text-xs mt-1">{errors.tipoClase}</p>}
                </div>
                <div>
                  <label htmlFor="nivel" className="block text-sm font-medium text-secondary mb-1.5">
                    Nivel
                  </label>
                  <select
                    id="nivel"
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                  >
                    {niveles.map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              {/* Fecha + horario en fila */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fecha" className="block text-sm font-medium text-secondary mb-1.5">
                    Fecha preferida <span className="text-primary">*</span>
                  </label>
                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={handleChange}
                    min={getTomorrowDate()}
                    className={`w-full px-4 py-3 text-sm bg-background border rounded-xl outline-none transition-colors
                      ${errors.fecha ? 'border-primary' : 'border-border focus:border-primary'}`}
                  />
                  {errors.fecha && <p className="text-primary text-xs mt-1">{errors.fecha}</p>}
                </div>
                <div>
                  <label htmlFor="horario" className="block text-sm font-medium text-secondary mb-1.5">
                    Horario preferido
                  </label>
                  <select
                    id="horario"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Sin preferencia</option>
                    {horarios.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              {/* Notas */}
              <div>
                <label htmlFor="notas" className="block text-sm font-medium text-secondary mb-1.5">
                  Notas adicionales
                </label>
                <div className="relative">
                  <TbNotes className="absolute left-3.5 top-3.5 text-muted" size={17} />
                  <textarea
                    id="notas"
                    name="notas"
                    rows={3}
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder="Preferencias de horario, dudas sobre las clases…"
                    maxLength={500}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                {/* Evita recoger datos de salud (art. 9 RGPD) por un canal no cifrado
                    extremo a extremo bajo nuestro control — se preguntan en el estudio. */}
                <p className="text-muted text-xs mt-1.5">
                  No incluyas datos de salud (lesiones, embarazo, patologías). Los valoraremos
                  contigo en el estudio antes de tu primera clase.
                </p>
              </div>

              {/* Consentimiento explícito (art. 6.1.a RGPD) — sin marcar por defecto */}
              <div>
                <label htmlFor="consentimiento" className="flex items-start gap-3 cursor-pointer">
                  <input
                    id="consentimiento"
                    name="consentimiento"
                    type="checkbox"
                    checked={formData.consentimiento}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 shrink-0 accent-primary"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    He leído y acepto la{' '}
                    <Link
                      href="/privacidad"
                      className="text-primary underline hover:text-primary-dark"
                    >
                      política de privacidad
                    </Link>{' '}
                    y autorizo a {siteConfig.businessName} a usar mis datos para gestionar esta
                    solicitud de reserva. <span className="text-primary">*</span>
                  </span>
                </label>
                {errors.consentimiento && (
                  <p className="text-primary text-xs mt-1">{errors.consentimiento}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition-colors text-base"
              >
                Solicitar reserva
                <TbArrowRight size={18} />
              </button>

              <p className="text-center text-xs text-muted">
                Al enviar se abre WhatsApp con tu solicitud redactada: los datos viajan por
                WhatsApp (Meta) y no se envían a ningún otro servidor.
              </p>
            </form>
          </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
