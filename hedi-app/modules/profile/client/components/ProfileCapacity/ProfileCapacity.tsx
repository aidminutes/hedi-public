import React from "react";

import { Column, Row, Tooltip } from "carbon-components-react";
import { Label, ToastNotification, Body } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { useProfileCapacity } from "./useProfileCapacity";
import { UserTile } from "../UserTile";
import { getProfileCapacityViewDefinition } from "./getProfileCapacityViewDefinition";
import { ProfileCapacityEditModal } from "./ProfileCapacityEditModal";
import { FeatureFlag, FeatureFlags } from "@/modules/common/client/components";

export const ProfileCapacity = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}) => {
  const {
    capacityTitleLabel,
    capacityDescriptionLabel,
    capacityTileLabel,
    searchContactLabel,
    directContactLabel,
    networkRequestLabel,
    maxDistanceLabel,
    etsPerMonthLabel,
    activeLabel,
    inActiveLabel,
    contactSearchTooltipBody,
    directRequestTooltipBody,
    networkRequestTooltipBody,
    profileVisibilityTitle,
    profileVisibilitySubtitle,
  } = getProfileCapacityViewDefinition(content.components);

  const {
    onCapacityEdit,
    searchable,
    directCareRequest,
    anonymousRequest,
    radius,
    defaultCapacity,
    isCapacityEditOpen,
    onCapacityEditClose,
  } = useProfileCapacity(content.lang);

  return (
    <>
      <Row className="hedi--profile__info-area">
        <Column>
          <Label {...capacityTitleLabel} />
          <Label {...capacityDescriptionLabel} />
        </Column>
      </Row>
      <Row>
        <UserTile
          columns={2}
          isEmpty={false}
          emptyStateText={""}
          kind="Capacity"
          contentHeadline={capacityTileLabel.text || ""}
          onEditClick={onCapacityEdit}>
          <div className="hedi--profile-capacity__item">
            <div className="hedi--profile-capacity__item-label">
              <Label {...searchContactLabel} />
              <Tooltip align="center">
                <Body {...contactSearchTooltipBody} />
              </Tooltip>
            </div>
            {searchable.value ? (
              <Label
                {...activeLabel}
                className="hedi--profile-capacity__status hedi--profile-capacity__status--active"
              />
            ) : (
              <Label
                {...inActiveLabel}
                className="hedi--profile-capacity__status hedi--profile-capacity__status--inactive"
              />
            )}
          </div>

          <div className="hedi--profile-capacity__item">
            <div className="hedi--profile-capacity__item-label">
              <Label {...directContactLabel} />
              <Tooltip align="center">
                <Body {...directRequestTooltipBody} />
              </Tooltip>
            </div>

            {directCareRequest.value ? (
              <Label
                {...activeLabel}
                className="hedi--profile-capacity__status hedi--profile-capacity__status--active"
              />
            ) : (
              <Label
                {...inActiveLabel}
                className="hedi--profile-capacity__status hedi--profile-capacity__status--inactive"
              />
            )}
          </div>
          <FeatureFlag name={FeatureFlags.networkRequestsActive}>
            <div className="hedi--profile-capacity__item">
              <div className="hedi--profile-capacity__item-label">
                <Label {...networkRequestLabel} />
                <Tooltip align="center">
                  <Body {...networkRequestTooltipBody} />
                </Tooltip>
              </div>
              {anonymousRequest.value ? (
                <Label
                  {...activeLabel}
                  className="hedi--profile-capacity__status hedi--profile-capacity__status--active"
                />
              ) : (
                <Label
                  {...inActiveLabel}
                  className="hedi--profile-capacity__status hedi--profile-capacity__status--inactive"
                />
              )}
            </div>
          </FeatureFlag>

          <div className="hedi--profile-capacity__item">
            <Label
              {...maxDistanceLabel}
              className="hedi--profile-capacity__item-label"
            />

            <Label
              {...{
                text: radius.value ? "" + radius.value : "-",
                labelKind: "span",
              }}
            />
          </div>

          <div className="hedi--profile-capacity__item">
            <Label
              {...etsPerMonthLabel}
              className="hedi--profile-capacity__item-label"
            />

            <Label
              {...{
                text: defaultCapacity.value ? "" + defaultCapacity.value : "-",
                labelKind: "span",
              }}
            />
          </div>
        </UserTile>
        {!searchable.value &&
          !directCareRequest.value &&
          !anonymousRequest.value && (
            <Column sm={2} md={3} lg={6}>
              <ToastNotification
                notificationKind={"info"}
                title={profileVisibilityTitle.text || ""}
                subtitle={profileVisibilitySubtitle.text}
              />
            </Column>
          )}
      </Row>
      <ProfileCapacityEditModal
        {...{
          content,
          isCapacityEditOpen,
          onCapacityEditClose,
        }}
      />
    </>
  );
};
