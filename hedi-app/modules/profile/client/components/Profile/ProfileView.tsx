// import { MapClient } from "@/modules/map/client/components";
// import { Location } from "@/modules/map/types";
import { Column, Grid, Row } from "carbon-components-react";
import {
  HeadlineSeperator,
  WhiteBox,
} from "@/modules/common/client/components";
import { IPage } from "@/modules/common/types";

import {
  IOrganisation,
  IProfileEntryDefinition,
  isProfessionalProfileType,
  UserProfile,
  OrganisationTypeNameString,
} from "@/modules/profile/types";
import {
  getProfileViewContent,
  getProfileViewDefinition,
  useShowProfileEditButton,
} from ".";

import { Contact, IContactDefinition } from "../Contact";
import {
  ConsultationHours,
  IConsultationHoursDefinition,
} from "../ConsultationHours";

// TODO
import { ILanguageSkillsDefinition, LanguageSkills } from "../LanguageSkills";

import { Edit24 } from "@carbon/icons-react";
import { IButtonComponent, IGroupComponent } from "@/modules/components/types";
import { Button, ILabelComponent } from "@/modules/components";
import { useProfileView } from "./useProfileView";
import {
  IProfileCardDefinition,
  ProfileCard,
} from "@/modules/profile/client/components/ProfileCard";
import { IServicesDefinition, Services } from "../Services";

import { ProfileHeaderImage } from "../ProfileHeaderImage";
import { ProfileContactImage } from "@/modules/svg";
import { Send20, Location24 } from "@carbon/icons-react";
import { getProfileCardType } from "./getProfileCardType";
import {
  getBusinessProfileType,
  isBusinessProfileType,
} from "./profileTypesHelper";

export type IProfileView = (UserProfile | IOrganisation) &
  Pick<IPage, "components">;

export interface IProfileViewDefinition {
  profileEntryDefinition: IProfileEntryDefinition;
  profileEditButton: IButtonComponent;
  contactDefinition: IContactDefinition;
  cosultantHoursDefinition: IConsultationHoursDefinition;
  languageSkillsDefinition: ILanguageSkillsDefinition;
  profileCardDefinition: IProfileCardDefinition;
  servicesDefinition: IServicesDefinition;
  backgroundImageDefinition: IGroupComponent;
  emailText: ILabelComponent;
  emailAddress: ILabelComponent;
}

export const ProfileView = ({ content }: { content: IProfileView }) => {
  const { data } = useProfileView(content, content.route);

  const {
    profileEntry,
    contacts,
    consultationHours,
    languageSkills,
    servicesData,
  } = getProfileViewContent(data ?? content);

  const {
    profileEntryDefinition,
    profileEditButton,
    contactDefinition,
    cosultantHoursDefinition,
    languageSkillsDefinition,
    profileCardDefinition,
    servicesDefinition,
    backgroundImageDefinition,
    emailAddress,
    emailText,
  } = getProfileViewDefinition(content.components);

  const showProfileEditButton = useShowProfileEditButton(content);
  return (
    <>
      <Grid className="hedi--profile">
        <ProfileHeaderImage
          profileType={getProfileCardType(profileEntry.type)}
          images={backgroundImageDefinition}
        />
        <Row>
          <Column>
            <ProfileCard
              className="hedi--profile-card__profile-page"
              image={profileEntry.image}
              title={profileEntry.label}
              profileType={getProfileCardType(profileEntry.type)}
              profession={profileEntry.profession}
              // renderInteractionArea={() => {
              //   if (!showProfileEditButton || !profileEditButton) {
              //     return null;
              //   }
              //   return (
              //     <Button
              //       renderIcon={Edit24}
              //       size="sm"
              //       {...profileEditButton}
              //     />
              //   );
              // }}
              showImage={profileEntry.type !== "Organisation"}
              {...profileCardDefinition}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={8} md={4}>
            <WhiteBox>
              <div className="hedi--profile__headline--wrap">
                <span className="mobile-only hedi--profile__headline--icon">
                  <Location24 />
                </span>
                <h3>{profileEntryDefinition.contactTitle}</h3>
              </div>
              <HeadlineSeperator />
              {contacts.map(contact => (
                <Contact
                  hideStreetAndNumber
                  {...contact}
                  {...contactDefinition}
                  key={contact.dataKind.label}
                />
              ))}
            </WhiteBox>

            {consultationHours && consultationHours.length > 0 && (
              <WhiteBox>
                <ConsultationHours
                  headline={cosultantHoursDefinition.headline}
                  consultationHours={consultationHours}
                />
              </WhiteBox>
            )}
            {languageSkills && languageSkills.length > 0 && (
              <WhiteBox>
                <LanguageSkills
                  headline={languageSkillsDefinition.headline}
                  languageSkills={languageSkills}
                  profileType={getProfileCardType(profileEntry.type)}
                />
              </WhiteBox>
            )}
            <div className="hedi--profile__change-entry-link desktop-only">
              <Send20 />{" "}
              <a
                href={`mailto:${emailAddress.text}?subject=Änderung meiner Profildaten`}>
                {emailText.text}
              </a>
            </div>
          </Column>

          {profileEntry.type === OrganisationTypeNameString ||
          (isProfessionalProfileType(profileEntry.type) &&
            servicesData.length > 0) ? (
            <Column lg={8} md={4}>
              <WhiteBox>
                <Services
                  definition={servicesDefinition}
                  services={servicesData ?? []}
                  type={profileEntry.type}
                />
                <div className="hedi--profile__services__image-wrap">
                  {/* TODO type pregnant woman */}
                  <ProfileContactImage
                    type={getBusinessProfileType(profileEntry.type)}
                  />
                </div>
              </WhiteBox>
            </Column>
          ) : null}
        </Row>
        <Row>
          <Column>
            {/* {hasServices && (
            <Column lg={6} md={4}>
              <ServiceGroup
                headline={servicesHeadline}
                {...servicesData}
                headlineType="h3"
              />
            </Column>
          )} */}
          </Column>
        </Row>
      </Grid>
      {/* {hasMap)
          ? content.organisations.map((entry: IProfile) => {
              return <ProfileEntry profile={entry} key={entry.route} />;
            })
          : content.members.map((entry: IProfile) => {
              return <ProfileEntry profile={entry} key={entry.route} />;
            })}
        {
          //TODO to verify the state availablility of array
          locations.push({
            lat: content.lat,
            long: content.long,
            displayName: content.displayName,
          } as Location)
        } */}
      {/* <MapClient {...mapData} /> */}
    </>
  );
};
