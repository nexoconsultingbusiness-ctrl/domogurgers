"use client";

import { useRef, useState } from "react";
import {
  buildFeedbackWhatsAppUrl,
  FEEDBACK_COMMENT_MAX_LENGTH,
  FEEDBACK_NAME_MAX_LENGTH,
  type FeedbackDetails,
  type FeedbackErrors,
  validateFeedback,
} from "./feedback-message";
import styles from "./feedback.module.css";

export function FeedbackForm({ phone }: { phone: string | null }) {
  const [details, setDetails] = useState<FeedbackDetails>({
    name: "",
    comment: "",
  });
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [formError, setFormError] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const commentInput = useRef<HTMLTextAreaElement>(null);

  function updateField(field: keyof FeedbackDetails, value: string) {
    setDetails((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setFormError("");
  }

  function submitFeedback(formData: FormData) {
    const submitted = {
      name: String(formData.get("name") ?? ""),
      comment: String(formData.get("comment") ?? ""),
    };
    const nextErrors = validateFeedback(submitted);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.comment) {
      (nextErrors.name ? nameInput : commentInput).current?.focus();
      return;
    }
    const url = buildFeedbackWhatsAppUrl(phone, submitted);
    if (!url) {
      setFormError(
        "No pudimos abrir WhatsApp. Intenta enviar tu comentario más tarde.",
      );
      return;
    }
    window.location.assign(url);
  }

  return (
    <form
      className={styles.form}
      action={submitFeedback}
      noValidate
      aria-label="Deja tu comentario a la sede Yopal"
      aria-describedby="feedback-whatsapp-note"
    >
      <div className={styles.field}>
        <label htmlFor="feedback-name">Tu nombre</label>
        <input
          ref={nameInput}
          id="feedback-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ej: Camila"
          required
          maxLength={FEEDBACK_NAME_MAX_LENGTH}
          value={details.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "feedback-name-error" : undefined}
        />
        {errors.name && (
          <p id="feedback-name-error" className={styles.error}>
            {errors.name}
          </p>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="feedback-comment">Tu comentario</label>
        <textarea
          ref={commentInput}
          id="feedback-comment"
          name="comment"
          placeholder="Cuéntanos tu experiencia..."
          required
          maxLength={FEEDBACK_COMMENT_MAX_LENGTH}
          rows={4}
          value={details.comment}
          onChange={(event) => updateField("comment", event.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={
            "feedback-count" + (errors.comment ? " feedback-comment-error" : "")
          }
        />
        <span id="feedback-count" className={styles.count}>
          {details.comment.length}/{FEEDBACK_COMMENT_MAX_LENGTH}
        </span>
        {errors.comment && (
          <p id="feedback-comment-error" className={styles.error}>
            {errors.comment}
          </p>
        )}
      </div>
      {!phone && (
        <p className={styles.error} role="status">
          Los comentarios por WhatsApp no están disponibles en este momento.
        </p>
      )}
      {formError && (
        <p className={styles.error} role="alert">
          {formError}
        </p>
      )}
      <button className={styles.submit} type="submit" disabled={!phone}>
        Enviar comentario
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
        </svg>
      </button>
      <p id="feedback-whatsapp-note" className={styles.whatsappNote}>
        Se abrirá WhatsApp de Yopal para que revises y envíes tu comentario.
      </p>
      <noscript>
        <p className={styles.error}>
          Activa JavaScript para preparar tu comentario en WhatsApp.
        </p>
      </noscript>
    </form>
  );
}
