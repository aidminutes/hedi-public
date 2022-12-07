import { IPage } from "@/modules/common/types";
import { getProfileEditOrganisationsViewDefinition } from "@/modules/networking/client/components/ProfileEditOrganisations/getProfileEditOrganisationsViewDefinition";
import { Column, InlineLoading, Loading, Row } from "carbon-components-react";
import { Label } from "@/modules/components";
import {
  MyOrganisationConnectionsList,
  MyOrganisationConnectionsListPerspective,
  MyOrganisationConnectionsListType,
} from "@/modules/networking/client/components/MyOrganisationConnectionsList";
import { FuzzyFilterDropdown } from "@/modules/common/client/components";
import { IProfileEntry } from "@/modules/profile/types";
import { insertMyOrganisationConnection } from "@/modules/networking/client/request/insertMyOrganisationConnection";
import { useMyOrganisationConnections } from "@/modules/networking/client/hooks/useMyOrganisationConnections";
import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { useMemo, useState } from "react";
import { IOrganisationConnection } from "@/modules/networking/types";

export type IProfileEditOrganisationsView = IPage & {
  myConnections: IOrganisationConnection[] | null;
  organisations: IProfileEntry[];
};

export const ProfileEditOrganisationsView = ({
  content,
}: {
  content: IProfileEditOrganisationsView;
}) => {
  const {
    editOrganisationHeadline,
    searchOrganisationsHeadline,
    pendingHeadline,
    membershipHeadline,
    searchPlaceholder,
  } = getProfileEditOrganisationsViewDefinition(content.components);

  const commonColumnWidthProps = { lg: 16, md: 8, sm: 4 };
  const listColumnWidthProps = { lg: 12, md: 8, sm: 4 };

  const {
    activeOrganisationConnections,
    pendingOrganisationConnections,
    isLoading,
    mutate,
  } = useMyOrganisationConnections(
    content.lang,
    content.myConnections ?? undefined
  );

  const organisationsWithoutConnection = useMemo(
    () =>
      content.organisations.filter(
        orga =>
          !activeOrganisationConnections
            .concat(pendingOrganisationConnections)
            .map(conn => conn.recipient.route)
            .includes(orga.route)
      ),
    [
      content.organisations,
      pendingOrganisationConnections,
      activeOrganisationConnections,
    ]
  );

  const [isInsertingConnection, setIsInsertingConnection] = useState(false);

  return (
    <div className="hedi--profile-edit-organisations">
      <Row>
        <Column {...commonColumnWidthProps}>
          <Label
            {...editOrganisationHeadline}
            className="hedi--profile-edit-organisations__headline"
          />
        </Column>
      </Row>
      <Row className="hedi--organisation-search-row">
        <Column {...commonColumnWidthProps}>
          <Label {...searchOrganisationsHeadline} />
        </Column>
      </Row>
      <Row className="hedi--organisation-search-row">
        <Column lg={{ span: 12, offset: 2 }} md={{ span: 6, offset: 1 }} sm={4}>
          <FuzzyFilterDropdown
            items={organisationsWithoutConnection}
            id="organisation-search"
            onChange={async org => {
              setIsInsertingConnection(true);
              const result = await insertMyOrganisationConnection(
                org.route,
                content.lang
              );
              // Hack to trigger revalidation, because "insert" endpoint does not return any data atm.
              await mutate(connections => connections);
              setIsInsertingConnection(false);
            }}
            placeholder={searchPlaceholder.labelText}
            itemToElement={item => {
              const profileEntry = item as IProfileEntry;
              return (
                <ProfileCard
                  profession={profileEntry.profession!}
                  title={profileEntry.label}
                  address={profileEntry.address!}
                  profileType={ProfileCardType.ORGANISATION}
                  showImage={false}
                  renderInteractionArea={() => <></>}
                />
              );
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column {...listColumnWidthProps}>
          <Label
            {...pendingHeadline}
            className="hedi--profile-edit-organisations__subheadline"
          />
        </Column>
      </Row>
      <Row>
        <Column {...listColumnWidthProps}>
          {isInsertingConnection ? <InlineLoading /> : null}
          <MyOrganisationConnectionsList
            listType={MyOrganisationConnectionsListType.PENDING}
            fromPerspective={MyOrganisationConnectionsListPerspective.SENDER}
            organisationConnections={pendingOrganisationConnections}
            onTransitionDone={async data => {
              await mutate(async connections => {
                if (!connections) return [];
                return connections.map(c =>
                  c.route === data.route ? (data as IOrganisationConnection) : c
                );
              });
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column {...listColumnWidthProps}>
          <Label
            {...membershipHeadline}
            className="hedi--profile-edit-organisations__subheadline underline"
          />
        </Column>
      </Row>
      <Row>
        <Column {...listColumnWidthProps}>
          <MyOrganisationConnectionsList
            listType={MyOrganisationConnectionsListType.ACTIVE}
            fromPerspective={MyOrganisationConnectionsListPerspective.SENDER}
            organisationConnections={activeOrganisationConnections}
            onTransitionDone={async data => {
              await mutate(async connections => {
                if (!connections) return [];
                return connections.map(c =>
                  c.route === data.route ? (data as IOrganisationConnection) : c
                );
              });
            }}
          />
        </Column>
      </Row>
      {isLoading && <Loading />}
    </div>
  );
};
