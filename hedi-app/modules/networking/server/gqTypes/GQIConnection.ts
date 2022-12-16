import {
  GQDate,
  gqPick,
  GQString,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import {
  GQIEntity,
  GQIMutationResponse,
  GQIStateful,
  GQIWithType,
} from "@/modules/model/server";
import {
  IConnection,
  IMidwifeCareConnection,
  IOrganisationConnection,
  ITransitionConnectionResponse,
  ITransitionMidwifeCareConnectionResponse,
  ITransitionOrganisationConnectionResponse,
  ICareConnectionRoomResponse,
} from "@/modules/networking/types";
import { GQMidwifeCareRequestEntry } from "@/modules/networking/server/gqTypes/GQMidwifeCareRequestEntry";
import { GQIConnectionProfile } from "@/modules/networking/server/gqTypes/GQIConnectionProfile";

export const GQIConnection: IConnection = {
  ...GQIStateful,
  sender: { ...gqPick(GQIEntity, ["route"]), ...GQIWithType },
  recipient: { ...gqPick(GQIEntity, ["route"]), ...GQIWithType },
  created: GQDate,
  changed: GQDate,
};

const gqOrganisationConnection: IOrganisationConnection = {
  ...GQIStateful,
  created: GQDate,
  changed: GQDate,
  sender: GQIConnectionProfile,
  recipient: GQIConnectionProfile,
};

export const GQOrganisationConnection = withInlineFragment(
  gqOrganisationConnection,
  "OrganisationConnection"
);

const gqMidwifeCareConnection: IMidwifeCareConnection = {
  ...GQIStateful,

  created: GQDate,
  changed: GQDate,

  sender: GQMidwifeCareRequestEntry,
  recipient: GQIConnectionProfile,
};

export const GQMidwifeCareConnection = withInlineFragment(
  gqMidwifeCareConnection,
  "MidwifeCareConnection"
);

export const GQConnection: IConnection = {
  ...GQIStateful,
  ...GQOrganisationConnection,
  ...GQMidwifeCareConnection,
};

export const GQMyConnections = {
  myConnections: GQConnection,
};

export const GQTransitionConnectionResponse = withInlineFragment<ITransitionConnectionResponse>(
  {
    ...GQIMutationResponse,
    data: GQConnection,
  },
  "TransitionConnectionResponse"
);

export const GQTransitionOrganisationConnectionResponse = withInlineFragment<ITransitionOrganisationConnectionResponse>(
  {
    ...GQIMutationResponse,
    data: GQOrganisationConnection,
  },
  "TransitionConnectionResponse"
);

export const GQTransitionMidwifeCareConnectionResponse = withInlineFragment<ITransitionMidwifeCareConnectionResponse>(
  {
    ...GQIMutationResponse,
    data: GQMidwifeCareConnection,
  },
  "TransitionConnectionResponse"
);
export const GQCareConnectionRoomResponse = withInlineFragment<ICareConnectionRoomResponse>(
  {
    ...GQIMutationResponse,
    roomId: GQString,
  },
  "CareConnectionRoomResponse"
);
