import { Column, Loading, Row } from "carbon-components-react";
import { IStateful } from "@/modules/model";
import { IPage } from "@/modules/common/types";
import { Label } from "@/modules/components";
import { getProfileEditOwnedOrganisationViewDefinition } from "../ProfileEditOwnedOrganisation/getProfileEditOwnedOrganisationViewDefinition";
import {
  MyOrganisationConnectionsList,
  MyOrganisationConnectionsListPerspective,
  MyOrganisationConnectionsListType,
} from "../MyOrganisationConnectionsList";
import { useMyOrganisationConnections } from "../../hooks/useMyOrganisationConnections";
import { IOrganisationConnection } from "../../../types";

export type IProfileEditOwnedOrganisationView = IPage & {};

export const ProfileEditOwnedOrganisationView = ({
  content,
}: {
  content: IProfileEditOwnedOrganisationView;
}) => {
  const {
    pendingRequestsHeadline,
    activeConnectionsHeadline,
  } = getProfileEditOwnedOrganisationViewDefinition(content.components);

  const {
    activeOrganisationConnections,
    pendingOrganisationConnections,
    isLoading,
    mutate,
  } = useMyOrganisationConnections(content.lang);

  const listColumnWidthProps = { lg: 12, md: 8, sm: 4 };

  return (
    <div className="hedi--profileEditOwnedOrganisation">
      <Row>
        <Column>
          <Label {...pendingRequestsHeadline} />
        </Column>
      </Row>
      <Row>
        <Column {...listColumnWidthProps}>
          <MyOrganisationConnectionsList
            listType={MyOrganisationConnectionsListType.PENDING}
            fromPerspective={MyOrganisationConnectionsListPerspective.RECIPIENT}
            onTransitionDone={async (entityAfterTransition: IStateful) => {
              await mutate(async connections => {
                if (!connections) return [];
                return connections.map(c =>
                  c.route === entityAfterTransition.route
                    ? (entityAfterTransition as IOrganisationConnection)
                    : c
                );
              });
            }}
            organisationConnections={pendingOrganisationConnections}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Label {...activeConnectionsHeadline} />
        </Column>
      </Row>
      <Row>
        <Column {...listColumnWidthProps}>
          <MyOrganisationConnectionsList
            listType={MyOrganisationConnectionsListType.ACTIVE}
            fromPerspective={MyOrganisationConnectionsListPerspective.RECIPIENT}
            onTransitionDone={async (entityAfterTransition: IStateful) => {
              await mutate(async connections => {
                if (!connections) return [];
                return connections.map(c =>
                  c.route === entityAfterTransition.route
                    ? (entityAfterTransition as IOrganisationConnection)
                    : c
                );
              });
            }}
            organisationConnections={activeOrganisationConnections}
          />
        </Column>
      </Row>
      {isLoading && <Loading />}
    </div>
  );
};
