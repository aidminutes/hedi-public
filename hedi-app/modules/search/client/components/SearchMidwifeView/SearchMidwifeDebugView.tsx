import { Seperator } from "@/modules/common/client/components";
import { Column, Dropdown, Grid, Loading, Row } from "carbon-components-react";
import React from "react";
import { useSearchMidwifeView } from "./useSearchMidwifeView";
import { SearchMidwifeResults } from "../SearchMidwifeResults";
import { TextInput } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { getSearchMidwifeViewDefinition } from "./getSearchMidwifeViewDefinition";
import { Checkbox, DatePicker } from "@/modules/components/client/components";
import { useSearchIProfileSort } from "../../hooks";
import { IsIErrorResponse } from "@/modules/common/error";

export const SearchMidwifeDebugView = ({
  content,
}: {
  content: IPage;
}): JSX.Element => {
  const showScores = true; // TODO just for debug
  const localSort = true; // TODO just for debug

  const {
    servicesInput,
    locationInput,
    languageInput,
    errorNotification,
    resultsHeadline,
    midwifeSearchResultDefinition,
  } = getSearchMidwifeViewDefinition(content.components);
  const resultComponents = {
    errorNotification,
    resultsHeadline,
    ...midwifeSearchResultDefinition,
  };
  const {
    loading,
    data,
    locations,
    hasFilter,
    careTypeDateRanges,
    expectedDeliveryDate,
    handleExpectedDeliveryDateChanged,
    handleLanguagesChanged,
    handleLocationChanged,
    handleServicesChanged,
    handleCareTypeItemDateRangeChange,
    handleCareTypeItemSelectedChange,
  } = useSearchMidwifeView(content);
  const {
    sortFields,
    handleSortFieldChange,
    sortedData,
  } = useSearchIProfileSort(data);

  return (
    <div className="hedi--search-view">
      <Row>
        <Column>
          <div>
            {/* TODO just for debug */}
            <div className="bx--form-item bx--text-input-wrapper">
              <label className="bx--label">expected Deliverty Date</label>
              <div className="bx--text-input__field-outer-wrapper">
                <div className="bx--text-input__field-wrapper">
                  <input
                    id="expectedDelivertyDate"
                    type="date"
                    className="bx--text-input bx--text__input"
                    // value={expectedDeliveryDate.getDate().toString().padStart(2, "0") + '/' + (expectedDeliveryDate.getMonth() + 1).toString().padStart(2, "0") + "/" + expectedDeliveryDate.getFullYear().toString().substr(2)}
                    value={expectedDeliveryDate}
                    onChange={e =>
                      handleExpectedDeliveryDateChanged(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Column>

        <Column>
          <div>
            <TextInput
              {...locationInput}
              onChange={e => handleLocationChanged(e.target.value)}
              defaultValue="51.69304,10.00579"
            />
          </div>
        </Column>
      </Row>
      <Row>
        {careTypeDateRanges.map(careTypeDateRange => (
          <Column>
            <Checkbox
              id={careTypeDateRange.careType}
              labelText={careTypeDateRange.title}
              disabled={!careTypeDateRange.enabled}
              checked={careTypeDateRange.selected}
              onChange={(e: boolean) =>
                handleCareTypeItemSelectedChange(careTypeDateRange.careType, e)
              }
            />
            <DatePicker
              id={"dt" + careTypeDateRange.careType}
              labelText={"date range"}
              dateFormat="d/m/y"
              datePickerType="range"
              value={[careTypeDateRange.fromDate, careTypeDateRange.toDate]}
              onChange={values =>
                handleCareTypeItemDateRangeChange(
                  careTypeDateRange.careType,
                  values
                )
              }
            />
          </Column>
        ))}
      </Row>
      <Row>
        <Column>
          <TextInput
            {...servicesInput}
            onChange={e => handleServicesChanged(e.target.value)}
          />
        </Column>
        <Column>
          <TextInput
            {...languageInput}
            onChange={e => handleLanguagesChanged(e.target.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column style={{ padding: "20px" }}>
          {data && !IsIErrorResponse(data) ? (
            <pre>{JSON.stringify(data.stats)}</pre>
          ) : null}
        </Column>
      </Row>
      <Seperator />
      <Row>
        <Column>
          {loading ? (
            <div className="hedi--search__loading">
              <Loading
                withOverlay={false}
                className={"hedi--search__loading-indicator"}
              />
            </div>
          ) : (
            <div className="hedi--search__results">
              {localSort &&
              data &&
              !IsIErrorResponse(data) &&
              data.result.length ? (
                <Dropdown
                  id="sorter"
                  items={sortFields}
                  label="Sort By"
                  titleText="Sort By"
                  onChange={e => handleSortFieldChange(e.selectedItem ?? "")}
                />
              ) : (
                ""
              )}
              {!IsIErrorResponse(sortedData) && !!sortedData && (
                <SearchMidwifeResults
                  profileResults={sortedData.result}
                  lang={content.lang}
                  {...resultComponents}
                  debug={showScores}
                />
              )}
              {/* {locations?.length > 0 ? (
            <Map currentLocation={locations[0]} locations={locations} />
          ) : (
            ""
          )} */}
            </div>
          )}
        </Column>
      </Row>
    </div>
  );
};
