import { BuildEnv, RevalidationConfig } from "./types";

export const buildConfigs: { [K in BuildEnv]?: Partial<RevalidationConfig> } = {
  staging: {
    article: 5,
    category: 5,
    topics: 5,
    glossary: 5,
    faq: 5,
    about: 5,
    organisation: 5,
    professional: 5,
    midwife: 5,
  },
  production: {
    // NOTE think about if it makes sense to define production config without default fallback
    article: 1000,
    category: 1000,
    topics: 1000,
    glossary: 1000,
    faq: 1000,
    about: 1000,
    organisation: 30,
    professional: 30, // TODO if user are able to edit their profile, this should be set to 'true'
    midwife: 30,
  },
};
