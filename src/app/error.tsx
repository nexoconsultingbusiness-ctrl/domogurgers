"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container status-page" role="alert">
      <h1>Algo no salió como esperábamos.</h1>
      <p>No pudimos cargar esta página. Puedes intentarlo de nuevo.</p>
      <button className="button-primary" type="button" onClick={reset}>
        Volver a intentar
      </button>
    </section>
  );
}
