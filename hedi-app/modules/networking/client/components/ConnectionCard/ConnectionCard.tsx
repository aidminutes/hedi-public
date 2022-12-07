import React from "react";
import { IStateful } from "@/modules/model";
import { TransitionButtons } from "@/modules/common/client/components/TransitionButtons";
import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { selectPrimaryData } from "@/modules/profile/utils";
import {
  IMidwifeCareConnection,
  IOrganisationConnection,
  IConnectionProfile,
} from "../../../types";

export interface ConnectionCardProps {
  profile: IConnectionProfile;
  profileType: ProfileCardType;
  connection: IOrganisationConnection | IMidwifeCareConnection;
  onTransitionDone: (entityAfterTransition: IStateful) => any;
  renderButton?: () => JSX.Element;
  hasGrayBackground?: boolean;
  showImage?: boolean;
  href?: string;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  hasGrayBackground,
  showImage = true,
  profile,
  profileType,
  onTransitionDone,
  connection,
  href,
}) => {
  return (
    <ProfileCard
      title={profile.label}
      address={selectPrimaryData(profile.addresses)!}
      profession={profile.profession}
      profileType={profileType}
      href={href ?? profile.route}
      renderInteractionArea={() => (
        <TransitionButtons
          statefulEntity={connection}
          onTransitionDone={onTransitionDone}
        />
      )}
      renderTag={() => (
        <span>
          Status: <strong>{connection.state.label}</strong>
        </span>
      )}
      showImage={showImage}
      hasGrayBackground={hasGrayBackground}
    />
  );
};
