import { messagePreviewAPIUrl, URLPreviewResponse } from "../../types";

export async function createUrlPreview(
  url: string
): Promise<URLPreviewResponse | null> {
  return new Promise<URLPreviewResponse | null>((resolve, reject) => {
    fetch(messagePreviewAPIUrl, {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then(resp => resp.json())
      .then(resp => resolve(resp))
      .catch(err => reject(err));
  });
}
