import { IPage } from "@/modules/common/types";
import { Checkbox, InlineNotification, Label } from "@/modules/components";
import { IProfessionalProfile } from "@/modules/profile/types";
import {
  Accordion,
  AccordionItem,
  Modal,
  Loading,
  InlineLoading,
  Column,
} from "carbon-components-react";
import { getProfileServicesEditModalViewDefinition } from "./getProfileServicesEditModalViewDefinition";
import { useProfileServicesEditModal } from "./useProfileServicesEditModal";

export const ProfileServicesEditModal = ({
  content,
  profile,
  isServicesEditOpen,
  onSaveSuccess,
}: {
  content: Pick<IPage, "lang" | "components">;
  profile: IProfessionalProfile;
  isServicesEditOpen: boolean;
  onSaveSuccess?: () => void;
}) => {
  if (!isServicesEditOpen) return null;
  const {
    allCareTypes,
    allServices,
    servicesCareTypesTitleLabel,
    servicesLabel,
    editServicesDescriptionLabel,
    editServicesTitleLabel,
    saveButton,
    resetButton,
    servicesErrorNotification,
  } = getProfileServicesEditModalViewDefinition(
    content.components,
    profile?.profession?.route
  );
  const {
    onResetHandler,
    onSaveHandler,
    keyPressHandler,
    serviceChangeHandler,
    careTypesChangeHandler,
    getGroupServicesCountLabel,
    isMidwife,
    profileCareTypes,
    profileServices,
    hasError,
    isSaving,
  } = useProfileServicesEditModal({
    lang: content.lang,
    profile,
    allServices,
    allCareTypes,
    onSaveSuccess,
  });

  return (
    <Modal
      modalHeading={editServicesTitleLabel.text}
      primaryButtonText={isSaving ? <InlineLoading /> : saveButton.text}
      primaryButtonDisabled={isSaving}
      secondaryButtonText={resetButton.text}
      size="md"
      onRequestClose={() => onSaveSuccess && onSaveSuccess()}
      onRequestSubmit={() => onSaveHandler()}
      open={true}
      onSecondarySubmit={() => onResetHandler()}
      onKeyPress={e => keyPressHandler(e.key)}
      className="hedi--search-filter">
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        <div className="hedi--profile__services__info-area">
          <Label {...editServicesDescriptionLabel} />
        </div>
        {isMidwife ? (
          <div className="hedi--profile__services__care-types-info">
            <Label {...servicesCareTypesTitleLabel} />
            <div>
              {allCareTypes.map(careType => (
                <Checkbox
                  id={careType.route}
                  labelText={careType.label}
                  checked={
                    profileCareTypes.findIndex(
                      item => item.route === careType.route
                    ) !== -1
                  }
                  onChange={careTypesChangeHandler}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div>
          <Label {...servicesLabel} />
          {allServices.map(group => (
            <Accordion size="md">
              <AccordionItem
                title={group.label + getGroupServicesCountLabel(group.label)}>
                <div className="hedi--list-accordion__checkboxes">
                  {group.children?.map(service => (
                    <div className="hedi--list-accordion__checkboxes-item">
                      <Checkbox
                        id={service.route}
                        labelText={service.label}
                        checked={
                          profileServices.findIndex(
                            item => item.route === service.route
                          ) !== -1
                        }
                        onChange={serviceChangeHandler}
                      />
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        {hasError && <InlineNotification {...servicesErrorNotification} />}
      </Column>
    </Modal>
  );
};
