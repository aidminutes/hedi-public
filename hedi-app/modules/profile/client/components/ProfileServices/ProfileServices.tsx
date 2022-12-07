import React from "react";
import { Column, Loading, Row } from "carbon-components-react";
import { ISelectComponent, Label } from "@/modules/components";
import { IPage } from "@/modules/common/types";
import { ListAccordion } from "@/modules/common/client/components";
import { useProfileServices } from "./useProfileServices";
import { UserTile } from "../UserTile";
import { getProfileServicesViewDefinition } from "./getProfileServicesViewDefinition";
import { IMidwife } from "@/modules/profile/types";
import { LanguageSkill } from "../LanguageSkills";
import { ProfileServicesEditModal } from "./ProfileServicesEditModal";
import { ProfileLanguagesEditModal } from "./ProfileLanguagesEditModal";

export const ProfileServices = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components">;
}) => {
  const {
    onServicesEdit,
    onLanguagesEdit,
    profile,
    hasServices,
    hasCareTypes,
    isServicesEditOpen,
    isLanguagesEditOpen,
    isReloading,
    isProfileLoading,
    servicesEditSuccessHandler,
    languagesEditSuccessHandler,
    servicesEditCloseHandler,
    languagesEditCloseHandler,
  } = useProfileServices(content.lang);

  const {
    allServices,
    servicesEmptyStateLabel,
    servicesTitleLabel,
    servicesDescriptionLabel,
    servicesTileTitleLabel,
    servicesCareTypesTitleLabel,
    servicesLabel,
    serviceGroupEmptyStateLabel,
    languagesDefinition,
  } = getProfileServicesViewDefinition(content.components);

  if (profile) profile.services.sort((a, b) => a.label.localeCompare(b.label));

  const careTypesOrder = [
    "/profilecaretype/prenatalcare",
    "/profilecaretype/deliverycare",
    "/profilecaretype/postpartumcare",
  ];
  if (profile) {
    (profile as IMidwife).careTypes.sort(
      (a, b) =>
        careTypesOrder.indexOf(a.route) - careTypesOrder.indexOf(b.route)
    );
  }

  return (
    <>
      <Row className="hedi--profile__info-area">
        <Column>
          <Label {...servicesTitleLabel} />
          <Label {...servicesDescriptionLabel} />
        </Column>
      </Row>
      {isReloading || isProfileLoading ? (
        <Loading />
      ) : (
        <Row>
          <UserTile
            isEmpty={!hasServices && !hasCareTypes}
            emptyStateText={servicesEmptyStateLabel.text || ""}
            kind="Services"
            contentHeadline={servicesTileTitleLabel.text || ""}
            columns={2}
            onEditClick={onServicesEdit}>
            {hasCareTypes ? (
              <div className="hedi--profile__services__care-types-info">
                <Label {...servicesCareTypesTitleLabel} />
                <div>
                  <Label
                    labelKind="p"
                    text={(profile as IMidwife).careTypes
                      .map(careType => careType.label)
                      .join(" | ")}
                  />
                </div>
              </div>
            ) : null}
            {hasServices ? (
              <div>
                <Label {...servicesLabel} />
                {allServices.components.map(group => (
                  <ListAccordion
                    emptyStateText={serviceGroupEmptyStateLabel.text || ""}
                    title={(group as ISelectComponent).labelText || ""}
                    elements={profile.services
                      .filter(
                        serviceItem =>
                          (group as ISelectComponent).items.findIndex(
                            item => item.route === serviceItem.route
                          ) !== -1
                      )
                      .map(item => item.label)}
                  />
                ))}
              </div>
            ) : null}
          </UserTile>
          <UserTile
            isEmpty={!profile?.languageLevels?.length}
            emptyStateText={
              languagesDefinition.languagesEmptyStateLabel.text || ""
            }
            kind="Languages"
            contentHeadline={languagesDefinition.languagesTileLabel.text || ""}
            onEditClick={onLanguagesEdit}>
            <table className="hedi--profile__services__language-skills">
              <tbody>
                {profile?.languageLevels?.map((level, index) => (
                  <LanguageSkill
                    key={index + level.language.route}
                    languageLevel={level}
                    mode="vertical"
                  />
                ))}
              </tbody>
            </table>
          </UserTile>
        </Row>
      )}
      <ProfileServicesEditModal
        {...{
          content,
          profile,
          isServicesEditOpen,
          onClose: servicesEditCloseHandler,
          onSaveSuccess: servicesEditSuccessHandler,
        }}
      />
      <ProfileLanguagesEditModal
        {...{
          content,
          profile,
          isLanguagesEditOpen,
          onClose: languagesEditCloseHandler,
          onSaveSuccess: languagesEditSuccessHandler,
        }}
      />
    </>
  );
};
