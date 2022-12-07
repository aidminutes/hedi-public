import {
  Form,
  FormGroup,
  Column,
  Row,
  InlineNotification,
  InlineLoading,
  ToastNotification,
} from "carbon-components-react";

import { IPage } from "@/modules/common/types";
import {
  FuzzyFilterDropdown,
  Seperator,
} from "@/modules/common/client/components";

import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
  IButtonComponent,
  Button,
  IBodyComponent,
  Body,
  IGroupComponent,
  isSelect,
  IDatePickerComponent,
  DatePicker,
} from "@/modules/components";
import { useUpsertProfile } from "./useUpsertProfile";
import { getUpsertProfileViewDefinition } from "./getUpsertProfileViewDefinition";
import {
  AddressesInput,
  IAddressesInputDefinition,
  ConsultationHoursInput,
  IConsultationHoursInputDefinition,
  EmailsInput,
  IEmailsInputDefinition,
  LanguageSkillsInput,
  ILanguageSkillsInputDefinition,
  PhonesInput,
  IPhonesInputDefinition,
  WebsitesInput,
  IWebsitesInputDefinition,
  ServicesInput,
} from "..";
import { IServicesInputDefinition } from "../ServicesInput";
export interface IUpsertProfileViewDefinition
  extends IUpsertPersonalViewDefinition,
    IUpsertProfessionalViewDefinition {
  nameLabel: ILabelComponent;
  prefixTextInput: ITextInputComponent;
  givenNameTextInput: ITextInputComponent;
  familyNameTextInput: ITextInputComponent;
  addressesInputDefinition: IAddressesInputDefinition;
  phonesInputDefinition: IPhonesInputDefinition;
  emailsInputDefinition: IEmailsInputDefinition;
  languageSkillsInputDefinition: ILanguageSkillsInputDefinition;
  profileSaveButton: IButtonComponent;
  introText: IBodyComponent;
  headline: ILabelComponent;
}

export interface IUpsertProfessionalViewDefinition {
  professionSelect: ISelectComponent;
  websitesInputDefinition: IWebsitesInputDefinition;
  consultationHoursInputDefinition: IConsultationHoursInputDefinition;
  professionHeadline: ILabelComponent;
  servicesInputDefinition: IServicesInputDefinition;
}
export interface IUpsertPersonalViewDefinition {
  birthDateDatePicker: IDatePickerComponent;
}

// TODO handle upsertPersonal as well
// seems too similar to implement in another View
export const ProfileEdit = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}) => {
  const {
    type,
    profession,
    namePrefix,
    givenName,
    familyName,
    birthDate,
    addresses,
    phones,
    emails,
    websites,
    languageLevels,
    consultationHours,
    services,
    isValidating,
    isSuccessfullySaved,
    handleSubmit,
  } = useUpsertProfile(content.lang);

  const {
    professionSelect,
    nameLabel,
    prefixTextInput,
    givenNameTextInput,
    familyNameTextInput,
    addressesInputDefinition,
    phonesInputDefinition,
    emailsInputDefinition,
    websitesInputDefinition,
    languageSkillsInputDefinition,
    consultationHoursInputDefinition,
    servicesInputDefinition,
    profileSaveButton,
    introText,
    professionHeadline,
    birthDateDatePicker,
    headline,
  } = getUpsertProfileViewDefinition(content.components);

  const isPersonalProfile = type === "Personal";
  return (
    <Form className="hedi--edit-profile" onSubmit={handleSubmit}>
      {/* {errors && (
        <InlineNotification kind="error" title="Error" subtitle={errors} />
      )} */}

      {introText && (
        <div className="hedi--edit-profile__intro-text hedi--account__headline-wrap">
          <Label {...headline} />
          <Body {...introText} />
        </div>
      )}
      {!isPersonalProfile && (
        <div className="hedi--group hedi--group--profile-type hedi--edit-profile__profession">
          <Row>
            <Column
              className="hedi--account__section-title"
              {...{ sm: 4, md: 8, lg: 4 }}>
              <Label {...professionHeadline} />
            </Column>
            <Column {...{ sm: 4, md: 8, lg: 7 }}>
              {/* TODO onChange handling */}

              {/* <FuzzyFilterDropdown
                placeholder={professionSelect.labelText}
                {...professionSelect}
              /> */}
              <Select {...profession} {...professionSelect} />
            </Column>
          </Row>
        </div>
      )}

      {/* TODO TextInput handling required star */}
      <div className="hedi--group hedi--group--name">
        <Row>
          <Column
            {...{ sm: 4, md: 8, lg: 4 }}
            className="hedi--account__headline">
            <Label {...nameLabel} />
          </Column>
          <Column {...{ sm: 4, md: 8, lg: 12 }}>
            <Row>
              <Column lg={9} md={6}>
                <TextInput {...givenName} {...givenNameTextInput} />
              </Column>
              <Column lg={4} md={2}>
                <TextInput {...namePrefix} {...prefixTextInput} />
              </Column>
            </Row>
            <Row>
              <Column lg={9} md={6}>
                <TextInput {...familyName} {...familyNameTextInput} />
              </Column>
            </Row>
            <Row>
              <Column lg={4} md={6}>
                <DatePicker
                  value={birthDate?.value}
                  onChange={(_, currentDateString, ___) =>
                    birthDate.onChange(currentDateString)
                  }
                  {...birthDateDatePicker}
                />
              </Column>
            </Row>
          </Column>
        </Row>
      </div>
      <Seperator color="gray" type="l" />

      <div className="hedi--group hedi--group--address">
        <AddressesInput
          personalContext={isPersonalProfile}
          maxCount={isPersonalProfile ? 1 : undefined}
          {...addresses}
          {...addressesInputDefinition}
        />
      </div>
      <Seperator color="gray" type="l" />

      <div className="hedi--group hedi--group--contact">
        <PhonesInput
          personalContext={isPersonalProfile}
          maxCount={isPersonalProfile ? 1 : undefined}
          {...phones}
          {...phonesInputDefinition}
        />
        <EmailsInput
          personalContext={isPersonalProfile}
          maxCount={isPersonalProfile ? 1 : undefined}
          {...emails}
          {...emailsInputDefinition}
        />
        {websites && (
          <WebsitesInput {...websites} {...websitesInputDefinition} />
        )}
      </div>
      <Seperator color="gray" type="l" />

      {!isPersonalProfile && (
        <>
          <div className="hedi--group hedi--group--consultation-hours">
            <ConsultationHoursInput
              {...consultationHours}
              {...consultationHoursInputDefinition}
            />
          </div>
          <Seperator color="gray" type="l" />
        </>
      )}
      <div className="hedi--group hedi--group--language-skills">
        <LanguageSkillsInput
          {...languageLevels}
          {...languageSkillsInputDefinition}
        />
      </div>
      <Seperator color="gray" type="l" />

      {!isPersonalProfile && profession.value && (
        <div className="hedi--group hedi--group--services">
          <ServicesInput
            professionFilter={profession.value}
            {...services}
            {...servicesInputDefinition}
          />
        </div>
      )}

      <Row>
        <Column lg={8} md={8}>
          {isValidating ? (
            <InlineLoading status="active" />
          ) : isSuccessfullySaved ? (
            <ToastNotification
              title={"Success"}
              subtitle={"success_message"}
              caption={"profile saved"}
              // TODO no automatic redirect yet
              kind="success"
              lowContrast
              hideCloseButton
              style={{ width: "100%" }}
            />
          ) : (
            // ) : hasError() ? (
            //   <ToastNotification
            //     title={"Error"}
            //     subtitle={"error_message"}
            //     caption=""
            //     kind="error"
            //     lowContrast
            //     hideCloseButton
            //     style={{ width: "100%" }}
            //   />
            <Button {...profileSaveButton} />
          )}
        </Column>
      </Row>
    </Form>
  );
};
