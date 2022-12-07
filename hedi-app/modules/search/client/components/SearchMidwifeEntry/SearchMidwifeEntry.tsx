import { IPage } from "@/modules/common/types";
import {
  Body,
  Button,
  DatePicker,
  Label,
  TextInput,
  Image,
  Link,
} from "@/modules/components";
import { getDateTenMonthsFromNow } from "@/modules/search/utils/getDateTenMonthsFromNow";
import { InlineLoading, MultiSelect, Tooltip } from "carbon-components-react";
import { useRouter } from "next/router";
import React from "react";
import { getSearchMidwifeEntryDefinition } from "./getSearchMidwifeEntryDefinition";
import { useSearchMidwifeEntry } from "./useSearchMidwifeEntry";

export const SearchMidwifeEntry = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard" | "wizard">;
}) => {
  const {
    headline,
    introText,
    postalCode,
    birthdate,
    careTypes,
    invalidPostalCodeLabel,
    cancelButton,
    startSearchButton,
    footerText,
    footerImage,
    toolTipBody,
    searchMidwifeLink,
    toolTipLink,
  } = getSearchMidwifeEntryDefinition(content.components);

  const {
    isPostalCodeActive,
    isPostalCodeValid,
    postalCodeValue,
    expectedDeliveryDateValue,
    isLoading,
    handlePostalCodeBlur,
    handlePostalCodeChange,
    handleExpectedDeliveryDateChange,
    handleCareTypesChange,
    handleSubmit,
  } = useSearchMidwifeEntry(
    content.lang,
    searchMidwifeLink.href,
    content?.isPartOfWizard,
    content?.wizard
  );

  const router = useRouter();
  return (
    <>
      <div className="hedi--account__content-wrap hedi--account__content-wrap--blue hedi--account__content-wrap--more-space">
        <div className="hedi--account__headline hedi--centered hedi--search-midwife-entry__headline">
          <Label {...headline} />
          <Body {...introText} />
        </div>
        <div className="hedi--account__content">
          <TextInput
            {...postalCode}
            light
            value={postalCodeValue || ""}
            invalid={isPostalCodeActive && !isPostalCodeValid}
            invalidText={invalidPostalCodeLabel.text}
            onChange={e => handlePostalCodeChange(e.target.value)}
            onBlur={e => handlePostalCodeBlur(e.target.value)}
          />
          <DatePicker
            {...birthdate}
            light
            className="hedi--search-midwife-entry__datepicker"
            locale={"de"}
            maxDate={getDateTenMonthsFromNow()}
            onChange={e => handleExpectedDeliveryDateChange(e)}
            value={
              !!expectedDeliveryDateValue
                ? expectedDeliveryDateValue
                : undefined
            }
          />
          <div className="hedi--search-midwife-entry__multiselect">
            <MultiSelect
              light
              {...careTypes}
              onChange={e => handleCareTypesChange(e)}
              label={careTypes.labelText}
              sortItems={items => [...items]}
            />
            <div className="hedi--search-midwife-entry__tooltip">
              <Tooltip align="end">
                <Body {...toolTipBody} />
                <Link {...toolTipLink} target="_blank" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="hedi--account__footer">
          <div className="hedi--account__footer-buttons hedi--account__footer-buttons--column">
            {isLoading ? (
              <div className="hedi--search-midwife-entry__inline-loading">
                <InlineLoading />
              </div>
            ) : (
              <Button
                {...startSearchButton}
                disabled={
                  postalCodeValue === null ||
                  !isPostalCodeValid ||
                  expectedDeliveryDateValue === null
                }
                onClick={() => handleSubmit()}
              />
            )}
          </div>
        </div>
      </div>
      <div className="hedi--account__after-content-wrap">
        <div className="hedi--account__footer-text">
          <Body {...footerText} />
        </div>
        <div className="hedi--account__footer-image hedi--search-midwife-entry__footer-image">
          <Image {...footerImage} />
        </div>
      </div>
    </>
  );
};
