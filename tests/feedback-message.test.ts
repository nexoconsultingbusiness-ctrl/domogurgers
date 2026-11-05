import assert from "node:assert/strict";
import test from "node:test";
import { resolveWhatsAppPhones } from "../src/config/catalog-phones";
import {
  buildFeedbackWhatsAppUrl,
  FEEDBACK_COMMENT_MAX_LENGTH,
  FEEDBACK_NAME_MAX_LENGTH,
  type FeedbackDetails,
  validateFeedback,
} from "../src/features/brand/feedback-message";

const feedback: FeedbackDetails = {
  name: "Camila",
  comment: "La hamburguesa estuvo deliciosa.",
};

test("feedback uses Yopal's configured contact without rerouting to Maní or the legacy global number", () => {
  const defaultPhones = resolveWhatsAppPhones({
    WHATSAPP_NUMBER: "573213390551",
    WHATSAPP_MANI_NUMBER: "573009876543",
  });
  const defaultUrl = new URL(
    buildFeedbackWhatsAppUrl(defaultPhones.yopal, feedback)!,
  );
  assert.equal(defaultUrl.origin, "https://wa.me");
  assert.equal(defaultUrl.pathname, "/573112567920");
  assert.notEqual(defaultUrl.pathname, `/${defaultPhones.mani}`);
  assert.match(defaultUrl.searchParams.get("text")!, /D’omo Burgers Yopal/);

  const overriddenPhones = resolveWhatsAppPhones({
    WHATSAPP_YOPAL_NUMBER: " +57 (300) 123-4567 ",
    WHATSAPP_NUMBER: "573213390551",
  });
  assert.equal(
    new URL(buildFeedbackWhatsAppUrl(overriddenPhones.yopal, feedback)!)
      .pathname,
    "/573001234567",
  );

  const invalidPhones = resolveWhatsAppPhones({
    WHATSAPP_YOPAL_NUMBER: "invalid",
  });
  assert.equal(buildFeedbackWhatsAppUrl(invalidPhones.yopal, feedback), null);
  for (const invalidPhone of [
    "",
    "+573112567920",
    "57311 2567920",
    "0573112567920",
    "1234567",
    "1234567890123456",
    "573112567920?text=other",
  ]) {
    assert.equal(buildFeedbackWhatsAppUrl(invalidPhone, feedback), null);
  }
});

test("empty or whitespace-only fields prevent navigation and identify the field to complete", () => {
  for (const blank of ["", " \t\n ", "\u00a0\u2003"]) {
    assert.equal(
      validateFeedback({ ...feedback, name: blank }).name,
      "Escribe tu nombre.",
    );
    assert.equal(
      validateFeedback({ ...feedback, comment: blank }).comment,
      "Escribe tu comentario.",
    );
    assert.equal(
      buildFeedbackWhatsAppUrl("573112567920", { ...feedback, name: blank }),
      null,
    );
    assert.equal(
      buildFeedbackWhatsAppUrl("573112567920", { ...feedback, comment: blank }),
      null,
    );
  }
  assert.deepEqual(validateFeedback({ name: "", comment: "" }), {
    name: "Escribe tu nombre.",
    comment: "Escribe tu comentario.",
  });
});

test("field limits match native UTF-16 maxlength counting and never silently truncate feedback", () => {
  const maximum: FeedbackDetails = {
    name: "a".repeat(FEEDBACK_NAME_MAX_LENGTH - 2) + "🍔",
    comment: "b".repeat(FEEDBACK_COMMENT_MAX_LENGTH - 2) + "🍔",
  };
  assert.deepEqual(validateFeedback(maximum), {});
  const message = new URL(
    buildFeedbackWhatsAppUrl("573112567920", maximum)!,
  ).searchParams.get("text")!;
  assert.ok(message.includes(`Nombre: ${maximum.name}\n\n`));
  assert.ok(message.endsWith(maximum.comment));

  for (const field of ["name", "comment"] as const) {
    // Raw trailing spaces still count toward the same limit as the HTML input.
    const overLimit = { ...maximum, [field]: maximum[field] + " " };
    assert.match(
      validateFeedback(overLimit)[field]!,
      /Usa hasta \d+ caracteres/,
    );
    assert.equal(buildFeedbackWhatsAppUrl("573112567920", overLimit), null);
  }
});

test("WhatsApp preserves multiline comments and safely encodes punctuation, emoji, and incomplete Unicode", () => {
  const details: FeedbackDetails = {
    name: "  María\t José\nGómez  ",
    comment:
      "  ¡Buen sabor! & salsa #1 + queso 🍔\n\nVolveré con mi familia.  ",
  };
  const url = new URL(buildFeedbackWhatsAppUrl("573112567920", details)!);
  assert.equal(url.hash, "");
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  assert.equal(
    url.searchParams.get("text"),
    "Hola D’omo Burgers Yopal, quiero compartir un comentario:\n\nNombre: María José Gómez\n\nComentario:\n¡Buen sabor! & salsa #1 + queso 🍔\n\nVolveré con mi familia.",
  );

  const incompleteUnicode = buildFeedbackWhatsAppUrl("573112567920", {
    name: "Ana\ud800",
    comment: "Gracias\udc00",
  });
  assert.ok(incompleteUnicode);
  assert.match(
    new URL(incompleteUnicode).searchParams.get("text")!,
    /Nombre: Ana\ufffd\n\nComentario:\nGracias\ufffd$/,
  );
});
