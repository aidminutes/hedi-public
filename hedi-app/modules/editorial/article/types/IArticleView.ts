import { ICopyLinkToClipboardDefinition } from "@/modules/common/client/components/CopyLinkToClipboard/types";
import {
  IGroupComponent,
  IImageComponent,
  ILabelComponent,
  ILinkComponent,
} from "@/modules/components/types";
import { IProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard";
import { IRelatedProfilesDefinition } from "@/modules/profile/client/components/RelatedProfiles";
import { IBusinessProfile } from "@/modules/profile/types";
import { IArticle } from "./IArticle";

export interface IArticleView extends IArticle, IArticleViewDefinition {
  posterImage: IImageComponent | null;
  relatedProfiles: IBusinessProfile[];
}

export interface IArticleViewDefinition {
  backLink: ILinkComponent;
  actionBarGroup: IGroupComponent;
  notificationText: ICopyLinkToClipboardDefinition;
  articleRelatedProfilesDefinition: IRelatedProfilesDefinition;
  tagListHeadline: ILabelComponent;
  profileCardDefinition: IProfileCardDefinition;
}
