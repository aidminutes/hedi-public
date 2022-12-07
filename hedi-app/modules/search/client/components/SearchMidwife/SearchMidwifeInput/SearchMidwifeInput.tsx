import { CountedTagMultiSelect } from "@/modules/common/client/components/CountedTagMultiSelect";
import { Button, Label } from "@/modules/components";
import { Column, Row } from "carbon-components-react";
import { ICareType } from "@/modules/networking/types/ICareType";
import { ISearchMidwifeInput } from "../types";
import { useSearchMidwifeInput } from "./useSearchMidwifeInput";
import { ServicesAndLanguagesFilter } from "../../ServicesAndLanguagesFilter/ServicesAndLanguagesFilter";
import { SearchMidwifeWidget } from "../SearchMidwifeWidget";
import {
  columnWidth,
  offsetColumnWidth,
} from "../SearchMidwifeWidget/columnHelper";
import {
  IButtonComponent,
  IComponent,
  ILabelComponent,
  ISelectComponent,
} from "@/modules/components/types";
import { ISearchMidwifeWidgetDefinition } from "../SearchMidwifeWidget/getSearchMidwifeWidgetDefinition";
import { IWizard } from "@/modules/common/types";
import { RankedScoredIProfile } from "@/modules/search/types";

export type ISearchMidwifeInputProps = {
  languageCounts?: Record<string, number>;
  serviceCounts?: Record<string, number>;
  components: IComponent[];
  resultsCount?: number;
  resultProfiles?: RankedScoredIProfile[];
  isLoading?: boolean;
  isPageLoad?: boolean;
  isPartOfWizard?: boolean;
  wizard?: IWizard;
} & ISearchMidwifeInputDefinition &
  ISearchMidwifeInputConfig &
  ISearchMidwifeWidgetDefinition;

export interface ISearchMidwifeInputDefinition {
  careTypeSelect: ISelectComponent;
  languageSelect: ISelectComponent;
  serviceSelect: ISelectComponent;
  resultHeadline: ILabelComponent;
  resultHeadlineDescriptionOneResult: ILabelComponent;
  resultHeadlineDescriptionMultipleResults: ILabelComponent;
  removeAllFiltersButton: IButtonComponent;
}

export interface ISearchMidwifeInputConfig {
  lang?: string;
  onChange?: (input: ISearchMidwifeInput) => void;
}
// prettier-ignore
export const SearchMidwifeInput = (props: ISearchMidwifeInputProps) => {
  const {
    languageCounts,
    serviceCounts,
    lang,
    onChange,
    components,
    resultProfiles,
    resultsCount,
    isPageLoad,
    isPartOfWizard,
    wizard,
    ...definition
  } = props;

  const {
    careTypeSelect,
    languageSelect,
    serviceSelect,
    resultHeadline,
    resultHeadlineDescriptionOneResult,
    resultHeadlineDescriptionMultipleResults,
    removeAllFiltersButton,
  } = definition;

  const {
    expectedDeliveryDate,
    postalCode,
    careTypeSelectState,
    languageSelectState,
    serviceSelectState,
    descriptionText,
    hasFilter,
    callSearchOnLoad,
    onFilter,
    handleInputChange,
    handleRemoveAllFilters,
  } = useSearchMidwifeInput({
    allCareTypes: careTypeSelect.items as ICareType[],
    onChange,
    resultsCount,
    rawDescriptionText:
      (resultsCount && resultsCount > 1)
        ? resultHeadlineDescriptionMultipleResults.text
        : resultHeadlineDescriptionOneResult.text,
    isPageLoad,
    isPartOfWizard,
    wizard,
  });

  return (
    <>
      <Row className="hedi--search-midwife__widget-line">
        <Column {...offsetColumnWidth} />
        <Column {...columnWidth}>
          <SearchMidwifeWidget
            {...{ ...props, components, lang: lang || "de" }}
            onSearch={handleInputChange}
            input={{
              careTypes: careTypeSelectState.defaultSelected,
              deliveryDate: expectedDeliveryDate,
              postalCode,
            }}
            callSearchOnLoad={callSearchOnLoad}
          />
        </Column>
      </Row>
      {resultsCount ? (
        <div className="hedi--search-midwife__header">
          <Row>
            <Column {...offsetColumnWidth} />
            <Column {...columnWidth}>
              <Label {...resultHeadline}></Label>
              <p
                dangerouslySetInnerHTML={{ __html: descriptionText || "" }}
                className="description"
              />
            </Column>
          </Row>
        </div>
      ) : null}
      <Row className={hasFilter ? "hedi--search-midwife__row" : ""}>
        <Column {...offsetColumnWidth} />
        <Column {...columnWidth}>
          <ServicesAndLanguagesFilter
            languageSelect={languageSelect}
            serviceSelect={serviceSelect}
            languageSelectState={languageSelectState}
            serviceSelectState={serviceSelectState}
            components={components}
            onFilter={onFilter}
            isDisabled={resultsCount === 0}
            resultProfiles={resultProfiles}
          />
        </Column>
      </Row>
      {hasFilter && (
        <Row className="hedi--search-midwife__row">
          <Column {...offsetColumnWidth} />
          <Column {...columnWidth}>
            {languageSelectState.defaultSelected.length ? (
              <CountedTagMultiSelect
                {...languageSelectState}
                counts={languageCounts}
                hideNotSelected
                filter
                items={languageSelect.items}
              />
            ) : null}
            {serviceSelectState.defaultSelected.length ? (
              <CountedTagMultiSelect
                {...serviceSelectState}
                counts={serviceCounts}
                hideNotSelected
                filter
                items={serviceSelect.items}
              />
            ) : null}
            <Button
              {...removeAllFiltersButton}
              onClick={handleRemoveAllFilters}
            />
          </Column>
        </Row>
      )}
    </>
  );
};
