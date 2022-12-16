import React from "react";
import Link from "next/link";
import { ClickableTile } from "carbon-components-react";
import { ArrowRight24 } from "@carbon/icons-react";
import { ProfileEntry } from "@/modules/profile/client/components/ProfileEntry";
import { IProfileEntryProps } from "@/modules/profile/types";

export const ProfileEntryLink: React.FC<IProfileEntryProps> = props => {
  const route = props.route;
  // TODO Switch Organisation and professional
  const profileType = "hedi--profile-list__item";
  return (
    <Link href={route ?? "#"} passHref>
      <ClickableTile href={route} className={profileType ?? ""}>
        <ProfileEntry {...props} />
        <ArrowRight24 />
      </ClickableTile>
    </Link>
  );
};
