import { IPage } from "@/modules/common/types";
import { getMidwifeCaresViewDefinition } from "./index";
import { useMyMidwifeCareConnections } from "@/modules/networking/client/hooks/useMyMidwifeCareConnections";
import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { Body, Button, InlineNotification, Label } from "@/modules/components";
import { selectPrimaryData } from "@/modules/profile/utils/transformProfileToEntry";
import { StateTag } from "../StateTag";
import { formatDateRelative } from "@/modules/messaging/client/utils/dateFormat/formatDateRelative";
import { ArrowUpRight16, OverflowMenuVertical16 } from "@carbon/icons-react";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import { useTransitionModal } from "../TransitionModal/useTransitionModal";
import { TransitionModal } from "../TransitionModal";
import { useEffect, useState } from "react";
import { useLocaleInfo } from "@/modules/shell/client/contexts";
import { EmptyStateTile } from "@/modules/common/client/components";
import { getGeoDistanceByAddresses } from "../MidwifeCareConnections/MidwifeCareConnectionsView";
import {
  isChattingAllowed,
  openChatRoomUsingRouter,
} from "@/modules/networking/utils/connections";
import { useRouter } from "next/router";

export type IMyMidwifeCaresView = IPage & {};

//for pregnants
export const MyMidwifeCaresView = ({
  content,
}: {
  content: IMyMidwifeCaresView;
}) => {
  const {
    mutate,
    isPersonalProfile,
    myCareConnections,
  } = useMyMidwifeCareConnections(content.lang);
  const {
    caresPersonalHeadline,
    caresPersonalBody,
    formatDateRelativeDefinition,
    detailsLabel,
    careTypesLabel,
    servicesLabel,
    languageLabel,
    careRequestUrl,
    emptyStateMidwifeImage,
    emptyStatePersonalText,
    emptyStatePersonalButtonOne,
    emptyStatePersonalButtonTwo,
    conversationLink,
    chatLabel,
  } = getMidwifeCaresViewDefinition(content.components);

  const router = useRouter();

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

  const {
    active: { isRTL },
  } = useLocaleInfo();

  const [notificationCounter, setNotificationCounter] = useState(0);
  useEffect(() => {
    if (stateChangeNotification) {
      setNotificationCounter(notificationCounter + 1);
    }
  }, [stateChangeNotification]);

  myCareConnections.sort(a => (a.state.route.includes("active") ? -1 : 1));

  return (
    <div className="hedi--cares-view hedi--my-cares-view">
      <Label {...caresPersonalHeadline} />
      <div className="hedi--userpanel-layout__intro-text">
        <Body {...caresPersonalBody} />
      </div>
      {!!stateChangeNotification && (
        <InlineNotification
          key={notificationCounter}
          {...stateChangeNotification}
          hideCloseButton={false}
        />
      )}
      {myCareConnections.length === 0 && (
        <EmptyStateTile
          text={emptyStatePersonalText}
          img={emptyStateMidwifeImage}
          renderInteractionArea={() => (
            <div className="hedi--button-container">
              <Button
                {...emptyStatePersonalButtonOne}
                renderIcon={ArrowUpRight16}
              />
              <Button {...emptyStatePersonalButtonTwo} />
            </div>
          )}
        />
      )}

      {myCareConnections.map(connection => {
        const { route } = connection.state;
        const { label, addresses, image } = connection.recipient;
        const detailsUrl = careRequestUrl + `?${connection.route}`;
        const { careTypes, services, languages } = connection.sender;
        const {
          careTypes: midwifeCareTypes,
          services: midwifeServices,
          languageLevels: midwifeLanguageLevels,
        } = connection.recipient;
        const matchedCareTypes = careTypes.filter(ct =>
          midwifeCareTypes?.some(mct => mct.route === ct.route)
        );
        const matchedServices = services.filter(s =>
          midwifeServices?.some(ms => ms.route === s.route)
        );
        const matchedLanguages = languages.filter(l =>
          midwifeLanguageLevels?.some(ll => ll.language.route === l.route)
        );
        const hasMatchedCareTypes = matchedCareTypes.length > 0;
        const hasMatchedServices = matchedServices.length > 0;
        const hasMatchedLanguages = matchedLanguages.length > 0;
        return (
          <ProfileCard
            className="hedi--profile-card--extended-interaction-area"
            state={isCancelledOrCompleted(route) ? "inactive" : "normal"}
            key={connection.route}
            profileType={
              isPersonalProfile
                ? ProfileCardType.PROFESSIONAL
                : ProfileCardType.PERSONAL
            }
            title={label}
            address={selectPrimaryData(addresses)}
            image={image}
            href={detailsUrl}
            linkTarget="_self"
            distanceInKm={parseInt(
              getGeoDistanceByAddresses(
                addresses,
                connection.sender.ownerProfile.addresses
              )
            )}
            renderInteractionArea={() => (
              <div className="hedi--profile-card__state-container">
                <StateTag state={connection.state}>
                  {connection.state.label}
                </StateTag>
                <span className="hedi--profile-card__timestamp">
                  {formatDateRelative({
                    date: new Date(connection.changed),
                    locale: content.lang,
                    alwaysShowTime: true,
                    ...formatDateRelativeDefinition,
                  })}
                </span>
                <OverflowMenu
                  renderIcon={OverflowMenuVertical16}
                  flipped={isRTL ? false : true}>
                  <OverflowMenuItem
                    itemText={detailsLabel.text || ""}
                    disabled={isCancelledOrCompleted(route)}
                    onClick={() => window.open(detailsUrl, "_self")}
                  />
                  <OverflowMenuItem
                    itemText={chatLabel.text || ""}
                    disabled={
                      !isChattingAllowed(
                        connection.state.route,
                        isPersonalProfile
                      )
                    }
                    onClick={() => {
                      setCareConnection(connection);
                      openChatRoomUsingRouter(
                        router,
                        connection,
                        conversationLink.href,
                        isPersonalProfile
                      ).catch(err => {
                        console.log("Error: ", err);
                      });
                    }}
                  />
                  {connection.transitions.map(transition => {
                    if (
                      transition.route ===
                      "midwife_care_connection.recipient_read"
                    )
                      return null;
                    return (
                      <OverflowMenuItem
                        itemText={transition.label}
                        onClick={() => {
                          setCareConnection(connection);
                          setTransition(transition);
                          setIsTransitionModalOpen(true);
                        }}
                      />
                    );
                  })}
                </OverflowMenu>
              </div>
            )}
            renderDetails={() => (
              <>
                <div className="hedi--cares-view__render-details">
                  {hasMatchedCareTypes && (
                    <p>
                      <span>{careTypesLabel.text}: </span>
                      {matchedCareTypes.map((careType, index) => (
                        <span>
                          {index > 0 ? ", " : ""}
                          {careType.label}
                        </span>
                      ))}
                    </p>
                  )}
                  {(hasMatchedLanguages || hasMatchedServices) && (
                    <p className="hedi--cares-view__languages-services">
                      {hasMatchedLanguages && (
                        <>
                          <span>{languageLabel.text}: </span>
                          {matchedLanguages.map((language, index) => (
                            <span>
                              {index > 0 ? ", " : ""}
                              {language.label}
                            </span>
                          ))}
                        </>
                      )}
                      {hasMatchedLanguages && hasMatchedServices
                        ? "   |   "
                        : ""}
                      {hasMatchedServices && (
                        <>
                          <span>{servicesLabel.text}: </span>
                          {matchedServices.map((service, index) => (
                            <span>
                              {index > 0 ? ", " : ""}
                              {service.label}
                            </span>
                          ))}
                        </>
                      )}
                    </p>
                  )}
                </div>
              </>
            )}
          />
        );
      })}
      {careConnection && transition && (
        <TransitionModal
          {...{
            content,
            handleSubmit,
            owner: isPersonalProfile
              ? careConnection.recipient
              : careConnection?.sender.ownerProfile,
            currentState: careConnection.state.route,
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

export function isCancelledOrCompleted(stateRoute: string): boolean {
  return stateRoute.includes("completed") || stateRoute.includes("cancelled");
}
