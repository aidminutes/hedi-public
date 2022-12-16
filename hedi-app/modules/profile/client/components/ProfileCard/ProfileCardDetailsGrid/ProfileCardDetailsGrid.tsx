import React from "react";
import cx from "classnames";

export interface ProfileCardDetailsGridProps {
  smallFirstColumn?: boolean;
}

export const ProfileCardDetailsGrid: React.FC<ProfileCardDetailsGridProps> = props => {
  return (
    <div
      className={cx("hedi--profile-card-details-grid", {
        "hedi--profile-card-details-grid--small-first-column":
          props.smallFirstColumn,
      })}>
      {props.children}
    </div>
  );
};
