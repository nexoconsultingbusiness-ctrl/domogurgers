export type FeedbackDetails = {
  name: string;
  comment: string;
};

export type FeedbackErrors = Partial<Record<keyof FeedbackDetails, string>>;

export const FEEDBACK_NAME_MAX_LENGTH = 80;
export const FEEDBACK_COMMENT_MAX_LENGTH = 500;

export function validateFeedback(details: FeedbackDetails): FeedbackErrors {
  const errors: FeedbackErrors = {};

  if (!details.name.trim()) {
    errors.name = "Escribe tu nombre.";
  } else if (details.name.length > FEEDBACK_NAME_MAX_LENGTH) {
    errors.name = `Usa hasta ${FEEDBACK_NAME_MAX_LENGTH} caracteres en tu nombre.`;
  }

  if (!details.comment.trim()) {
    errors.comment = "Escribe tu comentario.";
  } else if (details.comment.length > FEEDBACK_COMMENT_MAX_LENGTH) {
    errors.comment = `Usa hasta ${FEEDBACK_COMMENT_MAX_LENGTH} caracteres en tu comentario.`;
  }

  return errors;
}

export function buildFeedbackWhatsAppUrl(
  phone: string | null,
  details: FeedbackDetails,
): string | null {
  if (
    !phone ||
    !/^[1-9]\d{7,14}$/.test(phone) ||
    Object.keys(validateFeedback(details)).length > 0
  ) {
    return null;
  }

  const name = details.name.trim().replace(/\s+/g, " ");
  const comment = details.comment.trim();
  const message = `Hola D’omo Burgers Yopal, quiero compartir un comentario:\n\nNombre: ${name}\n\nComentario:\n${comment}`;
  const params = new URLSearchParams({ text: message });

  return `https://wa.me/${phone}?${params.toString()}`;
}
