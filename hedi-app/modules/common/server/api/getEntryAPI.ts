import { NextApiHandler } from "next";
import { replaceUsingIndex, sendAPIResult } from "@/modules/common/utils";
import { GQArticleEntry } from "@/modules/editorial/article/server/gqTypes/GQIArticleEntry";
import { isIGlossaryTerm } from "@/modules/editorial/glossary/types";
import { GQGlossaryTerm } from "@/modules/editorial/glossary/gqTypes/GQIGlossaryTerm";
import { GQBusinessProfileEntry } from "@/modules/profile/server/gqTypes/GQBusinessProfileEntry";
import { getIEntitiesTranslated } from "../query";
import { IEntry } from "../../types/IEntry";

export const getEntryAPI: NextApiHandler<IEntry | null> = async (req, res) => {
  const {
    query: { route, dstLang },
  } = req;

  const gqTypes = [GQArticleEntry, GQGlossaryTerm, GQBusinessProfileEntry];

  const entities = await getIEntitiesTranslated<IEntry>(
    gqTypes,
    Array.isArray(route) ? route : [route],
    undefined,
    Array.isArray(dstLang) ? dstLang[0] : dstLang
  );
  const entity = entities?.[0];
  if (entity && isIGlossaryTerm(entity)) {
    const route = entity.route;
    entity.route = replaceUsingIndex(route, route.lastIndexOf("/"), "#");
  }
  sendAPIResult(res, entity, true);
};
