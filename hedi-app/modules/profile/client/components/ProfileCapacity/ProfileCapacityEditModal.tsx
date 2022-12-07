import { IPage } from "@/modules/common/types";
import { InlineNotification, Label } from "@/modules/components";
import { Column, InlineLoading, Modal } from "carbon-components-react";
import { NumberInput, Toggle } from "@/modules/components";
import { getProfileCapacityEditModalViewDefinition } from "./getProfileCapacityEditModalViewDefinition";
import { useProfileCapacity } from "./useProfileCapacity";
import { FeatureFlag, FeatureFlags } from "@/modules/common/client/components";

export const ProfileCapacityEditModal = ({
  content,
  isCapacityEditOpen,
  onCapacityEditClose,
}: {
  content: Pick<IPage, "lang" | "components">;
  isCapacityEditOpen: boolean;
  onCapacityEditClose: Function;
}) => {
  if (!isCapacityEditOpen) return null;

  const {
    searchableToggle,
    networkRequestToggle,
    directRequestToggle,
    editCapacityTitleLabel,
    editCapacityDescriptionLabel,
    editSearchContactDescription,
    editDirectContactDescription,
    editNetworkRequestDescription,
    editMaxDistanceDescription,
    editEtsPerMonthDescription,
    saveButton,
    cancelButton,
    capacityErrorNotification,
    etsPerMonthNumberInput,
    maxDistanceNumberInput,
    invalidNumberInputLabel,
  } = getProfileCapacityEditModalViewDefinition(content.components);

  // getting new instance of state
  const {
    searchable,
    anonymousRequest,
    directCareRequest,
    defaultCapacity, // ets per month
    radius,
    onSaveHandler,
    isSaving,
    isSuccessfullySaved,
    error,
  } = useProfileCapacity(content.lang);

  const isSaveButtonDisabled = () => {
    return (
      isSaving ||
      ((anonymousRequest.value || directCareRequest.value) &&
        (!defaultCapacity.value || !radius.value)) ||
      (radius !== undefined && radius.value !== undefined && radius.value > 100)
    );
  };

  return (
    <Modal
      modalHeading={editCapacityTitleLabel.text}
      primaryButtonText={isSaving ? <InlineLoading /> : saveButton.text}
      primaryButtonDisabled={isSaveButtonDisabled()}
      secondaryButtonText={cancelButton.text}
      size="md"
      onRequestClose={() => onCapacityEditClose()}
      onRequestSubmit={() => onSaveHandler(onCapacityEditClose)}
      open={true}
      onSecondarySubmit={() => onCapacityEditClose()}
      className="hedi--search-filter">
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        <div className="hedi--profile-capacity__info-area">
          <Label {...editCapacityDescriptionLabel} />
        </div>
        <div className="hedi--profile-capacity__item-edit">
          <div className="hedi--profile-capacity__item-edit-value">
            <Toggle
              toggled={searchable.value || false}
              onChange={searchable.onChange}
              {...searchableToggle}
            />
          </div>
          <div>
            <Label {...editSearchContactDescription} />
          </div>
        </div>
        <div className="hedi--profile-capacity__item-edit">
          <div className="hedi--profile-capacity__item-edit-value">
            <Toggle
              toggled={directCareRequest.value || false}
              onChange={directCareRequest.onChange}
              {...directRequestToggle}
            />
          </div>
          <div>
            <Label {...editDirectContactDescription} />
          </div>
        </div>
        <FeatureFlag name={FeatureFlags.networkRequestsActive}>
          <div className="hedi--profile-capacity__item-edit">
            <div className="hedi--profile-capacity__item-edit-value">
              <Toggle
                toggled={anonymousRequest.value || false}
                onChange={anonymousRequest.onChange}
                {...networkRequestToggle}
              />
            </div>
            <div>
              <Label {...editNetworkRequestDescription} />
            </div>
          </div>
        </FeatureFlag>

        <div className="hedi--profile-capacity__item-edit">
          <div className="hedi--profile-capacity__item-edit-value">
            <NumberInput
              {...maxDistanceNumberInput}
              invalidText={invalidNumberInputLabel.text}
              disabled={!anonymousRequest.value && !directCareRequest.value}
              value={radius.value}
              onChange={radius.onChange}
            />
          </div>
          <div>
            <Label {...editMaxDistanceDescription} />
          </div>
        </div>

        <div className="hedi--profile-capacity__item-edit">
          <div className="hedi--profile-capacity__item-edit-value">
            <NumberInput
              {...etsPerMonthNumberInput}
              invalidText={invalidNumberInputLabel.text}
              disabled={!anonymousRequest.value && !directCareRequest.value}
              value={defaultCapacity.value}
              onChange={defaultCapacity.onChange}
            />
          </div>
          <div>
            <Label {...editEtsPerMonthDescription} />
          </div>
        </div>

        {!isSaving && !isSuccessfullySaved && (
          <InlineNotification {...capacityErrorNotification} />
        )}
      </Column>
    </Modal>
  );
};
