import { withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { gqPregnancy } from "./GQPregnancy";
import { IPregnancyEntry } from "../../types";

const gqPregnancyEntry: IPregnancyEntry = gqPregnancy;

export const GQPregnancyEntry = withInlineFragment(
  gqPregnancyEntry,
  "Pregnancy"
);
