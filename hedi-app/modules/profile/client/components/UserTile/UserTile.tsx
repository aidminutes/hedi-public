import React from "react";
import { Column } from "carbon-components-react";
import {
  Avatar,
  Midwife,
  House,
  SpeechBubblePerson,
  SpeechBubblePersonQuestion,
  Heart,
  Baby,
  Foetus,
  Pregnancy,
} from "@/modules/svg";
import { Edit16 } from "@carbon/icons-react";

export type UserTileKind =
  | "Contact"
  | "Availability"
  | "Languages"
  | "Services"
  | "Visibility"
  | "Capacity"
  | "Avatar"
  | "Fetus"
  | "Pregnancy";

export interface IUserTile {
  emptyStateText: string;
  kind: UserTileKind;
  isEmpty: boolean;
  onEditClick: Function;
  contentHeadline: string;
  columns?: 1 | 2 | "full" | "half";
  children?: React.ReactNode;
  hideEditButton?: boolean;
  hasBorder?: boolean;
}

export const UserTile = (props: IUserTile) => {
  const {
    columns,
    isEmpty,
    children,
    emptyStateText,
    kind,
    onEditClick,
    contentHeadline,
    hideEditButton,
    hasBorder,
  } = props;
  const realColumns = columns || 1;
  return (
    <Column
      md={realColumns === "full" ? 8 : realColumns === 2 ? 8 : 4}
      lg={
        realColumns === "full"
          ? 15
          : realColumns === 2
          ? 10
          : realColumns === "half"
          ? 8
          : 5
      }
      sm={4}>
      <section
        className={`hedi--user-tile${isEmpty ? " hedi--user-tile--empty" : ""}${
          hasBorder ? " hedi--user-tile--with-border" : ""
        }`}>
        <div className="hedi--user-tile__above-content">
          <h3 dangerouslySetInnerHTML={{ __html: contentHeadline }} />
        </div>
        {!hideEditButton ? (
          <button
            className="hedi--user-tile__edit-button"
            onClick={() => onEditClick()}>
            <Edit16 /> <span className="sr-only">Edit</span>
          </button>
        ) : null}
        {isEmpty ? (
          <div className="hedi--user-tile__empty-state">
            {getEmptyStateIcon(kind)}
            <p className="hedi--user-tile__empty-state-text">
              {emptyStateText}
            </p>
          </div>
        ) : children ? (
          children
        ) : null}
      </section>
    </Column>
  );
};

function getEmptyStateIcon(kind: UserTileKind): JSX.Element {
  let icon;
  switch (kind) {
    case "Contact":
      icon = <SpeechBubblePerson />;
      break;
    case "Availability":
      icon = <House />;
      break;
    case "Languages":
      icon = <SpeechBubblePersonQuestion />;
      break;
    case "Services":
      icon = <Midwife />;
      break;
    case "Visibility":
      icon = <Heart />;
      break;
    case "Capacity":
      icon = <Baby />;
      break;
    case "Avatar":
      icon = <Avatar />;
      break;
    case "Fetus":
      icon = <Foetus />;
      break;
    case "Pregnancy":
      icon = <Pregnancy />;
      break;
    default:
      icon = <House />;
  }
  return icon;
}
