import { getPageById } from "@/modules/common/server";
import { DefinitionCache } from "@/modules/common/server/cache/DefinitionCache";
import { NextApiHandler } from "next";
import { useRouter } from "next/router";
import { IPage } from "../../types";
import { sendAPIResult } from "../../utils";
import { getPageType } from "../page";

export const getPageByIdAPI: NextApiHandler<IPage | null> = async (
  req,
  res
) => {
  let {
    query: { id, lang },
  } = req;
  lang = Array.isArray(lang) ? lang.toString() : lang;
  id = Array.isArray(id) ? id.toString() : id;

  const fetcher = getPageById(lang, id);
  const page = await DefinitionCache.get(id, lang, fetcher);
  sendAPIResult(res, page, true);
};
