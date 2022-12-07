import { Button, DatePicker, TextInput, Image } from "@/modules/components";
import { ICareType } from "@/modules/networking/types/ICareType";
import { ISearchMidwifeWidgetConfiguration } from "@/modules/search/types";
import { getDateTenMonthsFromNow } from "@/modules/search/utils/getDateTenMonthsFromNow";
import {
  Column,
  InlineLoading,
  MultiSelect,
  Row,
} from "carbon-components-react";
import React from "react";
import { ISearchMidwifeWidgetDefinition } from "./getSearchMidwifeWidgetDefinition";
import { useSearchMidwifeWidget } from "./useSearchMidwifeWidget";

export type ISearchMidwifeWidgetInput = {
  careTypes: ICareType[];
  postalCode: string;
  deliveryDate: Date;
  pregnancyLatLong?: string;
};

export type ISearchMidwifeWidgetProps = {
  input: ISearchMidwifeWidgetInput;
  isLoading?: boolean;
  callSearchOnLoad?: boolean;
  onSearch?: (input: ISearchMidwifeWidgetInput) => void;
} & ISearchMidwifeWidgetConfiguration &
  ISearchMidwifeWidgetDefinition;

export const SearchMidwifeWidget = (props: ISearchMidwifeWidgetProps) => {
  const {
    input,
    lang,
    careTypes,
    searchImage,
    postalCodeTextInput,
    expectedDeliveryDateDatePicker,
    searchButton,
    invalidPostalCodeLabel,
    isLoading,
    callSearchOnLoad,
    onSearch,
  } = props;
  const {
    postalCode,
    isPostalCodeActive,
    isPostalCodeValid,
    expectedDeliveryDate,
    careTypesState,
    isGeoDataLoading,
    pregnancyLatLong,
    handleExpectedDeliveryDateChange,
    handlePostalCodeChange,
    handleCareTypesChange,
    handleSearch,
    postalCodeValue,
  } = useSearchMidwifeWidget(
    input,
    careTypes.careTypeSelect.items,
    onSearch,
    callSearchOnLoad
  );

  return (
    <Row>
      <Column>
        <div>
          <div className="hedi--search-midwife-widget__image-container">
            <Image {...searchImage} />
          </div>
          <div className="hedi--search-midwife-widget">
            <div>
              <TextInput
                {...postalCodeTextInput}
                light
                defaultValue={postalCode}
                value={postalCodeValue || ""}
                onChange={e => handlePostalCodeChange(e.target.value)}
                invalid={
                  (isPostalCodeActive && !isPostalCodeValid) ||
                  (!pregnancyLatLong && !isGeoDataLoading)
                }
                invalidText={invalidPostalCodeLabel.text}
              />
            </div>
            <div>
              <DatePicker
                {...expectedDeliveryDateDatePicker}
                onChange={e => handleExpectedDeliveryDateChange(e)}
                maxDate={getDateTenMonthsFromNow()}
                locale={"de"}
                light
                value={expectedDeliveryDate}
              />
            </div>
            <div className="hedi--search-midwife-widget__multiselect">
              <MultiSelect
                id="careTypesSelect"
                label={careTypes.careTypesLabel.text}
                titleText={careTypes.careTypesTitle.text}
                size="md"
                light
                {...careTypesState}
                onChange={handleCareTypesChange}
                sortItems={items => [...items]}
              />
            </div>
            <div className="hedi--search-midwife-widget__button-container">
              {isLoading || isGeoDataLoading ? (
                <>
                  <div className="bx--label">&nbsp;</div>
                  <InlineLoading className="inlineLoading" />
                </>
              ) : (
                <Button
                  {...searchButton}
                  size="md"
                  onClick={handleSearch}
                  disabled={
                    !(pregnancyLatLong && !isNaN(expectedDeliveryDate as any))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </Column>
    </Row>
  );
};
