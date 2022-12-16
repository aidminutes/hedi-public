import { RevalidationConfig } from "./types";

export const defaultConfig: RevalidationConfig = {
  // editorial
  article: true,
  category: true,
  topics: true,
  glossary: true,
  // special pages
  faq: true,
  about: true,
  // profile
  organisation: true,
  professional: true,
  midwife: true,
};
