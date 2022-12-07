import { ILanguage, IWizard } from "@/modules/common/types";
import {
  IBodyComponent,
  IButtonComponent,
  ILabelComponent,
  ILinkComponent,
} from "@/modules/components/types";
import {
  IProfileEntryMidwifeSearchResultDefinition,
  IService,
} from "@/modules/profile/types";
import { ICheckboxButtonDefinition } from "@/modules/common/client/components/CheckboxButton";
import { ICareType } from "@/modules/networking/types/ICareType";
import { RankedScoredIProfile } from "@/modules/search/types/IProfileSearchResult";
import { ISelectComponent } from "@/modules/components";
import { ISearchMidwifeNoResultsDefinition } from "../client/components/SearchMidwife/SearchMidwifeNoResults/getSearchMidwifeNoResultsDefinition";
import { IMidwifeCareConnection } from "@/modules/networking/types";

export type ISearchMidwifeResultProps = {
  isLoading?: boolean;
  profileResults: RankedScoredIProfile[];
  queryCareTypes?: Pick<ICareType, "route" | "label">[];
  queryLanguages?: Pick<ILanguage, "route" | "label">[];
  queryServices?: Pick<IService, "route" | "label">[];
  careRequestUrl?: string;
  careTypeSelect?: ISelectComponent;
  lang: string;
  isPartOfWizard?: boolean;
  wizard?: IWizard;
  careConnections?: IMidwifeCareConnection[];
} & ISearchMidwifeResultsDefinition &
  ISearchMidwifeResultsConfig;

export interface ISearchMidwifeResultsDefinition {
  resultsUpdatingLabel: ILabelComponent;
  midwifeSearchResultDefinition: IProfileEntryMidwifeSearchResultDefinition;
  sendRequestButton: IButtonComponent;
  requestCheckboxButtonDefinition: ICheckboxButtonDefinition;
  careRequestLink: ILinkComponent;
  selectedMidwifesLabel: ILabelComponent;
  firstSelectionHintBody: IBodyComponent;
  midwifeSearchNoResultsDefinition: ISearchMidwifeNoResultsDefinition;
  activeCareLabel: ILabelComponent;
  whyMidwifeUserCouldNotSelectMidwivesTooltipBody: IBodyComponent;
}

export interface ISearchMidwifeResultsConfig {
  debug?: boolean;
}
