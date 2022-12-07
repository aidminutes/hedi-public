import { Email16, Phone16, Wikis16 } from "@carbon/icons-react";

import { Address, EmailLink, PhoneLink, WebLink } from "../../index";
import { IProfileEntryDefault } from "@/modules/profile/types";

export const ContactInfo: React.FC<IProfileEntryDefault> = (
  props
): JSX.Element => {
  const { address, phone, email, website } = props;

  const { phoneTitle, emailTitle, websiteTitle } = props;

  return (
    <>
      <Address hideAdditionalInfo {...address} />
      <div className="hedi--contact-info">
        {phone && (
          <div>
            <div>
              <Phone16 />
            </div>
            <PhoneLink title={phoneTitle} {...phone} />
          </div>
        )}
        {email && email.dataVisibility.index === 0 && (
          <div>
            <div>
              <Email16 />
            </div>
            <EmailLink title={emailTitle} {...email} />
          </div>
        )}
        {website && (
          <div>
            <div>
              <Wikis16 />
            </div>
            <WebLink title={websiteTitle} {...website} />
          </div>
        )}
      </div>
    </>
  );
};
