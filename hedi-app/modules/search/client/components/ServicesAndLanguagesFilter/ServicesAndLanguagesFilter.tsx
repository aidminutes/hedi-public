import { Button, Checkbox, Label } from "@/modules/components";
import {
  IComponent,
  ISelectComponent,
  ISelectItem,
} from "@/modules/components/types";
import {
  Accordion,
  AccordionItem,
  Modal,
  MultiSelect,
} from "carbon-components-react";
import { useServicesAndLanguagesFilter } from "./useServicesAndLanguagesFilter";
import { getServicesAndLanguagesFilterDefinition } from "./getServicesAndLanguagesFilterDefinition";
import { ILanguage } from "@/modules/common/types";
import { IService } from "@/modules/profile/types";
import { SettingsAdjust32 } from "@carbon/icons-react";
import { ISelectState, RankedScoredIProfile } from "@/modules/search/types";

interface SearchFilterProps {
  languageSelect: ISelectComponent;
  serviceSelect: ISelectComponent;
  languageSelectState: ISelectState<ISelectItem>;
  serviceSelectState: ISelectState<ISelectItem>;
  components: IComponent[];
  isDisabled?: boolean;
  onFilter?: (
    selectedLanguages: ILanguage[],
    selectedServices: IService[]
  ) => void;
  resultProfiles?: RankedScoredIProfile[];
}

export const ServicesAndLanguagesFilter = (props: SearchFilterProps) => {
  const {
    filterButton,
    allServices,
    allLanguagesSelect,
    useFilterButton,
    filterResetButton,
    filterLabel,
    servicesLabel,
    languagesLabel,
    clearSelectionDescriptionLabel,
    filterDescriptionLabel,
  } = getServicesAndLanguagesFilterDefinition(props.components);
  const {
    allServices: filteredAllServices,
    isModalOpen,
    selectedServices,
    languagesState,
    languagesChangeHandler,
    openModal,
    closeModal,
    resetStatesHandler,
    doFilterHandler,
    getGroupServicesCountLabel,
    serviceChangeHandler,
  } = useServicesAndLanguagesFilter({
    onFilter: props.onFilter,
    defaultSelectedLanguages: props.languageSelectState.defaultSelected,
    defaultSelectedServices: props.serviceSelectState.defaultSelected,
    allLanguages: allLanguagesSelect.items as ILanguage[],
    allServices,
    resultProfiles: props.resultProfiles,
  });
  return (
    <>
      <Button
        {...filterButton}
        renderIcon={SettingsAdjust32}
        onClick={openModal}
        className="hedi--search__filter--button"
        disabled={!!props.isDisabled}
      />
      {isModalOpen && (
        <Modal
          modalHeading={filterLabel.text}
          primaryButtonText={useFilterButton.labelText}
          secondaryButtonText={filterResetButton.labelText}
          size="md"
          onRequestClose={closeModal}
          onRequestSubmit={doFilterHandler}
          open={true}
          onSecondarySubmit={resetStatesHandler}
          className="hedi--search-filter">
          <div className="hedi--profile__services__info-area">
            <Label {...filterDescriptionLabel} />
          </div>
          <div className="hedi--search__filter__multiselect">
            <MultiSelect
              id="languages"
              clearSelectionText={clearSelectionDescriptionLabel.text}
              light
              {...languagesState}
              onChange={languagesChangeHandler}
              label={languagesLabel.text}
              sortItems={items => [...items]}
            />
          </div>
          <div>
            <div className="hedi--search__filter__services-title">
              <Label {...servicesLabel} />
            </div>
            {filteredAllServices.map(group => (
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
                            selectedServices.findIndex(
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
        </Modal>
      )}
    </>
  );
};
