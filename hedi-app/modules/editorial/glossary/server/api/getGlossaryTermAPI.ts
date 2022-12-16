import { sendAPIResult } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import { NextApiHandler } from "next";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { getGlossaryTerm } from "@/modules/editorial/glossary/server";

export const getGlossaryTermAPI: NextApiHandler<
  IAPIResponse<IGlossaryTerm>
> = async (req, res) => {
  const { route } = JSON.parse(req.body) as { route: string };
  const data = await getGlossaryTerm(decodeURIComponent(route));
  const response: IAPIResponse<IGlossaryTerm> = !!data
    ? {
        success: !!data,
        data: data,
      }
    : { success: false };
  sendAPIResult(res, response, true);
};
