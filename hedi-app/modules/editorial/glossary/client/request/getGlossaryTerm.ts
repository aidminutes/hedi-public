import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import {
  glossaryTermAPIUrl,
  IGlossaryTerm,
} from "@/modules/editorial/glossary/types";

export const getGlossaryTerm = (
  route: string
): Promise<IAPIResponse<IGlossaryTerm | undefined>> =>
  jsonPost<IAPIResponse<IGlossaryTerm | undefined>>(glossaryTermAPIUrl, {
    route,
  }).then(data => (data ? data : { success: false }));
