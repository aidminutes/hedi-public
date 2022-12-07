import { IWithType } from "@/modules/model";
import { EmailView } from "./EmailView/EmailView";
import { IResetPasswordEmailView } from "../../../types";
import { IResetPasswordPasswordView } from "@/modules/auth/types/IResetPasswordPasswordView";
import { PasswordView } from "./PasswordView/PasswordView";
import { GlobalWizardStates, IPage, Wizards } from "@/modules/common/types";
import { useRouter } from "next/router";
import {
  ISystemContextData,
  useSystemContext,
} from "@/modules/shell/client/contexts/SystemContext";
import { useEffect, useState } from "react";
import { requestPageById } from "@/modules/common/client/request/requestPageById";
import { InlineLoading } from "carbon-components-react";

export const TryResetPassword = ({
  content,
}: {
  content: IPage & IWithType;
}): JSX.Element | null => {
  if (
    content.type !== "ResetPass-EmailView" &&
    content.type !== "PasswordChange"
  )
    return null;

  if (content.type == "ResetPass-EmailView") {
    return (
      <EmailView
        content={content as IResetPasswordEmailView}
        key="reset-password-email"
      />
    );
  }

  const router = useRouter();
  const systemContext = useSystemContext();

  const [isFinished, setIsFinished] = useState(false);
  const [wizardId, setWizardId] = useState<string | null>(null);

  useEffect(() => {
    const { token } = (router.query as any) as { token: string };
    if (token) {
      try {
        const info = JSON.parse(atob(decodeURI(token)));

        if (info.extra_info) {
          const sysData: ISystemContextData = JSON.parse(info.extra_info);
          sysData.wizardState = GlobalWizardStates.FORGOT_PASSWORD_ACTIVATE;
          if (sysData.wizardId) {
            setWizardId(sysData.wizardId);
            requestPageById(sysData.wizardId, content.lang).then(page => {
              if (page) {
                sysData.redirectMode = true;
                sysData.redirectQuery = router.query;
                systemContext.setSysData(sysData);
                router.push(page.route);
              }
            });
          }
        } else {
          setIsFinished(true);
          setWizardId("");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [router.query]);

  return !isFinished ? (
    <InlineLoading />
  ) : wizardId === "" ? (
    <PasswordView
      content={content as IResetPasswordPasswordView}
      key="reset-password-password"
    />
  ) : null;
};
