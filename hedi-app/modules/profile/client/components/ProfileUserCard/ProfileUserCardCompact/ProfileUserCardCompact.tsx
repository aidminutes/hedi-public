import React, { ReactNode } from "react";
import { Loading, Row } from "carbon-components-react";
import { IPage } from "@/modules/common/types";
import { transformProfileUserCard } from "./../transformProfileUserCard";
import { getProfileUserCardDefinition } from "./../getProfileUserCardDefinition";
import { Image } from "@/modules/components";
import { useProfileUserCardCompact } from "./useProfileUserCardCompact";
import { HediPersonRound } from "@/modules/svg/client/components/HediPersonRound";
import { IUserProfile } from "@/modules/profile/types/IUserProfile";

export const ProfileUserCardCompact = ({
  content,
  profile,
  children,
}: {
  content: Pick<IPage, "lang" | "components">;
  profile?: IUserProfile;
  children?: ReactNode;
}) => {
  const {
    name,
    city,
    street,
    email,
    website,
    phone,
  } = getProfileUserCardDefinition(content.components);
  const {
    myProfile,
    profileIsLoading,
    languageLevelGroups,
  } = useProfileUserCardCompact(content.lang, profile);

  const {
    compositeName,
    compositeCity,
    compositeStreet,
    compositeEmail,
    compositePhone,
    compositeWebsite,
    image,
    isPersonalProfile,
    isBusinessProfile,
  } = transformProfileUserCard(myProfile || null);

  return (
    <>
      {profileIsLoading ? (
        <Loading />
      ) : (
        <>
          <div className="small-avatar">
            {image ? (
              <Image {...image} className="round-image " />
            ) : (
              <HediPersonRound />
            )}
          </div>
          <div className="">
            <label className="bx--label inline-label">{name.text}</label>
            <span>{compositeName}</span>
          </div>
          <div className="">
            <label className="bx--label inline-label">{city.text}</label>
            <span>{compositeCity}</span>
          </div>
          <div className="mb-07">
            <label className="bx--label inline-label">{street.text}</label>
            <span>{compositeStreet}</span>
          </div>

          <div className="">
            <label className="bx--label inline-label">{email.text}</label>
            <span>{compositeEmail}</span>
          </div>
          {isBusinessProfile && (
            <div className="">
              <label className="bx--label inline-label">{website.text}</label>
              <span>{compositeWebsite}</span>
            </div>
          )}
          <div className="mb-07">
            <label className="bx--label inline-label">{phone.text}</label>
            <span>{compositePhone}</span>
          </div>
          <div className="mb-07">
            {languageLevelGroups.map(langGroup => (
              <>
                <div>
                  <label className="bx--label inline-label">
                    {langGroup.group}
                  </label>
                  <span>{langGroup.items.join(", ")}</span>
                </div>
              </>
            ))}
          </div>
          {children}
        </>
      )}
    </>
  );
};
