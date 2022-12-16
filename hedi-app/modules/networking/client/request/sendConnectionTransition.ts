import { jsonPost } from "@/modules/common/utils";
import {
  transitionConnectionAPIUrl,
  ITransitionConnectionResponse,
} from "@/modules/networking/types";

export const sendConnectionTransition = (
  connectionRoute: string,
  transitionRoute: string
) => {
  return jsonPost<ITransitionConnectionResponse>(transitionConnectionAPIUrl, {
    input: {
      route: connectionRoute,
      transition: transitionRoute,
    },
    lang: "de", // TODO: use function arg
  }).then(data => {
    if (data && data.data) {
      data.data.created = new Date(data.data.created);
      data.data.changed = new Date(data.data.changed);
      if (data.data.sender && (data.data.sender as any).created) {
        (data.data.sender as any).created = new Date(
          (data.data.sender as any).created
        );
      }
    }
    return data ?? { success: false };
  });
};
