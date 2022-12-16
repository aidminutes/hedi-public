import { jsonPost } from "@/modules/common/utils";
import { IInsertMyOrganisationConnectionResponse } from "@/modules/profile/types";
import { insertMyOrganisationConnectionAPIUrl } from "@/modules/networking/types";
import { IAPIResponse } from "@/modules/model";

export const insertMyOrganisationConnection = (
  businessRoute: string,
  lang: string
) => {
  return jsonPost<IAPIResponse<IInsertMyOrganisationConnectionResponse>>(
    insertMyOrganisationConnectionAPIUrl,
    {
      businessRoute,
      lang,
    }
  )
    .catch(e => {
      console.error(e);
      return null;
    })
    .then(data => (data && data.data ? data.data : { success: false }));
};
