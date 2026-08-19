'use client';

import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import { useState } from 'react';
import { TbBrandInstagram, TbMenu2, TbX, TbYoga } from 'react-icons/tb';

const navLinks = [
  { href: '#inicio',    label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#citas',     label: 'Reservar' },
  { href: '#contacto',  label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Navbar principal */}
      <nav className="bg-white/96 backdrop-blur-md shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:bg-primary-dark transition-colors">
                <TbYoga className="text-white" size={20} />
              </div>
              <div className="leading-tight">
                <span className="font-serif text-secondary font-semibold text-lg tracking-tight block lowercase">
                  calma <span className="text-primary">studio</span>
                </span>
                <span className="text-muted text-xs">{siteConfig.city}</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-primary transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#citas"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md"
              >
                Reserva tu clase
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-secondary p-2 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <TbX size={26} /> : <TbMenu2 size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-border animate-fade-in">
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-secondary hover:text-primary transition-colors py-2.5 border-b border-border last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 space-y-2">
                <a
                  href="#citas"
                  onClick={() => setIsOpen(false)}
                  className="block bg-primary text-white text-center px-6 py-3 rounded-full font-semibold"
                >
                  Reserva tu clase
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-full font-semibold text-sm"
                >
                  <TbBrandInstagram size={16} />
                  Síguenos en Instagram
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
