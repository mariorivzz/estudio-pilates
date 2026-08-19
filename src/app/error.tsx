'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <span className="text-6xl block mb-6">🧘</span>
        <h2 className="text-2xl font-semibold text-secondary mb-3">
          Algo salió mal
        </h2>
        <p className="text-muted mb-8">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
        <button
          onClick={reset}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Volver a intentar
        </button>
      </div>
    </div>
  );
}
