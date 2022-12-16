import { IPageConfig } from "@/modules/shell/types";
import { IPage } from "@/modules/common/types";
import { getPagePage } from "./getPagePage";
import { getLayout } from "@/modules/shell/server";

import {
  getLoginPage,
  getRegistrationPage,
  getActivationPage,
} from "@/modules/auth/server";

import { getPagesReportPage } from "@/modules/pagesReport/server/pages";
import { getBrowserTestPage } from "@/modules/feedback/server/pages";

import { getGeneralPages } from "@/modules/generalPages/server/page/getGeneralPages";
import { getEditorialPages } from "@/modules/editorial/server/page/getEditorialPages";
import { getSearchPages } from "@/modules/search/server/page/getSearchPages";
import { getProfilePages } from "@/modules/profile/server/pages/getProfilePages";
import { getNetworkingPages } from "@/modules/networking/server/pages/getNetworkingPages";
import { getSysMessagePages } from "@/modules/sysmessage/server/pages/getSysMessagePages";

import {
  getConversationPage,
  getRoomsPage,
} from "@/modules/messaging/server/page";
import { getPasswordChangePage } from "@/modules/auth/server/page/getPasswordChangePage";
import { getResetPasswordEmailPage } from "@/modules/auth/server/page/getResetPasswordEmailPage";

export const getPageType = async (
  content: IPage
): Promise<IPage & IPageConfig> => {
  let result = await getGeneralPages(content);

  if (result === null) result = await getEditorialPages(content);
  if (result === null) result = await getSearchPages(content);
  if (result === null) result = await getProfilePages(content);
  if (result === null) result = await getNetworkingPages(content);
  if (result === null) result = await getSysMessagePages(content);

  // DEPRECATED move to wrapper functions per module (see above)
  switch (content.id) {
    case "login":
      result = await getLoginPage(content);
      break;
    case "register":
      result = await getRegistrationPage(content);
      break;
    case "passwordChange":
      result = await getPasswordChangePage(content);
      break;
    case "reset_password":
      result = await getResetPasswordEmailPage(content);
      break;
    case "activate_account":
      result = await getActivationPage(content);
      break;
    case "msg.conversation":
      result = await getConversationPage(content);
      break;
    case "msg.rooms":
      result = await getRoomsPage(content);
      break;
    // case "feedback":
    //   result = await getFeedbackPage(content);
    //   break;
    // case "feedbackThanks":
    //   result = await getFeedbackThanksPage(content);
    //   break;
    case "browserTest":
      result = await getBrowserTestPage(content);
      break;
    case "debug.pageReport":
      result = await getPagesReportPage(content);
      break;
  }

  if (result === null) result = await getPagePage(content);

  const shell = getLayout(result);
  // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
  return { ...shell, ...result };
};
