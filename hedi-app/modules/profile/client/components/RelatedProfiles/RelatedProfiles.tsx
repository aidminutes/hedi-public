import React from "react";
import { Column, Grid, Row } from "carbon-components-react";
import { ITag } from "@/modules/model";
import { Image } from "@/modules/components";
import { IProfileCardDefinition } from "../ProfileCard";
import { RelatedProfile } from "./RelatedProfile";
import { IZipCodeDefinition, ZipCode } from "./ZipCode";
import { IBusinessProfile, IProfileEntryDefinition } from "../../../types";
import { useZipCode } from "../../hooks";
import { filterRelatedProfiles } from "./filterRelatedProfiles";
import { transformProfileToEntry } from "../../../utils";

export type IRelatedProfilesProps = IRelatedProfiles &
  IRelatedProfilesDefinition;

export interface IRelatedProfiles {
  profiles: IBusinessProfile[];
  articleTags?: ITag[];
}

export interface IRelatedProfilesDefinition {
  relatedProfilesHeadline: string;
  profileEntryDefinition: IProfileEntryDefinition;
  zipCodeDefinition: IZipCodeDefinition;
}

export const RelatedProfiles: React.FC<
  IRelatedProfilesProps & IProfileCardDefinition
> = props => {
  const {
    relatedProfilesHeadline,
    profiles,
    profileEntryDefinition,
    shortDistanceText,
    distanceTemplate,
    articleTags,
    zipCodeDefinition,
  } = props;

  const {
    isNotValid,
    userLocation,
    zipCode,
    handleZipCodeSubmit,
    handleZipCodeChange,
  } = useZipCode();
  const filteredProfiles = filterRelatedProfiles(
    userLocation,
    profiles,
    articleTags ?? []
  );

  return (
    <div className="hedi--related-profiles">
      <section className="hedi--related-profiles__zip-code">
        {zipCodeDefinition.zipCodeBackground ? (
          <div className="hedi--related-profiles__zip-code__background-container hedi--print__hide">
            <Image
              className="hedi--related-profiles__zip-code--background hedi--print__hide"
              {...zipCodeDefinition.zipCodeBackground}
            />
          </div>
        ) : null}
        <div className="hedi--related-profiles__zip-code--container">
          <ZipCode
            {...zipCodeDefinition}
            relatedProfilesHeadline={relatedProfilesHeadline}
            handleZipCodeSubmit={handleZipCodeSubmit}
            isInvalid={isNotValid}
            userLocation={userLocation}
            value={zipCode || ""}
            handleZipCodeChange={handleZipCodeChange}
          />
        </div>
      </section>
      <section className="hedi--related-profiles__list">
        {filteredProfiles?.length > 0 && (
          <Grid condensed>
            {filteredProfiles.map((profile, index) => (
              <Row key={profile.route}>
                <Column lg={3} md={1} sm={0} />
                <Column lg={10} md={6} sm={4}>
                  <RelatedProfile
                    distanceTemplate={distanceTemplate}
                    shortDistanceText={shortDistanceText}
                    {...transformProfileToEntry(profile)}
                    distance={profile.distance}
                    {...profileEntryDefinition}
                  />
                </Column>
                <Column lg={3} md={1} sm={0} />
              </Row>
            ))}
          </Grid>
        )}
      </section>
    </div>
  );
};
