import { Organisation, PregnantPersonRound } from "@/modules/svg";
import React, { ReactNode } from "react";
import { IAddress, IProfession } from "@/modules/profile/types";
import { HediCard } from "@/modules/common/client/components";
import { Building16, Location16, User16 } from "@carbon/icons-react";
import { HediPersonRound } from "@/modules/svg/client/components/HediPersonRound/HediPersonRound";
import { IImage } from "@/modules/media/types";
import { Image } from "@/modules/components";
import { useRouter } from "next/router";
import cx from "classnames";
import { IProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard/types";
import { getDistanceString } from "@/modules/profile/client/components/ProfileCard/helper";

export enum ProfileCardType {
  ORGANISATION,
  PROFESSIONAL,
  PERSONAL,
}

export type ProfileCardState = "new" | "normal" | "inactive" | "accepted";

export interface ProfileCardProps {
  title: string;
  profession?: IProfession;
  className?: string;
  address?: IAddress;
  distanceInKm?: number;
  href?: string;
  linkTarget?: string;
  image?: IImage;
  profileType: ProfileCardType;
  estimatedDate?: string;
  renderInteractionArea?: () => ReactNode;
  renderDetails?: () => ReactNode;
  renderTag?: () => ReactNode;
  hasGrayBackground?: boolean;
  showImage?: boolean;
  isExpandable?: boolean;
  state?: ProfileCardState;
  pregnancyWeek?: string;
  pregnancyWeekText?: string;
}

function renderImage(profileType: ProfileCardType, image?: IImage) {
  if (image) {
    return (
      <div className="hedi--profile-card__image">
        <Image {...image} />
      </div>
    );
  }

  switch (profileType) {
    case ProfileCardType.ORGANISATION:
      return <Organisation />;
    case ProfileCardType.PROFESSIONAL:
      return <HediPersonRound />;
    case ProfileCardType.PERSONAL:
      return <PregnantPersonRound />;
    default:
      return <HediPersonRound />;
  }
}

function createLocationString(
  address?: IAddress,
  distanceInKm?: number,
  distanceTemplate?: string,
  shortDistanceText?: string,
  locale?: string
) {
  let location = "";
  if (address) {
    location += `${address.postalCode} ${address.city}`;
  }
  // 9999 corresponds to online or other profiles which do not have address

  if (
    typeof distanceInKm !== "undefined" &&
    !isNaN(distanceInKm) &&
    distanceInKm !== 9999
  ) {
    if (distanceInKm < 1) {
      distanceInKm = 1;
      distanceTemplate = shortDistanceText;
    }
    if (address) {
      location += " | ";
    }
    location += getDistanceString(distanceInKm, distanceTemplate, locale);
  }
  return location;
}

export const ProfileCard: React.FC<
  ProfileCardProps & IProfileCardDefinition
> = ({
  className,
  title,
  profession,
  address,
  distanceInKm,
  distanceTemplate,
  shortDistanceText,
  image,
  profileType,
  href,
  linkTarget,
  pregnancyWeek,
  pregnancyWeekText,
  renderInteractionArea,
  renderDetails,
  hasGrayBackground,
  renderTag,
  showImage = true,
  isExpandable = false,
  estimatedDate,
  estimatedDateText,
  state,
}) => {
  const { locale } = useRouter();
  return (
    <HediCard
      className={cx(
        "hedi--profile-card " +
          (hasGrayBackground ? "gray" : "") +
          (state && state === "new"
            ? "hedi--profile-card--new"
            : state === "inactive"
            ? "hedi--profile-card--inactive"
            : state === "accepted"
            ? "hedi--profile-card--accepted"
            : ""),
        className
      )}
      title={title}
      href={state && state === "inactive" ? "" : href}
      target={linkTarget || "_blank"}
      label={profession?.label}
      labelClassName={
        profileType === ProfileCardType.ORGANISATION
          ? "hedi--profile-card--green-label"
          : ""
      }
      image={showImage ? renderImage(profileType, image) : null}
      renderLabelIcon={() =>
        profileType === ProfileCardType.ORGANISATION ? (
          <Building16 />
        ) : (
          <User16 />
        )
      }
      subtitle={
        estimatedDate && pregnancyWeek
          ? createLocationString(
              address,
              distanceInKm,
              distanceTemplate,
              shortDistanceText,
              locale
            ) +
            (address || distanceInKm ? " | " : "") +
            `${estimatedDateText} ` +
            estimatedDate +
            " | " +
            `${pregnancyWeekText ?? "ssw"} ` +
            pregnancyWeek
          : estimatedDate
          ? createLocationString(
              address,
              distanceInKm,
              distanceTemplate,
              shortDistanceText,
              locale
            ) +
            (address || distanceInKm ? " | " : "") +
            `${estimatedDateText} ` +
            estimatedDate
          : createLocationString(
              address,
              distanceInKm,
              distanceTemplate,
              shortDistanceText,
              locale
            )
      }
      renderInteractionArea={renderInteractionArea}
      renderStatus={renderTag}
      renderDetailsArea={renderDetails}
      isExpandable={false}
    />
  );
};
