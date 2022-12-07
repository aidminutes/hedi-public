import { gqPick, withAlias, withArgs } from "@/modules/graphql/server/gq-ts";
import { GQILanguage } from "@/modules/common/server/gqTypes/GQILanguage";
import { GQIPage } from "@/modules/common/server/gqTypes/GQIPage";

import { ShellResponse } from "../query/getShell";

const gqShellPage = withAlias(
  withArgs({ shellPage: [gqPick(GQIPage, ["components"])] }, "shellPage", {
    ids: ["shellConfigs"],
    lang: "$lang",
  }),
  "shellPage",
  "pagesById"
);

const gqLanguages = withArgs({ languages: [GQILanguage] }, "languages", {
  routes: "$locales",
  lang: "$lang",
});

export const GQShellResponse: ShellResponse = {
  ...gqShellPage,
  ...gqLanguages,
};
