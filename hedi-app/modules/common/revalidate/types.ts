export type BuildEnv = "local" | "staging" | "production" | "sandbox";

export type ContentType =
  | "article"
  | "category"
  | "topics"
  | "glossary"
  | "faq"
  | "about"
  | "organisation"
  | "professional"
  | "midwife";

export type RevalidateValue = number | true;

export type RevalidationConfig = Record<ContentType, RevalidateValue>;
