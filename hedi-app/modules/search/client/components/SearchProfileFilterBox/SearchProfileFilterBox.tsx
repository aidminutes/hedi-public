import { Body } from "@/modules/components/client/components/Body";
import { Button } from "@/modules/components/client/components/Button";
import { Select } from "@/modules/components/client/components/Select";
import { TextInput } from "@/modules/components/client/components/TextInput";
import { Filter16 } from "@carbon/icons-react";
import { Modal, Tag } from "carbon-components-react";
import { defaultDistance } from "./distanceUtils";
import { ISearchProfileFilterProps } from "./ISearchProfileFilterProps";
import { useFilter } from "./useFilter";

export const SearchProfileFilterBox = (props: ISearchProfileFilterProps) => {
  const {
    toFilterLabel,
    filterLabel,
    resetLabel,
    filterBody,
    zipcodeInput,
    zipcodeErrorMessage,
    perimeterSelect,
    zipcodeHintLabel,
    filter,
    isNotSearchedYet,
    hasFilter,
    hasResult,
  } = props;
  const {
    handleModalState,
    handleSubmitKeyPress,
    handleZipcodeInputValueChange,
    handleReset,
    handleSubmit,
    handleDistanceChange,
    isOpen,
    isInputDisabled,
    isNotValid,
    isCalculatedLocation,
    zipcodeInputValue,
    defaultLocation,
    distanceItem,
  } = useFilter(props);

  return (
    <>
      <div className="hedi--search-results__filter--list">
        {filter?.userLocation || defaultLocation ? (
          isCalculatedLocation ? (
            <p>
              {zipcodeHintLabel.text}{" "}
              {filter?.userLocation
                ? filter?.userLocation?.label ??
                  `${filter?.userLocation?.zipCode} ${filter?.userLocation?.city}`
                : defaultLocation?.label ??
                  `${defaultLocation?.zipCode} ${defaultLocation?.city}`}
            </p>
          ) : (
            // TODO change fallback Texts after debugging
            <Tag filter={true} type="blue" onClose={() => handleReset()}>
              {filter?.userLocation?.city !== undefined
                ? `${filter?.userLocation.zipCode || ""} ${
                    filter?.userLocation.city
                  } ${
                    filter?.distanceItem?.label
                      ? "(" + filter.distanceItem.label + ")"
                      : ""
                  }`
                : `${filter?.userLocation?.label} ${
                    filter?.distanceItem?.label
                      ? "(" + filter.distanceItem.label + ")"
                      : ""
                  }`}
            </Tag>
          )
        ) : (
          <></>
        )}
      </div>
      {!isNotSearchedYet && (hasFilter || hasResult) && (
        <Button
          buttonKind="ghost"
          renderIcon={Filter16}
          iconDescription={toFilterLabel.text}
          onClick={() => handleModalState()}
          hasIconOnly
        />
      )}
      <Modal
        modalHeading={filterLabel.text}
        primaryButtonText={toFilterLabel.text}
        secondaryButtonText={resetLabel.text}
        size="md"
        onRequestClose={() => handleModalState()}
        onRequestSubmit={() => handleSubmit()}
        open={isOpen}
        onSecondarySubmit={() => handleReset()}
        onKeyPress={e => handleSubmitKeyPress(e.key)}
        primaryButtonDisabled={isInputDisabled}
        className="hedi--search-filter">
        <div className="hedi--search-filter__body">
          <Body {...filterBody} />
        </div>
        <TextInput
          {...zipcodeInput}
          className="hedi--search-filter__input"
          invalid={isNotValid}
          invalidText={zipcodeErrorMessage.text}
          value={zipcodeInputValue || ""}
          onChange={e => handleZipcodeInputValueChange(e)}
        />
        <Select
          disabled={isInputDisabled}
          {...perimeterSelect}
          defaultValue={defaultDistance}
          value={distanceItem?.route}
          className="hedi--search-filter__input"
          onChange={handleDistanceChange}
        />
      </Modal>
    </>
  );
};
