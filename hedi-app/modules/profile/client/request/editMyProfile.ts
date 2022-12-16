import { jsonPost, RequiredBy } from "@/modules/common/utils";
import { IWithType } from "@/modules/model";
import {
  IUpsertProfileResponse,
  UserProfileInput,
  IUpsertProfessionalResponse,
  IUpsertMidwifeResponse,
  upsertProfessionalAPIUrl,
  upsertMyMidwifeProfileAPIUrl,
  ProfessionalInputDefault,
  MidwifeInputDefault,
  professionalToInput,
  midwifeToInput,
  IUpsertPersonalResponse,
  upsertPersonalAPIUrl,
  PersonalInputDefault,
  personalToInput,
} from "../../types";

export type IEditUserProfileResponse = RequiredBy<
  IUpsertProfileResponse<UserProfileInput>,
  "data"
> &
  IWithType;

export function editMyProfile(
  input?: UserProfileInput,
  lang?: string,
  role = "personal"
): Promise<IEditUserProfileResponse> {
  if (role === "professional") {
    // TODO remove fields which don't belong to this type
    return jsonPost<IUpsertProfessionalResponse>(upsertProfessionalAPIUrl, {
      input,
      lang,
    })
      .catch(e => {
        console.error(e);
        return null;
      })
      .then(resp => resolveProfessionalResponse(resp || null));
  } else if (role === "midwife") {
    return jsonPost<IUpsertMidwifeResponse>(upsertMyMidwifeProfileAPIUrl, {
      input,
      lang,
    })
      .catch(e => {
        console.error(e);
        return null;
      })
      .then(resp => resolveMidwifeResponse(resp || null));
  } else {
    return jsonPost<IUpsertPersonalResponse>(upsertPersonalAPIUrl, {
      input,
      lang,
    })
      .catch(e => {
        console.error(e);
        return null;
      })
      .then(resp => resolvePersonalResponse(resp || null));
  }
}

function resolvePersonalResponse(
  resp: IUpsertPersonalResponse | null
): IEditUserProfileResponse {
  if (!resp)
    return {
      success: false,
      data: PersonalInputDefault,
      type: "Personal",
    };
  else {
    const { data, ...rest } = resp;
    return {
      data: personalToInput(data),
      type: data ? data.type : "Personal",
      ...rest,
    };
  }
}

function resolveProfessionalResponse(
  resp: IUpsertProfessionalResponse | null
): IEditUserProfileResponse {
  if (!resp)
    return {
      success: false,
      data: ProfessionalInputDefault,
      type: "Professional",
    };
  else {
    const { data, ...rest } = resp;
    return {
      data: professionalToInput(data),
      type: data ? data.type : "Professional",
      ...rest,
    };
  }
}

function resolveMidwifeResponse(
  resp: IUpsertMidwifeResponse | null
): IEditUserProfileResponse {
  if (!resp)
    return {
      success: false,
      data: MidwifeInputDefault,
      type: "Midwife",
    };
  else {
    const { data, ...rest } = resp;
    return {
      data: midwifeToInput(data),
      type: data ? data.type : "Midwife",
      ...rest,
    };
  }
}
