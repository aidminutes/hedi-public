import React from "react";
import {
  Column,
  InlineLoading,
  Row,
  Tabs,
  Tab,
  SkeletonPlaceholder,
} from "carbon-components-react";
import { IPage } from "@/modules/common/types";
import {
  Label,
  Body,
  Image,
  InlineNotification,
  Button,
  Link,
  ISelectComponent,
} from "@/modules/components";
import { selectPrimaryData } from "@/modules/profile/utils";
import { getMidwifeCareRequestViewDefinition } from "./getMidwifeCareRequestViewDefinition";
import { useMidwifeCareRequestView } from "./useMidwifeCareRequestView";
import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { getGeoDistanceByAddresses } from "../MidwifeCareConnections/MidwifeCareConnectionsView";
import { UserTile } from "@/modules/profile/client/components";
import { Map } from "@/modules/map/client";
import { Location } from "@/modules/map/types";
import { LatLngTuple } from "leaflet";
import { HediPersonRound } from "@/modules/svg";
import { StateContainer } from "./StateContainer";
import { calculateAge, romanize } from "@/modules/common/utils";
import { useTransitionModal } from "../TransitionModal/useTransitionModal";
import { useEffect, useState } from "react";
import { TransitionModal } from "../TransitionModal";
import { ITransition } from "@/modules/model";
import {
  CarbonIconType,
  CheckmarkFilled16,
  ErrorFilled16,
  Partnership16,
  UserAdmin16,
  Misuse16,
} from "@carbon/icons-react";
import { formatDateRelative } from "@/modules/messaging/client/utils/dateFormat/formatDateRelative";
import { parseConnectionMatches } from "./parseConnectionMatches";
import {
  CheckboxIconType,
  LabeledList,
} from "@/modules/common/client/components/LabeledList";
import { ProfileUserCardCompact } from "@/modules/profile/client/components/ProfileUserCard/ProfileUserCardCompact/ProfileUserCardCompact";
import { IUserProfile } from "@/modules/profile/types/IUserProfile";
import { useRecipientServices } from "./useRecipientServices";
import { IMidwife } from "@/modules/profile/types";
import { ListAccordion } from "@/modules/common/client/components";
import { ConsultationHoursView } from "@/modules/profile/client/components/ProfileUserCard/ConsultationHoursView";
import { calculatePregnancyWeekAndDay } from "@/modules/profile/utils/calculatePregnancyWeekAndDay";

export type IMidwifeCareRequestView = IPage & {
  // props...
};

export const MidwifeCareRequestView = ({
  content,
}: {
  content: IMidwifeCareRequestView;
}) => {
  const {
    noResultsLabel,
    requestHeadline,
    requestDateLabel,
    searchedCareHeadline,
    careTypeLabel,
    languageLabel,
    serviceLabel,
    messageHeadline,
    additionalInfoLabel,
    locationLabel,
    streetLabel,
    distanceLabel,
    profileHeadlineClient,
    profileHeadlineUser,
    profileBodyPending,
    profileBodyActive,
    negativeAnswerLabel,
    positiveAnswerLabel,
    yearsOldLabel,
    expectedDeliveryDateLabel,
    estimatedDateText,
    multiplePregnancyLabel,
    prevPregnanciesHeadline,
    gravidaHeadline,
    prematureBirthLabel,
    prevBirthLabel,
    paraLabel,
    prevBirthComplicationLabel,
    postpartumDepressionLabel,
    breastfeedingProblemLabel,
    userTilePregnancyHeadline,
    userTileProfileCardLabel,
    nameLabel,
    clientAge,
    cSectionLabel,
    emailLabel,
    tabProfileLabel,
    tabRequestLabel,
    formatDateRelativeDefinition,
    distanceTemplate,
    requestBodyPersonal,
    requestHeadlinePersonal,
    tabRequestPersonalLabel,
    midwifeProfile,
    matchingRequestHeadline,
    profileLabel,
    profileCardLink,
    pregnancyLink,
    sendInformationHeadline,
    careBodyPersonal,
    careHeadlinePersonal,
    tabCarePersonalLabel,
    matchingCareHeadline,
    tabCareLabel,
    careHeadline,
    servicesCareHeadline,
    midwifeRequestDetailsBody,
    servicesTileTitleLabel,
    allServices,
    servicesLabel,
    servicesCareTypesTitleLabel,
    serviceGroupRecipientEmptyStateLabel,
    userTileAvailabilityHeadlineLabel,
    pregnancyWeekAbbreviationLabel,
    pregnancyWeekLabel,
  } = getMidwifeCareRequestViewDefinition(content.components);
  const {
    isMissingData,
    isLoading,
    isValidating,
    route,
    midwifeCareConnection,
    midwifeCareRequest,
    lang,
    myProfile,
    customState,
    mutate,
    isPersonalProfile,
  } = useMidwifeCareRequestView(content);
  const {
    isTransitionModalOpen,
    setIsTransitionModalOpen,
    onTransitionModalClose,
    isModalLoading,
    hasError,
    handleSubmit,
    careConnection,
    setCareConnection,
    transition,
    setTransition,
    stateChangeNotification,
  } = useTransitionModal(content.lang, content.components, mutate);

  const [notificationCounter, setNotificationCounter] = useState(0);
  useEffect(() => {
    if (stateChangeNotification) {
      setNotificationCounter(notificationCounter + 1);
    }
  }, [stateChangeNotification]);

  const getAnswerByBoolean = (value: boolean | undefined) => {
    if (value === undefined) return "-";
    return value ? positiveAnswerLabel.text : negativeAnswerLabel.text;
  };

  if ((!isMissingData && !midwifeCareRequest) || !route) {
    return (
      <div className="hedi--midwife-care-request-view">
        <Label
          {...noResultsLabel}
          className="hedi--midwife-care-request-view__no-results"
        />
      </div>
    );
  }

  const {
    ownerProfile,
    pregnancy,
    body: defaultMessage,
    careTypes,
    services,
    languages,
  } = midwifeCareRequest || {};

  const { recipient, state } = midwifeCareConnection || {};

  const { hasCareTypes, hasServices } = useRecipientServices(recipient);

  const isActiveCare = state?.route.includes("active");

  const FALLBACK_LOCATION: LatLngTuple = [51.9481, 10.26517];

  const distance =
    ownerProfile && myProfile
      ? parseInt(
          getGeoDistanceByAddresses(myProfile.addresses, ownerProfile.addresses)
        )
      : 9999;

  const locationOwner: Location = ownerProfile
    ? {
        label: ownerProfile.label,
        latLong: stringToLatLangTuple(
          selectPrimaryData(ownerProfile.addresses)?.latLong || ""
        ),
      }
    : { label: "", latLong: FALLBACK_LOCATION };

  const locationUser: Location = myProfile
    ? {
        label: myProfile.label,
        latLong: stringToLatLangTuple(
          selectPrimaryData(myProfile.addresses)?.latLong || ""
        ),
      }
    : { label: "", latLong: FALLBACK_LOCATION };

  const locations = [locationOwner, locationUser];

  const localizedDate = pregnancy
    ? new Date(pregnancy.expectedDeliveryDate).toLocaleDateString(lang)
    : undefined;

  const matches = parseConnectionMatches(
    midwifeCareConnection?.sender,
    midwifeCareConnection?.recipient
  );

  const { matchingCareTypes, matchingLanguages, matchingServices } = matches;
  const activeMatchingCareTypes = matchingCareTypes.filter(
    item => item.foundInProfile === true
  );
  const activeMatchingLanguages = matchingLanguages.filter(
    item => item.foundInProfile === true
  );
  const activeMatchingServices = matchingServices.filter(
    item => item.foundInProfile === true
  );
  const hasMatchingCareTypes = matchingCareTypes.length > 0;
  const hasMatchingLanguages = matchingLanguages.length > 0;
  const hasMatchingServices = matchingServices.length > 0;

  return (
    <div className="hedi--midwife-care-request-view">
      <div className="hedi--midwife-care-request-view__inline-loader">
        {isValidating && !isMissingData ? <InlineLoading /> : null}
      </div>
      {ownerProfile && !isPersonalProfile && (
        <Row>
          <Column>
            <ProfileCard
              profileType={ProfileCardType.PERSONAL}
              title={ownerProfile.label}
              address={selectPrimaryData(ownerProfile.addresses)}
              image={ownerProfile.image}
              distanceInKm={distance}
              estimatedDateText={estimatedDateText.text}
              estimatedDate={localizedDate}
              distanceTemplate={distanceTemplate}
              pregnancyWeek={calculatePregnancyWeekAndDay(
                pregnancy?.expectedDeliveryDate || ""
              )}
              pregnancyWeekText={pregnancyWeekAbbreviationLabel.text}
            />
          </Column>
        </Row>
      )}
      {recipient && isPersonalProfile && (
        <Row>
          <Column>
            <ProfileCard
              profileType={ProfileCardType.PROFESSIONAL}
              title={recipient.label}
              address={selectPrimaryData(recipient.addresses)}
              image={recipient.image}
              distanceInKm={distance}
              distanceTemplate={distanceTemplate}
              href={recipient.route}
            />
          </Column>
        </Row>
      )}
      {!!stateChangeNotification && (
        <InlineNotification
          key={notificationCounter}
          {...stateChangeNotification}
          hideCloseButton={false}
        />
      )}
      <Tabs selected={isActiveCare && !isPersonalProfile ? 1 : 0}>
        {isPersonalProfile && (
          <Tab label={midwifeProfile.labelText}>
            <Row>
              <Column>
                <Label
                  labelKind="h4"
                  text={midwifeProfile.labelText}
                  className="hedi--midwife-care-request-view__owner-profile-headline"
                />
                <div className="hedi--midwife-care-request-view__personal-body">
                  <Body {...midwifeRequestDetailsBody} />
                </div>
              </Column>
            </Row>
            <StateContainer
              content={content}
              connection={midwifeCareConnection}
              changed={midwifeCareConnection?.changed || new Date()}
              customState={customState}
              isPersonal={isPersonalProfile}
            />
            <Row>
              <UserTile
                emptyStateText=""
                kind="Contact"
                contentHeadline={userTileProfileCardLabel.text || ""}
                isEmpty={false}
                onEditClick={() => console.log("Click Edit")}
                hideEditButton={true}>
                <ProfileUserCardCompact
                  profile={recipient as IUserProfile}
                  content={content}
                />
              </UserTile>
              <UserTile
                isEmpty={false}
                emptyStateText={""}
                kind="Services"
                contentHeadline={servicesTileTitleLabel.text || ""}
                columns={2}
                onEditClick={() => console.log("")}
                hideEditButton={true}>
                {hasCareTypes ? (
                  <div className="hedi--profile__services__care-types-info">
                    <Label {...servicesCareTypesTitleLabel} />
                    <div>
                      <Label
                        labelKind="paragraph"
                        text={(recipient as IMidwife).careTypes
                          .map(careType => careType.label)
                          .join(" | ")}
                      />
                    </div>
                  </div>
                ) : null}
                {hasServices && recipient ? (
                  <div>
                    <Label {...servicesLabel} />
                    {allServices.components.map(group => (
                      <ListAccordion
                        emptyStateText={
                          serviceGroupRecipientEmptyStateLabel.text || ""
                        }
                        title={(group as ISelectComponent).labelText || ""}
                        elements={(recipient as IMidwife).services
                          .filter(
                            serviceItem =>
                              (group as ISelectComponent).items.findIndex(
                                item => item.route === serviceItem.route
                              ) !== -1
                          )
                          .map(item => item.label)}
                      />
                    ))}
                  </div>
                ) : null}
              </UserTile>
              {!!recipient?.consultationHours?.length ? (
                <UserTile
                  kind="Availability"
                  isEmpty={false}
                  hideEditButton={true}
                  emptyStateText=""
                  contentHeadline={userTileAvailabilityHeadlineLabel.text || ""}
                  onEditClick={() => console.log("")}>
                  <ConsultationHoursView
                    elements={recipient.consultationHours}
                  />
                </UserTile>
              ) : null}
            </Row>
          </Tab>
        )}
        <Tab
          label={
            isPersonalProfile
              ? isActiveCare
                ? tabCarePersonalLabel.text
                : tabRequestPersonalLabel.text
              : isActiveCare
              ? tabCareLabel.text
              : tabRequestLabel.text
          }>
          <Row>
            <Column>
              {!isPersonalProfile && isActiveCare ? (
                <Label
                  {...careHeadline}
                  className="hedi--midwife-care-request-view__owner-profile-headline"
                />
              ) : !isPersonalProfile ? (
                <Label
                  {...requestHeadline}
                  className="hedi--midwife-care-request-view__owner-profile-headline"
                />
              ) : isActiveCare ? (
                <>
                  <Label
                    {...careHeadlinePersonal}
                    className="hedi--midwife-care-request-view__owner-profile-headline"
                  />
                  <div className="hedi--midwife-care-request-view__personal-body">
                    <Body {...careBodyPersonal} />
                  </div>
                </>
              ) : (
                <>
                  <Label
                    {...requestHeadlinePersonal}
                    className="hedi--midwife-care-request-view__owner-profile-headline"
                  />
                  <div className="hedi--midwife-care-request-view__personal-body">
                    <Body {...requestBodyPersonal} />
                  </div>
                </>
              )}
            </Column>
          </Row>
          {!isActiveCare &&
          !isPersonalProfile &&
          midwifeCareConnection?.created ? (
            <Row>
              <Column>
                <p className="hedi--midwife-care-request-view__date">
                  {requestDateLabel.text}{" "}
                  {formatDateRelative({
                    date: midwifeCareConnection?.created,
                    locale: lang,
                    alwaysShowTime: true,
                    ...formatDateRelativeDefinition,
                  })}
                </p>
              </Column>
            </Row>
          ) : null}
          <StateContainer
            content={content}
            connection={midwifeCareConnection}
            changed={midwifeCareConnection?.changed || new Date()}
            customState={customState}
            isPersonal={isPersonalProfile}
          />
          {isLoading ? (
            <SkeletonPlaceholder />
          ) : (
            <>
              {isPersonalProfile && (
                <Row>
                  <UserTile
                    kind="Services"
                    isEmpty={false}
                    emptyStateText=""
                    onEditClick={() => console.log("click")}
                    contentHeadline={
                      isActiveCare
                        ? matchingCareHeadline.text || ""
                        : matchingRequestHeadline.text || ""
                    }
                    hideEditButton={true}>
                    {matches && (
                      <>
                        {hasMatchingCareTypes && (
                          <LabeledList
                            labelDefinition={careTypeLabel}
                            listItems={
                              isActiveCare
                                ? activeMatchingCareTypes
                                : matchingCareTypes
                            }
                            isChecklist
                            checklistIconType={CheckboxIconType.Both}
                            className="hedi--midwife-care-request-view__labeled-list"
                          />
                        )}
                        {hasMatchingLanguages && (
                          <LabeledList
                            labelDefinition={languageLabel}
                            listItems={
                              isActiveCare
                                ? activeMatchingLanguages
                                : matchingLanguages
                            }
                            isChecklist
                            checklistIconType={CheckboxIconType.Both}
                            className="hedi--midwife-care-request-view__labeled-list"
                          />
                        )}
                        {hasMatchingServices && (
                          <LabeledList
                            labelDefinition={serviceLabel}
                            listItems={
                              isActiveCare
                                ? activeMatchingServices
                                : matchingServices
                            }
                            isChecklist
                            checklistIconType={CheckboxIconType.Both}
                            className="hedi--midwife-care-request-view__labeled-list"
                          />
                        )}
                      </>
                    )}
                  </UserTile>
                  <UserTile
                    kind="Fetus"
                    isEmpty={false}
                    emptyStateText=""
                    onEditClick={() => console.log("")}
                    hideEditButton={true}
                    contentHeadline={sendInformationHeadline.text || ""}
                    columns="half">
                    <div className="hedi--midwife-care-request-view__profile-links">
                      <Label {...profileLabel} />
                      <Link {...profileCardLink} target="_blank" />
                      <Link {...pregnancyLink} target="_blank" />
                    </div>
                    {defaultMessage && (
                      <div className="hedi--midwife-care-request-view__additional-info">
                        <Label {...additionalInfoLabel} />
                        <div>
                          <p className="hedi--midwife-care-request-view__additional-text">
                            {defaultMessage}
                          </p>
                        </div>
                      </div>
                    )}
                  </UserTile>
                </Row>
              )}
              <Row>
                {!isPersonalProfile && (
                  <UserTile
                    kind="Services"
                    isEmpty={false}
                    emptyStateText=""
                    onEditClick={() => console.log("Edit")}
                    contentHeadline={
                      isActiveCare
                        ? servicesCareHeadline.text || ""
                        : searchedCareHeadline.text || ""
                    }
                    hideEditButton={true}>
                    {careTypes && careTypes.length > 0 && (
                      <div className="hedi--midwife-care-request-view__list">
                        <Label {...careTypeLabel} />
                        {isActiveCare ? (
                          <ul>
                            {activeMatchingCareTypes.map(careType => (
                              <li key={careType.value}>{careType.value}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul>
                            {careTypes.map(careType => (
                              <li key={careType.route}>{careType.label}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {languages && languages.length > 0 && (
                      <div className="hedi--midwife-care-request-view__list">
                        <Label {...languageLabel} />
                        {isActiveCare ? (
                          <ul>
                            {activeMatchingLanguages.map(language => (
                              <li key={language.value}>{language.value}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul>
                            {languages.map(language => (
                              <li key={language.route}>{language.label}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {services && services.length > 0 && (
                      <div className="hedi--midwife-care-request-view__list">
                        <Label {...serviceLabel} />
                        {isActiveCare ? (
                          <ul>
                            {activeMatchingServices.map(service => (
                              <li key={service.value}>{service.value}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul>
                            {services.map(service => (
                              <li key={service.route}>{service.label}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </UserTile>
                )}
                {!isPersonalProfile && defaultMessage && (
                  <UserTile
                    kind="Services"
                    isEmpty={false}
                    emptyStateText=""
                    onEditClick={() => console.log("Edit")}
                    contentHeadline={messageHeadline.text || ""}
                    hideEditButton={true}>
                    <Label {...additionalInfoLabel} />
                    <p className="hedi--midwife-care-request-view__additional-text">
                      {defaultMessage}
                    </p>
                  </UserTile>
                )}
                {!isPersonalProfile && (
                  <UserTile
                    onEditClick={() => console.log("Klick")}
                    hideEditButton={true}
                    contentHeadline="Ort und Anfahrt"
                    kind="Availability"
                    isEmpty={false}
                    emptyStateText="">
                    <div className="hedi--midwife-care-request-view__inline-info">
                      <Label {...locationLabel} />
                      {ownerProfile && (
                        <p>
                          {
                            selectPrimaryData(ownerProfile.addresses)
                              ?.postalCode
                          }{" "}
                          {selectPrimaryData(ownerProfile.addresses)?.city}
                        </p>
                      )}
                    </div>
                    <div className="hedi--midwife-care-request-view__inline-info">
                      <Label {...streetLabel} />
                      {ownerProfile && (
                        <p>
                          {selectPrimaryData(ownerProfile.addresses)?.street}{" "}
                          {
                            selectPrimaryData(ownerProfile.addresses)
                              ?.streetNumber
                          }
                        </p>
                      )}
                    </div>
                    {locations && !isNaN(distance) ? (
                      <div className="hedi--midwife-care-request-view__inline-info">
                        <Label {...distanceLabel} />
                        <p>{distance} km</p>
                      </div>
                    ) : null}
                    {locations && <Map locations={locations} />}
                  </UserTile>
                )}
              </Row>
              <Row>
                <Column>
                  <div className="hedi--midwife-care-request-view__action-buttons"></div>
                </Column>
              </Row>
            </>
          )}
        </Tab>
        {!isPersonalProfile && (
          <Tab label={tabProfileLabel.text}>
            <Row>
              <Column>
                <Label
                  {...(isActiveCare
                    ? profileHeadlineClient
                    : profileHeadlineUser)}
                  className="hedi--midwife-care-request-view__owner-profile-headline"
                />

                <div className="hedi--midwife-care-request-view__profile-body">
                  <Body
                    {...(isActiveCare ? profileBodyActive : profileBodyPending)}
                  />
                </div>
              </Column>
            </Row>
            <StateContainer
              content={content}
              connection={midwifeCareConnection}
              changed={midwifeCareConnection?.changed || new Date()}
              customState={customState}
              isPersonal={isPersonalProfile}
            />
            <Row>
              <UserTile
                emptyStateText=""
                contentHeadline={
                  userTileProfileCardLabel.text || "visitenkarte"
                }
                isEmpty={false}
                hideEditButton={true}
                onEditClick={() => console.log("")}
                kind="Avatar">
                {ownerProfile && (
                  <>
                    <div className="small-avatar">
                      {ownerProfile && ownerProfile.image ? (
                        <Image
                          {...ownerProfile?.image}
                          className="round-image "
                        />
                      ) : (
                        <HediPersonRound />
                      )}
                    </div>
                    <div className="">
                      <label className="bx--label inline-label">
                        {nameLabel.text}
                      </label>
                      <span className="hedi--midwife-care-request-view__answer">
                        {ownerProfile?.label}
                      </span>
                    </div>
                    <div className="">
                      <label className="bx--label inline-label">
                        {locationLabel.text}
                      </label>
                      <span className="hedi--midwife-care-request-view__answer">
                        {selectPrimaryData(ownerProfile.addresses)?.postalCode}{" "}
                        {selectPrimaryData(ownerProfile.addresses)?.city}
                      </span>
                    </div>
                    <div className="mb-07">
                      <label className="bx--label inline-label">
                        {streetLabel.text}
                      </label>
                      <span className="hedi--midwife-care-request-view__answer">
                        {selectPrimaryData(ownerProfile.addresses)?.street}{" "}
                        {
                          selectPrimaryData(ownerProfile.addresses)
                            ?.streetNumber
                        }
                      </span>
                    </div>
                    <div className="">
                      <label className="bx--label inline-label">
                        {emailLabel.text}
                      </label>
                      <span className="hedi--midwife-care-request-view__answer">
                        {selectPrimaryData(ownerProfile.emails)?.email}
                      </span>
                    </div>
                    <div className="mb-07">
                      <label className="bx--label inline-label">
                        {
                          selectPrimaryData(ownerProfile.phones)?.phoneKind
                            .label
                        }
                      </label>
                      <span className="hedi--midwife-care-request-view__answer">
                        {selectPrimaryData(ownerProfile.phones)?.phone}
                      </span>
                    </div>
                    {ownerProfile.languageLevels.map(language => (
                      <div className="" key={language.language.route}>
                        <label className="bx--label inline-label">
                          {language.fluency.label}
                        </label>
                        <span className="hedi--midwife-care-request-view__answer">
                          {language.language.label}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </UserTile>

              <UserTile
                emptyStateText=""
                contentHeadline={
                  userTilePregnancyHeadline.text || "schwangerschaft"
                }
                hideEditButton={true}
                isEmpty={false}
                onEditClick={() => console.log("")}
                kind="Pregnancy">
                <>
                  <div className="">
                    <label className="bx--label inline-label">
                      {clientAge.text}
                    </label>
                    <span className="hedi--midwife-care-request-view__answer">
                      {calculateAge(ownerProfile?.birthDate)}{" "}
                      {yearsOldLabel.text}
                    </span>
                  </div>
                  <div className="">
                    <label className="bx--label inline-label">
                      {expectedDeliveryDateLabel.text}
                    </label>
                    <span className="hedi--midwife-care-request-view__answer">
                      {localizedDate}
                    </span>
                  </div>
                  <div>
                    <label className="bx--label inline-label">
                      {pregnancyWeekAbbreviationLabel.text}
                    </label>
                    <span className="hedi--midwife-care-request-view__answer">
                      {calculatePregnancyWeekAndDay(
                        pregnancy?.expectedDeliveryDate || ""
                      )}
                    </span>
                  </div>
                  <div className="">
                    <label className="bx--label inline-label">
                      {multiplePregnancyLabel.text}
                    </label>
                    <span className="hedi--midwife-care-request-view__answer">
                      {getAnswerByBoolean(pregnancy?.multiplePregnancy)}
                    </span>
                  </div>
                  <div className="">
                    <label className="bx--label inline-label">
                      {gravidaHeadline.text}
                    </label>
                    <span className="hedi--midwife-care-request-view__answer">
                      {romanize(pregnancy?.gravida || 0)}
                    </span>
                  </div>
                  <div className="mb-07">
                    <label className="bx--label inline-label">
                      {paraLabel.text}
                    </label>
                    <span className="hedi--midwife-care-request-view__answer">
                      {romanize(pregnancy?.para || 0)}
                    </span>
                  </div>
                  {pregnancy && pregnancy.gravida > 0 && (
                    <>
                      <div className="">
                        <label className="bx--label inline-label">
                          {prematureBirthLabel.text}
                        </label>
                        <span className="hedi--midwife-care-request-view__answer">
                          {getAnswerByBoolean(pregnancy?.prevPrematureBirth)}
                        </span>
                      </div>
                      <div className="">
                        <label className="bx--label inline-label">
                          {prevBirthComplicationLabel.text}
                        </label>
                        <span className="hedi--midwife-care-request-view__answer">
                          {getAnswerByBoolean(pregnancy?.prevBirthComplication)}
                        </span>
                      </div>
                      <div className="">
                        <label className="bx--label inline-label">
                          {cSectionLabel.text}
                        </label>
                        <span className="hedi--midwife-care-request-view__answer">
                          {getAnswerByBoolean(pregnancy?.prevCSection)}
                        </span>
                      </div>
                      <div className="">
                        <label className="bx--label inline-label">
                          {postpartumDepressionLabel.text}
                        </label>
                        <span className="hedi--midwife-care-request-view__answer">
                          {getAnswerByBoolean(
                            pregnancy?.prevPostpartumDepression
                          )}
                        </span>
                      </div>
                      <div className="">
                        <label className="bx--label inline-label">
                          {breastfeedingProblemLabel.text}
                        </label>
                        <span className="hedi--midwife-care-request-view__answer">
                          {getAnswerByBoolean(
                            pregnancy?.prevBreastfeedingProblem
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </>
              </UserTile>
            </Row>
          </Tab>
        )}
      </Tabs>
      {midwifeCareConnection && midwifeCareConnection.transitions.length > 0 && (
        <div className="hedi--midwife-care-request-view__button-container">
          {midwifeCareConnection?.transitions?.map(transition => {
            const buttonType = getButtonType(transition);
            return (
              <Button
                {...buttonType}
                labelText={transition.longLabel}
                onClick={() => {
                  setCareConnection(midwifeCareConnection);
                  setTransition(transition);
                  setIsTransitionModalOpen(true);
                }}
              />
            );
          })}
        </div>
      )}
      {midwifeCareConnection && transition && (
        <TransitionModal
          {...{
            content,
            handleSubmit,
            owner: isPersonalProfile
              ? midwifeCareConnection.recipient
              : midwifeCareConnection.sender.ownerProfile,
            currentState: midwifeCareConnection.state.route,
            transition: transition,
            isModalLoading,
            hasError,
            isModalOpen: isTransitionModalOpen,
            onCloseModal: onTransitionModalClose,
          }}
        />
      )}
    </div>
  );
};

function stringToLatLangTuple(value: string): LatLngTuple {
  const values = value.split(",");
  return [parseFloat(values[0]), parseFloat(values[1])] as LatLngTuple;
}

interface IButtonDetails {
  buttonKind: string;
  renderIcon: CarbonIconType | null;
}

function getButtonType(transition: ITransition): IButtonDetails {
  switch (transition.route) {
    case "midwife_care_connection.recipient_reject":
      return { buttonKind: "danger--tertiary", renderIcon: ErrorFilled16 };
    case "midwife_care_connection.sender_confirm":
      return { buttonKind: "primary", renderIcon: Partnership16 };
    case "midwife_care_connection.recipient_handshake":
      return { buttonKind: "primary", renderIcon: CheckmarkFilled16 };
    case "midwife_care_connection.recipient_complete":
      return { buttonKind: "primary", renderIcon: UserAdmin16 };
    case "midwife_care_connection.recipient_handshake_reject":
    case "midwife_care_connection.sender_cancel":
    case "midwife_care_connection.sender_withdraw":
      return { buttonKind: "danger--tertiary", renderIcon: ErrorFilled16 };
    case "midwife_care_connection.recipient_care_cancel":
      return { buttonKind: "danger--tertiary", renderIcon: Misuse16 };
    case "midwife_care_connection.sender_care_cancel":
      return { buttonKind: "danger--tertiary", renderIcon: null };
    default:
      return { buttonKind: "primary", renderIcon: null };
  }
}
