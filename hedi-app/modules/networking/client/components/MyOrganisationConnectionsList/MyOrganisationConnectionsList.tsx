import React from "react";
import { IStateful } from "@/modules/model";
import { ProfileCardType } from "@/modules/profile/client/components/ProfileCard";
import { ConnectionCard } from "../ConnectionCard";
import { IOrganisationConnection } from "../../../types";

export enum MyOrganisationConnectionsListType {
  ACTIVE = "active",
  PENDING = "pending",
}

export enum MyOrganisationConnectionsListPerspective {
  SENDER = "sender",
  RECIPIENT = "recipient",
}

export const MyOrganisationConnectionsList: React.FC<{
  listType: MyOrganisationConnectionsListType;
  fromPerspective: MyOrganisationConnectionsListPerspective;
  organisationConnections: IOrganisationConnection[];
  onTransitionDone: (entityAfterTransition: IStateful, index: number) => void;
}> = ({
  organisationConnections,
  listType,
  onTransitionDone,
  fromPerspective,
}) => {
  const isActiveListType =
    listType === MyOrganisationConnectionsListType.ACTIVE;
  const isFromSenderPerspective =
    fromPerspective === MyOrganisationConnectionsListPerspective.SENDER;

  return (
    <div>
      {organisationConnections.map((connection, i) => (
        <ConnectionCard
          key={connection.route}
          profile={
            isFromSenderPerspective ? connection.recipient : connection.sender
          }
          profileType={
            isFromSenderPerspective
              ? ProfileCardType.ORGANISATION
              : ProfileCardType.PROFESSIONAL
          }
          connection={connection}
          hasGrayBackground={!isActiveListType}
          onTransitionDone={data => onTransitionDone(data, i)}
        />
      ))}
    </div>
  );
};
