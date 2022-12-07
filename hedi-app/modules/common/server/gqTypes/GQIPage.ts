import { Component } from "@/modules/components/types/IComponent";
import { GQScalar, withInlineFragment } from "@/modules/graphql/server/gq-ts";
import { GQIEntityTranslated } from "@/modules/model/server";
import { IPage, PageVisibility } from "../../types/IPage";
import { GQIPageEntry } from "./GQIPageEntry";

export const GQIPage: IPage = {
  ...GQIEntityTranslated,
  ...GQIPageEntry,
  visibility: GQScalar<PageVisibility>(),
  components: [GQScalar<Component>()],
};

export const GQPage = withInlineFragment(GQIPage, "Page");
