import { GQString, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIEntityTranslated } from "@/modules/model/server";
import { IGlossaryTerm } from "../types";

export const GQIGlossaryTerm: IGlossaryTerm = {
  ...GQIEntityTranslated,
  body: GQString,
  germanTerm: GQString,
};

export const GQGlossaryTerm = withInlineFragment(
  GQIGlossaryTerm,
  "GlossaryTerm"
);
