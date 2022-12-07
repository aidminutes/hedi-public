import { logAndNull } from "@/modules/common/error";
import { serviceGQuery } from "@/modules/graphql";
import { gql } from "@/modules/graphql/server/gq-ts";
import { GQPage } from "@/modules/common/server/gqTypes/GQIPage";
import { IPage } from "@/modules/common/types";

const query = gql`
    query getPagesReport {
      pagesReport {
        ${GQPage}
      }
    }
  `;

export async function getPagesReport(): Promise<IPage[]> {
  const pages = await serviceGQuery<{ pagesReport: IPage[] }>(query).then(
    data => logAndNull(data)?.pagesReport ?? []
  );

  return pages;
}
