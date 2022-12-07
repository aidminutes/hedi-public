import { jsonPost } from "@/modules/common/utils";
import { IAPIResponse } from "@/modules/model";
import {
  IOrganisationInput,
  IUpsertOrganisationResponse as IUpsertOrganisationServerResponse,
  OrganisationInputDefault,
  organisationToInput,
  upsertOrganisationAPIUrl,
} from "../../types";

export type IUpsertOrganisationResponse = Omit<
  IUpsertOrganisationServerResponse,
  "data"
> & {
  data?: IOrganisationInput;
};

export function upsertOrganisation(
  input?: IOrganisationInput,
  route?: string,
  lang?: string
): Promise<IUpsertOrganisationResponse> {
  return jsonPost<IAPIResponse<IUpsertOrganisationServerResponse>>(
    upsertOrganisationAPIUrl,
    {
      input,
      route,
      lang,
    }
  )
    .catch(e => {
      console.error(e);
      return null;
    })
    .then(resp => {
      if (!resp)
        return {
          success: false,
          data: OrganisationInputDefault,
        } as IUpsertOrganisationResponse;
      else if (!resp?.data)
        return {
          ...resp,
          data: OrganisationInputDefault,
        } as IUpsertOrganisationResponse;
      else {
        const { data, ...rest } = resp.data;
        return {
          data: organisationToInput(data),
          ...rest,
        };
      }
    });
}
