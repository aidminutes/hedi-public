import { ITransitionMidwifeCareRequestResponse } from "@/modules/networking/types";
import { jsonPost } from "@/modules/common/utils";
import { transitionMidwifeCareRequestAPIUrl } from "@/modules/networking/types";
import { IAPIResponse } from "@/modules/model";

export async function sendMidwifeCareRequestTransition(
  requestRoute: string,
  transitionRoute: string
): Promise<ITransitionMidwifeCareRequestResponse> {
  try {
    const data = await jsonPost<
      IAPIResponse<ITransitionMidwifeCareRequestResponse>
    >(transitionMidwifeCareRequestAPIUrl, {
      transition: transitionRoute,
      route: requestRoute,
    }).then(resp => (resp && resp.success ? resp.data : null));
    return data || { success: false };
  } catch (e: unknown) {
    const error = e as Error;
    console.error(error);
    return { success: false, errors: { [error.message]: error.message } };
  }
}
