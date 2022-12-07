import { IPage } from "@/modules/common/types";
import { getMidwifeCareConnectionsViewDefinition } from "./index";
import { useMyMidwifeCareConnections } from "@/modules/networking/client/hooks/useMyMidwifeCareConnections";
import {
  ProfileCardType,
  ProfileCard,
  ResultMatch,
} from "@/modules/profile/client/components/ProfileCard";
import {
  Body,
  Button,
  findLinkInstance,
  InlineNotification,
  Label,
} from "@/modules/components";
import { selectPrimaryData } from "@/modules/profile/utils";
import { EmptyStateTile } from "@/modules/common/client/components";
import {
  OverflowMenuVertical16,
  Settings16,
  Search16,
  ArrowUpRight16,
} from "@carbon/icons-react";
import { IAddress, IBusinessProfile, IService } from "@/modules/profile/types";
import { geoDistance, parseLatLong } from "@/modules/common/utils";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import { formatDateRelative } from "@/modules/messaging/client/utils/dateFormat/formatDateRelative";
import { TransitionModal } from "../TransitionModal";
import { useTransitionModal } from "../TransitionModal/useTransitionModal";
import { useEffect, useState } from "react";
import { parseMatches } from "@/modules/search/client/components/SearchMidwifeResults/parseMatches";
import { ICareType } from "@/modules/networking/types/ICareType";
import { ProfileCardDetailsGrid } from "@/modules/profile/client/components/ProfileCard/ProfileCardDetailsGrid";
import { StateTag } from "../StateTag";
import { IMidwifeCareConnection } from "@/modules/networking/types";
import { getMidwifeCareConnectionChatRoomId } from "../../request/getMidwifeCareConnectionChatRoomId";
import { ChatConfirmationModal } from "../ChatConfirmationModal/ChatConfirmationModal";
import { useRouter } from "next/router";
import {
  isCanceledOrWithdrawn,
  isChattingAllowed,
} from "@/modules/networking/utils/connections";

export type IMidwifeCareConnectionsView = IPage & {};

export const MidwifeCareConnectionsView = ({
  content,
  isArchive,
}: {
  content: IMidwifeCareConnectionsView;
  isArchive?: Boolean;
}) => {
  const {
    careRequestHeadline,
    careRequestIntroText,
    careRequestWelcomeNotification,
    emptyStateImage,
    emptyStateText,
    emptyStateSettingsText,
    emptyStateSettingsImage,
    emptyStateSettingsButton,
    estimatedDateText,
    formatDateRelativeDefinition,
    detailsLabel,
    careRequestHeadlinePersonal,
    careRequestIntroTextPersonal,
    careTypeSelect,
    midwifeSearchResultDefinition,
    distanceTemplate,
    emptyStatePersonalButton,
    emptyStatePersonalText,
    withdrawnConnectionHint,
    emptyStatePersonalActiveButton,
    emptyStatePersonalActiveText,
    openStateLabel,
    chatLabel,
    conversationLink,
    archiveBody,
    archiveHeadlineLabel,
    emptyStateArchiveText,
  } = getMidwifeCareConnectionsViewDefinition(content.components);
  const careRequestUrl = findLinkInstance(content.components, "careRequestLink")
    ?.href;
  const {
    pendingConnections: pendingPersonalConnections,
    pendingWithoutArchiveConnections,
    mutate,
    getsDirectCareRequests,
    isPersonalProfile,
    hasActiveAndNoPending,
    archiveConnections,
  } = useMyMidwifeCareConnections(content.lang);
  const { lang } = content;

  const pendingConnections = isPersonalProfile
    ? pendingPersonalConnections
    : isArchive
    ? archiveConnections
    : pendingWithoutArchiveConnections;

  pendingConnections.sort(
    (a, b) => new Date(b.changed).getTime() - new Date(a.changed).getTime()
  );

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
  const [notificationCounter, setNotificationCounter] = useState(0);
  useEffect(() => {
    if (stateChangeNotification) {
      setNotificationCounter(notificationCounter + 1);
    }
  }, [stateChangeNotification]);

  const [isChatRoomModalOpen, setIsChatRoomModalOpen] = useState(false);
  const [isChatStartConfirmed, setIsChatStartConfirmed] = useState(false);

  const openChatRoom = async (
    conn: IMidwifeCareConnection,
    showConfirmation: boolean
  ) => {
    if (
      showConfirmation &&
      !isPersonalProfile &&
      (conn.state.route.endsWith(".read") ||
        conn.state.route.endsWith("unread"))
    ) {
      setIsChatRoomModalOpen(true);
    } else {
      setIsChatStartConfirmed(false);
      let roomPromise = new Promise<string>(async (resolve, reject) => {
        if (isChattingAllowed(conn.state.route, isPersonalProfile)) {
          const res = await getMidwifeCareConnectionChatRoomId(conn.route);
          return resolve(res?.roomId ?? "");
        }
        return reject("");
      });
      roomPromise.then(roomId => {
        if (roomId) {
          //router.push(conversationLink.href + `/${roomId}`);
          router.push(conversationLink.href + `?r=${roomId}&c=${conn.route}`);
          //window.open(conversationLink.href + `/${roomId}`, "_blank");// es gibt Problem wenn popups blockiert sind besonderes unter
        }
      });
    }
  };

  const handleConfirmation = () => {
    setIsChatRoomModalOpen(false);
    setIsChatStartConfirmed(true);
  };

  useEffect(() => {
    if (isChatStartConfirmed && careConnection) {
      openChatRoom(careConnection, false);
    }
  }, [isChatStartConfirmed, careConnection]);

  const isDirectRequestActivated = getsDirectCareRequests;
  return (
    <div className="hedi--care-connection">
      {isPersonalProfile ? (
        <Label {...careRequestHeadlinePersonal} />
      ) : isArchive ? (
        <Label {...archiveHeadlineLabel} />
      ) : (
        <Label {...careRequestHeadline} />
      )}
      <div className="hedi--userpanel-layout__intro-text">
        {isPersonalProfile ? (
          <Body {...careRequestIntroTextPersonal} />
        ) : isArchive ? (
          <Body {...archiveBody} />
        ) : (
          <Body {...careRequestIntroText} />
        )}
      </div>
      {/* <InlineNotification
        {...careRequestWelcomeNotification}
        hideCloseButton={false}
      /> */}
      {!!stateChangeNotification && (
        <InlineNotification
          key={notificationCounter}
          {...stateChangeNotification}
          hideCloseButton={false}
        />
      )}
      {isPersonalProfile && hasActiveAndNoPending && (
        <EmptyStateTile
          text={emptyStatePersonalActiveText}
          img={emptyStateImage}
          renderInteractionArea={() => (
            <Button
              {...emptyStatePersonalActiveButton}
              renderIcon={ArrowUpRight16}
            />
          )}
        />
      )}
      {!isPersonalProfile &&
        isDirectRequestActivated &&
        pendingConnections.length === 0 &&
        isArchive && (
          <EmptyStateTile text={emptyStateArchiveText} img={emptyStateImage} />
        )}
      {!isPersonalProfile && !isDirectRequestActivated && !isArchive && (
        <EmptyStateTile
          text={emptyStateSettingsText}
          img={emptyStateSettingsImage}
          renderInteractionArea={() => (
            <Button {...emptyStateSettingsButton} renderIcon={Settings16} />
          )}
        />
      )}
      {!isPersonalProfile &&
        !isArchive &&
        isDirectRequestActivated &&
        pendingConnections.length === 0 && (
          <EmptyStateTile text={emptyStateText} img={emptyStateImage} />
        )}
      {isPersonalProfile &&
        pendingConnections.length === 0 &&
        !hasActiveAndNoPending && (
          <EmptyStateTile
            text={emptyStatePersonalText}
            img={emptyStateSettingsImage}
            renderInteractionArea={() => (
              <Button {...emptyStatePersonalButton} renderIcon={Search16} />
            )}
          />
        )}
      {(isPersonalProfile || isDirectRequestActivated) &&
        pendingConnections.map((connection, index) => {
          const {
            matchingCareTypes,
            matchingLanguages,
            matchingServices,
          } = parseMatches(
            (connection.recipient as unknown) as IBusinessProfile,
            connection.sender.careTypes,
            careTypeSelect.items as ICareType[],
            connection.sender.languages,
            connection.sender.services || ([] as IService[])
          );
          const detailsUrl = careRequestUrl + `?${connection.route}`;
          return (
            <>
              <ProfileCard
                distanceTemplate={distanceTemplate}
                key={index}
                className="hedi--profile-card--extended-interaction-area"
                state={
                  connection.state.route.includes("unread")
                    ? "new"
                    : isCanceledOrWithdrawn(connection.state.route)
                    ? "inactive"
                    : connection.state.route.includes("handshaking")
                    ? "accepted"
                    : "normal"
                }
                profileType={
                  isPersonalProfile
                    ? ProfileCardType.PROFESSIONAL
                    : ProfileCardType.PERSONAL
                }
                title={
                  isPersonalProfile
                    ? connection.recipient.label
                    : connection.sender.ownerProfile.label
                }
                href={detailsUrl}
                linkTarget="_self"
                address={
                  isPersonalProfile
                    ? selectPrimaryData(connection.recipient.addresses)
                    : selectPrimaryData(
                        connection.sender.ownerProfile.addresses
                      )
                }
                image={
                  isPersonalProfile
                    ? connection.recipient.image
                    : connection.sender.ownerProfile.image
                }
                distanceInKm={parseInt(
                  getGeoDistanceByAddresses(
                    connection.recipient.addresses,
                    connection.sender.ownerProfile.addresses
                  )
                )}
                estimatedDateText={
                  isPersonalProfile ? undefined : estimatedDateText.text
                }
                estimatedDate={
                  isPersonalProfile
                    ? undefined
                    : new Date(
                        connection.sender.pregnancy.expectedDeliveryDate
                      ).toLocaleDateString(lang)
                }
                renderInteractionArea={() => (
                  <div className="hedi--profile-card__state-container">
                    <StateTag state={connection.state}>
                      {isPersonalProfile &&
                      connection.state.route.includes("unread")
                        ? openStateLabel.text
                        : connection.state.label}
                    </StateTag>
                    <span className="hedi--profile-card__timestamp">
                      {formatDateRelative({
                        date: new Date(connection.changed),
                        locale: lang,
                        alwaysShowTime: true,
                        ...formatDateRelativeDefinition,
                      })}
                    </span>
                    <OverflowMenu renderIcon={OverflowMenuVertical16} flipped>
                      <OverflowMenuItem
                        itemText={detailsLabel.text || ""}
                        disabled={isCanceledOrWithdrawn(connection.state.route)}
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
                          openChatRoom(connection, true).catch(err => {
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
                renderDetails={() =>
                  isPersonalProfile ? (
                    isCanceledOrWithdrawn(connection.state.route) ? (
                      <Label
                        {...withdrawnConnectionHint}
                        className="hedi--care-connection__withdrawn-hint"
                      />
                    ) : (
                      <ProfileCardDetailsGrid smallFirstColumn>
                        <ResultMatch
                          {...{
                            matchingCareTypes,
                            matchingLanguages,
                            matchingServices,
                          }}
                          {...connection.recipient}
                          {...midwifeSearchResultDefinition}
                        />
                      </ProfileCardDetailsGrid>
                    )
                  ) : (
                    <div className="hedi--profile-card__free-text">
                      {!isCanceledOrWithdrawn(connection.state.route) &&
                        connection.sender.body}
                    </div>
                  )
                }
              />
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
              {careConnection && (
                <ChatConfirmationModal
                  {...{
                    content,
                    handleConfirmation,
                    owner: isPersonalProfile
                      ? careConnection.recipient
                      : careConnection?.sender.ownerProfile,
                    isModalOpen: isChatRoomModalOpen,
                    onCloseModal: () => setIsChatRoomModalOpen(false),
                  }}
                />
              )}
            </>
          );
        })}
    </div>
  );
};

export const getGeoDistanceByAddresses = (
  reciepientAddress: IAddress[],
  senderAddress: IAddress[]
) => {
  const distance =
    reciepientAddress &&
    reciepientAddress[0]?.latLong &&
    senderAddress &&
    senderAddress.length
      ? geoDistance(
          parseLatLong(
            reciepientAddress[0]?.latLong ||
              reciepientAddress[0]?.latLongApprox ||
              ""
          ),
          parseLatLong(
            senderAddress[0]?.latLong || senderAddress[0]?.latLongApprox || ""
          )
        )
      : "9999"; //when there is no profile adress give those the least benefit and show them at end

  return distance;
};
