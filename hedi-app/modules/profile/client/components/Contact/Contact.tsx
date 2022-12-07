import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from "carbon-components-react";
import { IDataKind } from "@/modules/profile/types/taxonomyTypes";
import {
  IAddress,
  IPhone,
  IEmail,
  IWebsite,
} from "@/modules/profile/types/dataTypes";
import { Address, PhoneLink, EmailLink, WebLink } from "..";
import { IImageComponent, Image } from "@/modules/components";
import { BusinessProfileType } from "@/modules/profile/types";

export interface IContact {
  dataKind: IDataKind;
  address?: IAddress;
  phone?: IPhone;
  email?: IEmail;
  website?: IWebsite;
}

export interface IContactDefinition {
  phoneTitle: string;
  emailTitle: string;
  websiteTitle: string;
  locationTitle: string;
  hideStreetAndNumber?: boolean
}

export type IContactProps = IContact & IContactDefinition;

export const Contact = (props: IContactProps): JSX.Element => {
  const { dataKind, address, phone, email, website, hideStreetAndNumber } = props;
  const { phoneTitle, emailTitle, websiteTitle, locationTitle } = props;

  return (
    <section className="hedi--profile-contact hedi--profile--tile">
      {dataKind.index !== 0 && (
        <h4 className="hedi--profile-contact__headline">{dataKind.label}</h4>
      )}
      <StructuredListWrapper className="hedi--structured-list hedi--structured-list--contact">
        <StructuredListHead />
        <StructuredListBody>
          {address && (
            <StructuredListRow>
              <StructuredListCell>{locationTitle}</StructuredListCell>
              <StructuredListCell>
                <Address hideStreetAndNumber={hideStreetAndNumber} {...address} />
              </StructuredListCell>
            </StructuredListRow>
          )}

          {phone && (
            <StructuredListRow>
              <StructuredListCell>{phoneTitle}</StructuredListCell>
              <StructuredListCell>
                <PhoneLink title={phoneTitle} {...phone} />
              </StructuredListCell>
            </StructuredListRow>
          )}
          {email && email.dataVisibility.index === 0 && (
            <StructuredListRow>
              <StructuredListCell>{emailTitle}</StructuredListCell>
              <StructuredListCell>
                <EmailLink title={emailTitle} {...email} />
              </StructuredListCell>
            </StructuredListRow>
          )}
          {website && (
            <StructuredListRow>
              <StructuredListCell>{websiteTitle}</StructuredListCell>
              <StructuredListCell>
                <WebLink title={websiteTitle} {...website} />
              </StructuredListCell>
            </StructuredListRow>
          )}
        </StructuredListBody>
      </StructuredListWrapper>
    </section>
  );
};
