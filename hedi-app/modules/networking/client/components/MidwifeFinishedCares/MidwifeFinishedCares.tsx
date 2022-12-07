import { IPage } from "@/modules/common/types";
import { useMyMidwifeCareConnections } from "@/modules/networking/client/hooks/useMyMidwifeCareConnections";
import {
  ProfileCard,
  ProfileCardType,
} from "@/modules/profile/client/components/ProfileCard";
import { Button, Label } from "@/modules/components";
import { selectPrimaryData } from "@/modules/profile/utils/transformProfileToEntry";
import { StateTag } from "../StateTag";
import { formatDateRelative } from "@/modules/messaging/client/utils/dateFormat/formatDateRelative";
import { ArrowUpRight16 } from "@carbon/icons-react";
import { EmptyStateTile } from "@/modules/common/client/components";
import { getMidwifeFinishedCaresDefinition } from "./getMidwifeFInishedCaresDefinition";
import { reduceFinishedConnections } from "./reduceFinishedConnections";

export type IMidwifeFinishedCares = IPage & {};

export const MidwifeFinishedCares = ({
  content,
}: {
  content: IMidwifeFinishedCares;
}) => {
  const { finishedConnections } = useMyMidwifeCareConnections(content.lang);

  const {
    finishedCaresMidwifeHeadline,
    careTypesLabel,
    servicesLabel,
    languageLabel,
    estimatedDateText,
    formatDateRelativeDefinition,
    emptyStateFinishedCareButton,
    emptyStateFinishedCareText,
    emptyStateMidwifeImage,
  } = getMidwifeFinishedCaresDefinition(content.components);

  const { activeConnectionsMap, allYears } = reduceFinishedConnections(
    finishedConnections
  );

  return (
    <div className="hedi--finished-cares-view">
      <Label {...finishedCaresMidwifeHeadline} className="mb-09" />

      {finishedConnections.length === 0 && (
        <EmptyStateTile
          text={emptyStateFinishedCareText}
          img={emptyStateMidwifeImage}
          renderInteractionArea={() => (
            <Button
              {...emptyStateFinishedCareButton}
              renderIcon={ArrowUpRight16}
            />
          )}
        />
      )}
      {allYears.map(year => {
        activeConnectionsMap[year].sort((a, b) =>
          a.sender.pregnancy.expectedDeliveryDate >
          b.sender.pregnancy.expectedDeliveryDate
            ? 1
            : -1
        );
        return (
          <div className="hedi--cares-view__year">
            <p className="hedi--cares-view__month">{year}</p>
            {activeConnectionsMap[year].map(connection => {
              const { careTypes, services, languages } = connection.sender;
              const {
                careTypes: midwifeCareTypes,
                services: midwifeServices,
                languageLevels: midwifeLanguageLevels,
              } = connection.recipient;
              const matchedCareTypes = careTypes.filter(ct =>
                midwifeCareTypes?.some(mct => mct.route === ct.route)
              );
              const matchedServices = services.filter(s =>
                midwifeServices?.some(ms => ms.route === s.route)
              );
              const matchedLanguages = languages.filter(l =>
                midwifeLanguageLevels?.some(ll => ll.language.route === l.route)
              );
              const hasMatchedCareTypes = matchedCareTypes.length > 0;
              const hasMatchedServices = matchedServices.length > 0;
              const hasMatchedLanguages = matchedLanguages.length > 0;
              return (
                <ProfileCard
                  state="inactive"
                  className="hedi--profile-card--extended-interaction-area"
                  key={connection.route}
                  profileType={ProfileCardType.PERSONAL}
                  title={connection.sender.ownerProfile.label}
                  address={selectPrimaryData(
                    connection.sender.ownerProfile.addresses
                  )}
                  linkTarget="_self"
                  image={connection.sender.ownerProfile.image}
                  estimatedDate={new Date(
                    connection.sender.pregnancy.expectedDeliveryDate
                  ).toLocaleDateString(content.lang)}
                  estimatedDateText={estimatedDateText.text}
                  renderInteractionArea={() => (
                    <div className="hedi--profile-card__state-container">
                      <StateTag state={connection.state}>
                        {connection.state.label}
                      </StateTag>
                      <span className="hedi--profile-card__timestamp">
                        {formatDateRelative({
                          date: new Date(connection.changed),
                          locale: content.lang,
                          alwaysShowTime: true,
                          ...formatDateRelativeDefinition,
                        })}
                      </span>
                    </div>
                  )}
                  renderDetails={() => (
                    <>
                      <div className="hedi--cares-view__render-details">
                        {hasMatchedCareTypes && (
                          <p>
                            <span>{careTypesLabel.text}: </span>
                            {matchedCareTypes.map((careType, index) => (
                              <span>
                                {index > 0 ? ", " : ""}
                                {careType.label}
                              </span>
                            ))}
                          </p>
                        )}
                        {(hasMatchedLanguages || hasMatchedServices) && (
                          <p className="hedi--cares-view__languages-services">
                            {hasMatchedLanguages && (
                              <>
                                <span>{languageLabel.text}: </span>
                                {matchedLanguages.map((language, index) => (
                                  <span>
                                    {index > 0 ? ", " : ""}
                                    {language.label}
                                  </span>
                                ))}
                              </>
                            )}
                            {hasMatchedLanguages && hasMatchedServices
                              ? "   |   "
                              : ""}
                            {hasMatchedServices && (
                              <>
                                <span>{servicesLabel.text}: </span>
                                {matchedServices.map((service, index) => (
                                  <span>
                                    {index > 0 ? ", " : ""}
                                    {service.label}
                                  </span>
                                ))}
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
