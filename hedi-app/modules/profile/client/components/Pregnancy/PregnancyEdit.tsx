import React, { ChangeEvent, forwardRef, useImperativeHandle } from "react";
import {
  Column,
  Row,
  Form,
  Loading,
  InlineLoading,
} from "carbon-components-react";
import {
  DatePicker,
  NumberInput,
  Button,
  Label,
  Body,
  ToastNotification,
  InlineNotification,
  Toggle,
} from "@/modules/components";
import { getPregnancyViewDefinition } from "./getPregnancyViewDefinition";
import { PregnancyViewKind, useUpsertPregnancy } from "./useUpsertPregnancy";
import { IPage } from "@/modules/common/types";
import { Seperator, ToggleRadio } from "@/modules/common/client/components";
import { IPregnancy } from "@/modules/profile/types";

export interface IPregnancyEditTools {
  upsertData: (
    onSaving?: () => void,
    onError?: () => void,
    onSuccess?: () => void
  ) => void;
  reload: () => void;
}

export const PregnancyEdit = forwardRef(
  (
    {
      content,
      showSaveButton = true,
      viewKind = "all",
      onAfterSave,
      onSaving,
    }: {
      content: Pick<IPage, "lang" | "components" | "isPartOfWizard" | "wizard">;
      viewKind?: PregnancyViewKind;
      showSaveButton?: boolean;
      onAfterSave?: (pregnancy: IPregnancy, birthDate: string) => void;
      onSaving?: () => void;
    },
    ref
  ) => {
    const { isPartOfWizard, wizard } = content;
    const {
      expectedDeliveryDate,
      multiplePregnancy,
      para,
      gravida,
      prevPrematureBirth,
      prevBirthComplication,
      prevCSection,
      prevPostpartumDepression,
      prevBreastfeedingProblem,
      birthDate,
      handleSubmit,
      doSaveData,
      doReload,
      isSuccessfullySaved,
      error,
      showPregnancyPart,
      showHealthPart,
      isPregnancyLoading,
      isProfileLoading,
      hasUserHealthData,
      isSaving,
      isValidForm,
    } = useUpsertPregnancy({
      lang: content.lang,
      viewKind,
      onAfterSave,
      onSaving,
      pregnancyEditRef: ref,
    });
    const {
      introBody,
      expectedDeliveryDatePicker,
      multiplePregnancyToggle,
      birthDateDatePicker,

      gravidaNumberInput,
      paraNumberInput,
      prevPrematureBirthToggle,
      prevBirthComplicationToggle,
      prevCSectionToggle,
      prevPostpartumDepressionToggle,
      prevBreastfeedingProblemToggle,

      errorNotification,
      successNotification,
      saveButton,
      expectedDeliveryDateDescription,
      requiredFieldsLabel,
      lostPrevPregnanciesInfoNotification,
      gravidaLessThanParaErrorMessage,
      healthIntroBody,
      prevPregnanciesHeadline,
      userTilePregnancyHeadline,
      userTileHealthDataHeadline,
      nextButton,
      resetButton,
    } = getPregnancyViewDefinition(content.components);
    return (
      <Form onSubmit={handleSubmit} className="hedi--pregnancy-form">
        {showPregnancyPart && (
          <div className={isPartOfWizard ? "hedi--common-wizard__block" : ""}>
            {viewKind == "all" ? (
              <Row>
                <Column>
                  <Label {...userTilePregnancyHeadline} labelKind="h4" />
                </Column>
              </Row>
            ) : null}
            <Row>
              <Column className="hedi--form-section__intro-text--h1 hedi--body-long-01 hedi--pregnancy__intro">
                <Body {...introBody} />
              </Column>
            </Row>
            <Row>
              <Column>
                <DatePicker
                  value={birthDate.value}
                  onChange={(_, selectedDateString, ___) =>
                    birthDate.onChange(selectedDateString)
                  }
                  light={isPartOfWizard}
                  {...birthDateDatePicker}
                />
              </Column>
            </Row>
            <Row>
              <Column md={8} lg={8}>
                <DatePicker
                  value={expectedDeliveryDate.value}
                  onChange={(_, currentDateString, ___) =>
                    expectedDeliveryDate.onChange(currentDateString)
                  }
                  light={isPartOfWizard}
                  {...expectedDeliveryDatePicker}
                />
              </Column>
              <Column md={8} lg={8}>
                <Label labelKind="label" className="w100p" text="&nbsp;" />
                <Label
                  {...expectedDeliveryDateDescription}
                  className="bx--label"
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <ToggleRadio
                  label={multiplePregnancyToggle.labelText}
                  positiveOption={multiplePregnancyToggle.labelB}
                  negativeOption={multiplePregnancyToggle.labelA}
                  name="multiplePregnancy"
                  toggleValue={multiplePregnancy.value}
                  onChangeFunction={multiplePregnancy.onChange}
                />
              </Column>
            </Row>
            {!isPartOfWizard && <Seperator />}
            {viewKind == "all" && !isPartOfWizard ? (
              <Row>
                <Column>
                  <Label
                    {...prevPregnanciesHeadline}
                    labelKind="h4"
                    className="mb-05"
                  />
                </Column>
              </Row>
            ) : null}
            <Row>
              <Column md={8} lg={8}>
                <NumberInput
                  min={0}
                  {...gravidaNumberInput}
                  {...gravida}
                  invalid={gravida.value < para.value}
                  invalidText={gravidaLessThanParaErrorMessage.text}
                  light={isPartOfWizard}
                />
              </Column>
              <Column md={8} lg={8}>
                <NumberInput
                  min={0}
                  {...paraNumberInput}
                  {...para}
                  disabled={gravida.value == 0 && para.value == 0}
                  light={isPartOfWizard}
                />
              </Column>
            </Row>
            {!isPartOfWizard && <Seperator />}
            {gravida.value == 0 && hasUserHealthData ? (
              <Row>
                <Column>
                  <InlineNotification
                    {...lostPrevPregnanciesInfoNotification}
                    hideCloseButton={false}
                  />
                </Column>
              </Row>
            ) : null}
          </div>
        )}

        {showHealthPart && (
          <div className={isPartOfWizard ? "hedi--common-wizard__block" : ""}>
            {viewKind == "all" ? (
              <Row>
                <Column>
                  <Label {...userTileHealthDataHeadline} labelKind="h4" />
                </Column>
              </Row>
            ) : null}
            <Row>
              <Column className="hedi--form-section__intro-text--h1 hedi--body-long-01 hedi--pregnancy__intro">
                <Body {...healthIntroBody} />
              </Column>
            </Row>
            <Row>
              <Column>
                <ToggleRadio
                  label={prevPrematureBirthToggle.labelText}
                  positiveOption={prevPrematureBirthToggle.labelB}
                  negativeOption={prevPrematureBirthToggle.labelA}
                  name="prevPrematureBirth"
                  toggleValue={prevPrematureBirth.value}
                  onChangeFunction={prevPrematureBirth.onChange}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <ToggleRadio
                  label={prevBirthComplicationToggle.labelText}
                  positiveOption={prevBirthComplicationToggle.labelB}
                  negativeOption={prevBirthComplicationToggle.labelA}
                  name="prevBirthComplication"
                  toggleValue={prevBirthComplication.value}
                  onChangeFunction={prevBirthComplication.onChange}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <ToggleRadio
                  label={prevCSectionToggle.labelText}
                  positiveOption={prevCSectionToggle.labelB}
                  negativeOption={prevCSectionToggle.labelA}
                  name="prevCSection"
                  toggleValue={prevCSection.value}
                  onChangeFunction={prevCSection.onChange}
                  disabled={!gravida.value}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <ToggleRadio
                  label={prevPostpartumDepressionToggle.labelText}
                  positiveOption={prevPostpartumDepressionToggle.labelB}
                  negativeOption={prevPostpartumDepressionToggle.labelA}
                  name="prevPostpartumDepression"
                  toggleValue={prevPostpartumDepression.value}
                  onChangeFunction={prevPostpartumDepression.onChange}
                  disabled={!gravida.value}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <ToggleRadio
                  label={prevBreastfeedingProblemToggle.labelText}
                  positiveOption={prevBreastfeedingProblemToggle.labelB}
                  negativeOption={prevBreastfeedingProblemToggle.labelA}
                  name="prevBreastfeedingProblem"
                  toggleValue={prevBreastfeedingProblem.value}
                  onChangeFunction={prevBreastfeedingProblem.onChange}
                  disabled={!gravida.value}
                />
              </Column>
            </Row>
          </div>
        )}

        <Row>
          <Column md={4} lg={4}>
            {isSuccessfullySaved && (
              <ToastNotification {...successNotification} />
            )}
            {error && <ToastNotification {...errorNotification} />}
          </Column>
        </Row>
        {viewKind == "all" || viewKind == "pregnancy-part" ? (
          <Row>
            <Column>
              <Label {...requiredFieldsLabel} className="bx--label" />
            </Column>
          </Row>
        ) : null}

        {isPartOfWizard ? (
          <Row>
            <Column>
              <Button {...resetButton} onClick={doReload} />
            </Column>
            <Column>
              <div className="hedi--common-wizard__button_right">
                {isSaving ? (
                  <InlineLoading />
                ) : (
                  <Button
                    {...nextButton}
                    disabled={!isValidForm}
                    buttonKind="primary"
                    onClick={() => {
                      doSaveData(undefined, undefined, () => wizard?.next());
                    }}
                  />
                )}
              </div>
            </Column>
          </Row>
        ) : showSaveButton ? (
          isSaving ? (
            <InlineLoading />
          ) : (
            <Button {...saveButton} disabled={!isValidForm} />
          )
        ) : null}
        {isPregnancyLoading || isProfileLoading || isSaving ? (
          <Loading />
        ) : null}
      </Form>
    );
  }
);
