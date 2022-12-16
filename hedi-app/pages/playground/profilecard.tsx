import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { IAddress } from "@/modules/profile/types";
import { HediCard } from "@/modules/common/client/components";
import { HediPersonRound } from "@/modules/svg";
import { Button } from "@/modules/components";
import {
  Building16,
  Chat16,
  Commit16,
  Plane32,
  OverflowMenuVertical16,
} from "@carbon/icons-react";
import { OverflowMenu, OverflowMenuItem, Tag } from "carbon-components-react";
import { ProfileCardDetailsGrid } from "@/modules/profile/client/components/ProfileCard/ProfileCardDetailsGrid";

const dummyUser = {
  profession: {
    label: "Profession",
    route: "none",
    forProfileType: ["test"],
  },
  address: {
    city: "Hamburg",
    postalCode: "22054",
    dataKind: {
      label: "taxonomy",
      route: "/route",
      index: 3,
    },
    dataVisibility: {
      label: "taxonomy",
      route: "/route",
      index: 3,
    },
    detailsVisibility: {
      label: "taxonomy",
      route: "/route",
      index: 3,
    },
    latLong: "latLong",
  } as IAddress,
};

export default function ProfileCardPlayground() {
  return (
    <div style={{ backgroundColor: "#E7E7E7", padding: "16px" }}>
      <h3>HediCard</h3>
      <HediCard
        title="Titel"
        label="Label"
        subtitle="Subtitle"
        renderLabelIcon={() => <Building16 />}
      />
      <h3>HediCard w/ many details</h3>
      <HediCard
        title="User McUseface"
        label="Ein Label"
        subtitle="Hier könnte irgendetwas stehen..."
        image={<HediPersonRound />}
        renderLabelIcon={() => <Commit16 />}
        renderSubtitleIcon={() => <Chat16 />}
        renderInteractionArea={() => (
          <Button buttonKind="tertiary" labelText="Button zum Interagieren" />
        )}
        renderStatus={() => (
          <span>
            Platz für einen <strong>Status</strong>
          </span>
        )}
        renderDetailsArea={() => (
          <div>
            <h4>Details</h4>
            <p>Oh! Mehr Details! Das ist immer gut.</p>
            <p>
              Im Prinzip kann hier <strong>alles</strong> rein.
            </p>
            <span>Zum Beispiel ein Flugzeug: </span>
            <Plane32 />
          </div>
        )}
      />
      <h3>ProfileCard Schwangere</h3>
      <ProfileCard
        profileType={ProfileCardType.PERSONAL}
        title="Frau Schwangerheit"
        address={dummyUser.address}
      />
      <h3>ProfileCard Professional (list view)</h3>
      <ProfileCard
        profileType={ProfileCardType.PROFESSIONAL}
        title="Hebammen-Profi"
        href="/de/hebammen-profi"
        address={dummyUser.address}
        distanceInKm={33}
        profession={dummyUser.profession}
        estimatedDate={"30.12.1980"}
        estimatedDateText="ET"
        state="inactive"
        renderInteractionArea={() => (
          <div className="hedi--profile-card__state-container">
            <Tag type="gray">Neu</Tag>
            <span className="hedi--profile-card__timestamp">5 Minuten</span>
            <OverflowMenu renderIcon={OverflowMenuVertical16} flipped>
              <OverflowMenuItem itemText="Details" />
            </OverflowMenu>
          </div>
        )}
        renderDetails={() => (
          <div className="hedi--profile-card__free-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            voluptatem molestiae ullam fugit possimus distinctio, impedit porro,
            laboriosam, facilis nihil quaerat quas laborum? Consequatur,
            voluptatem temporibus reprehenderit in quasi minus! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Repudiandae reiciendis
            deserunt assumenda animi libero sed delectus, mollitia dicta eaque
            veniam consequatur quia? Illo necessitatibus ut ipsa tempora,
            veritatis impedit harum. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Accusamus voluptatem molestiae ullam fugit
            possimus distinctio, impedit porro, laboriosam, facilis nihil
            quaerat quas laborum? Consequatur, voluptatem temporibus
            reprehenderit in quasi minus! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repudiandae reiciendis deserunt assumenda animi
            libero sed delectus, mollitia dicta eaque veniam consequatur quia?
            Illo necessitatibus ut ipsa tempora, veritatis impedit harum.
          </div>
        )}
      />
      <h3>ProfileCard Organisation</h3>
      <ProfileCard
        profileType={ProfileCardType.ORGANISATION}
        title="Hebammen-Profi"
        address={dummyUser.address}
        profession={dummyUser.profession}
        showImage={false}
      />
    </div>
  );
}
