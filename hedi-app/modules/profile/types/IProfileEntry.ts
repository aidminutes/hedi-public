import { IEntityTranslated, IWithType } from "@/modules/model";
import { ILanguage } from "@/modules/common/types/ILanguage";
import { IButtonComponent, ILabelComponent } from "@/modules/components";
import { IImage } from "@/modules/media/types";
import { IAddress, IEmail, IPhone, IWebsite } from "./dataTypes";
import { IService } from "./taxonomyTypes/IService";
import { IBusinessProfile } from "./IBusinessProfile";
import { IMatchingElement } from "@/modules/search/types";

export interface IProfileEntry
  extends IEntityTranslated,
    IWithType,
    Partial<Pick<IBusinessProfile, "profession" | "services">> {
  image: IImage;
  address?: IAddress;
  phone?: IPhone;
  email?: IEmail;
  website?: IWebsite;
}

export type ProfileEntryKind =
  | "ProfileEntry"
  | "Header"
  | "MidwifeSearchResult";
export type IProfileEntryProps = IProfileEntryDefault;
export type IProfileEntryDefault = IProfileEntry &
  IProfileEntryDefinition & {
    kind?: Extract<"ProfileEntry" | "Header", ProfileEntryKind>;
  };

export interface IProfileEntryDefinition {
  phoneTitle: string;
  emailTitle: string;
  websiteTitle: string;
  servicesTitle: string;
  contactTitle: string;
  distanceTitle: string;
  profileLinkButton: IButtonComponent;
}

export interface IProfileEntryMidwifeSearchResultContent
  extends Pick<IProfileEntry, "type" | "label" | "route" | "image"> {
  matchingCareTypes: IMatchingElement<string>[];
  matchingLanguages: IMatchingElement<string>[];
  matchingServices: IMatchingElement<string>[];
  isExpandable?: boolean;
}

export interface IProfileEntryMidwifeSearchResultDefinition {
  matchingCareTypesLabel: ILabelComponent;
  matchingLanguagesLabel: ILabelComponent;
  matchingServicesLabel: ILabelComponent;
  showMoreLabel: ILabelComponent;
  showLessLabel: ILabelComponent;
}

export const isProfileEntryDefault = (
  props: IProfileEntryProps
): props is IProfileEntryDefault => {
  return (
    props.kind === undefined ||
    props?.kind === "ProfileEntry" ||
    props.kind === "Header"
  );
};
