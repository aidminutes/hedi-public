import { EmailLink } from "./types";
import { useEffect, useState } from "react";
import { IBodyComponent } from "@/modules/components";
import { getBrowserNameAndVersion } from "@/modules/common/utils/browserInfo";

export function useContactView(emailLinks: EmailLink[], lang: string) {
  const [emailsBody, setEmailsBody] = useState<IBodyComponent>();
  const appVersion = `${process.env.NEXT_PUBLIC_APP_VERSION}`;
  useEffect(() => {
    const getTechnicalMetaData = () => {
      return appVersion + ":" + getBrowserNameAndVersion();
    };

    const text = emailLinks
      .map(
        emailLinkItem =>
          `<p>${
            emailLinkItem.beforeText ? emailLinkItem.beforeText + " " : ""
          }<a href="mailto:${emailLinkItem.email}?subject=${encodeURIComponent(
            emailLinkItem.emailSubject
          )}${
            emailLinkItem.addMetaData
              ? encodeURIComponent(" - " + getTechnicalMetaData())
              : ""
          }${
            emailLinkItem.emailBody
              ? "&body=" + encodeURIComponent(emailLinkItem.emailBody)
              : ""
          }">${emailLinkItem.linkText}</a>${
            emailLinkItem.afterText ? " " + emailLinkItem.afterText : ""
          }.</p>`
      )
      .join("");
    setEmailsBody({
      kind: "Body",
      id: "emailsBody",
      body: text,
    } as IBodyComponent);
  }, [lang]);
  return { emailsBody };
}
