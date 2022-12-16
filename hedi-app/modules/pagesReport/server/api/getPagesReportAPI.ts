import { sendAPIResult } from "@/modules/common/utils";
import { IPage } from "@/modules/common/types";
import { NextApiHandler } from "next";
import { getPagesReport } from "../query";

export const getPagesReportAPI: NextApiHandler<IPage[]> = async (req, res) => {
  const pages = await getPagesReport();
  sendAPIResult(res, pages);
};
