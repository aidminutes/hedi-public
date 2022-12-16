import { useState } from "react";
import {
  getBrowserNameAndVersion,
  getScreenResolution,
} from "@/modules/common/utils/browserInfo";
import { sendFeedbacks } from "../../request";

export function useBrowserTestView() {
  const [didSucceed, setDidSucceed] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const sendBrowserData = () => {
    const browserNameAndVersion = getBrowserNameAndVersion();
    const resolution = getScreenResolution();
    const dataToSend = JSON.stringify({
      Browser: browserNameAndVersion,
      Resolution: resolution,
      UserAgent: navigator.userAgent,
    });

    setIsSending(true);
    sendFeedbacks("BrowserTest", [dataToSend]).then(response => {
      setIsSending(false);
      if (response) {
        const success = response.success;
        setDidSucceed(success);
        setHasFailed(!success);
      } else {
        setDidSucceed(false);
        setHasFailed(true);
      }
    });
  };

  return { sendBrowserData, didSucceed, hasFailed, isSending };
}
