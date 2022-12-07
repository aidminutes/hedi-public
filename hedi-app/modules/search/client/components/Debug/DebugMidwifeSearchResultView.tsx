import React from "react";
import { sumupDebugScores, useDebugMidwifeSearchScores } from ".";
import { ISearchMidwifeResultProps } from "@/modules/search/types";
import { ICareType } from "@/modules/networking/types/ICareType";
import { parseMatches } from "../SearchMidwifeResults/parseMatches";

export interface IDebugResultViewProps
  extends Omit<ISearchMidwifeResultProps, "isLoading"> {}

export const DebugMidwifeSearchResultView = (props: IDebugResultViewProps) => {
  const {
    profileResults,
    queryCareTypes,
    queryLanguages,
    careTypeSelect,
    queryServices,
    debug,
    ...definition
  } = props;
  const {} = definition;

  const { leader, worst, triggerRerender } = useDebugMidwifeSearchScores(
    profileResults
  );
  // TODO Buggy, when new best value is lower the best value before it does not show as leader
  return (
    <>
      <table className="hedi--debug-table" onChange={triggerRerender}>
        <thead>
          <tr>
            <th></th>
            <th className="hedi--debug-table--care-types" colSpan={2}>
              Caretypes
            </th>
            <th className="hedi--debug-table--availability" colSpan={3}>
              Availability
            </th>
            <th className="hedi--debug-table--distance" colSpan={2}>
              Distance
            </th>
            <th className="hedi--debug-table--languages" colSpan={2}>
              Language
            </th>
            <th className="hedi--debug-table--services" colSpan={2}>
              Services
            </th>
            <th></th>
          </tr>
          <tr className="hedi--debug-table__sub-headings">
            <th>Name</th>
            <th className="hedi--debug-table--care-types">matching</th>
            <th className="hedi--debug-table--care-types hedi--debug-info__score">
              score
            </th>
            <th className="hedi--debug-table--availability hedi--debug-info__score">
              pre
            </th>
            <th className="hedi--debug-table--availability hedi--debug-info__score">
              delivery
            </th>
            <th className="hedi--debug-table--availability hedi--debug-info__score">
              post
            </th>
            <th className="hedi--debug-table--distance">value</th>
            <th className="hedi--debug-table--distance hedi--debug-info__score">
              score
            </th>
            <th className="hedi--debug-table--languages">matching</th>
            <th className="hedi--debug-table--languages hedi--debug-info__score">
              score
            </th>
            <th className="hedi--debug-table--services">matching</th>
            <th className="hedi--debug-table--services hedi--debug-info__score">
              score
            </th>
            <th className="hedi--debug-info__score">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {profileResults
            .map(profile =>
              parseMatches(
                profile,
                queryCareTypes,
                careTypeSelect?.items as ICareType[],
                queryLanguages,
                queryServices
              )
            )
            .map(profile => {
              const totalScore = sumupDebugScores(profile.scoreDetails);

              return (
                <tr>
                  <td>{profile.label}</td>
                  <td className="hedi--debug-table--care-types">
                    {profile.matchedCareTypes &&
                      profile.matchingCareTypes.map(
                        (t, i) =>
                          `${t}${
                            i + 1 !== profile.matchingCareTypes.length
                              ? ", "
                              : ""
                          }`
                      )}
                  </td>
                  <td className="hedi--debug-table--care-types hedi--debug-info__score">
                    <span
                      className={
                        leader.find(item => item.key === "careTypes")?.score ===
                          profile.scoreDetails.careTypes.score &&
                        leader.find(item => item.key === "careTypes")?.score !==
                          0
                          ? "leader"
                          : worst.find(item => item.key === "careTypes")
                              ?.score === profile.scoreDetails.careTypes.score
                          ? "worst"
                          : ""
                      }>
                      {round(profile.scoreDetails.careTypes.score)}
                    </span>
                  </td>
                  <td className="hedi--debug-table--availability hedi--debug-info__score">
                    <span
                      className={
                        leader.find(
                          item => item.key === "prenatalCareAvailability"
                        )?.score ===
                          profile.scoreDetails.prenatalCareAvailability
                            ?.score &&
                        leader.find(
                          item => item.key === "prenatalCareAvailability"
                        )?.score !== 0
                          ? "leader"
                          : worst.find(
                              item => item.key === "prenatalCareAvailability"
                            )?.score ===
                            profile.scoreDetails.prenatalCareAvailability?.score
                          ? "worst"
                          : ""
                      }>
                      {round(
                        profile.scoreDetails.prenatalCareAvailability?.score
                      )}
                    </span>
                  </td>
                  <td className="hedi--debug-table--availability hedi--debug-info__score">
                    <span
                      className={
                        leader.find(
                          item => item.key === "deliveryCareAvailability"
                        )?.score ===
                          profile.scoreDetails.deliveryCareAvailability
                            ?.score &&
                        leader.find(
                          item => item.key === "deliveryCareAvailability"
                        )?.score !== 0
                          ? "leader"
                          : worst.find(
                              item => item.key === "deliveryCareAvailability"
                            )?.score ===
                            profile.scoreDetails.deliveryCareAvailability?.score
                          ? "worst"
                          : ""
                      }>
                      {round(
                        profile.scoreDetails.deliveryCareAvailability?.score
                      )}
                    </span>
                  </td>
                  <td className="hedi--debug-table--availability hedi--debug-info__score">
                    <span
                      className={
                        leader.find(
                          item => item.key === "postpartumCareAvailability"
                        )?.score ===
                          profile.scoreDetails.postpartumCareAvailability
                            ?.score &&
                        leader.find(
                          item => item.key === "postpartumCareAvailability"
                        )?.score !== 0
                          ? "leader"
                          : worst.find(
                              item => item.key === "postpartumCareAvailability"
                            )?.score ===
                            profile.scoreDetails.postpartumCareAvailability
                              ?.score
                          ? "worst"
                          : ""
                      }>
                      {round(
                        profile.scoreDetails.postpartumCareAvailability?.score
                      )}
                    </span>
                  </td>
                  <td className="hedi--debug-table--distance">
                    {profile?.geoDistance?.toLocaleString("de", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 1,
                    })}
                    km
                  </td>
                  <td className="hedi--debug-table--distance hedi--debug-info__score">
                    <span
                      className={
                        leader.find(item => item.key === "location")?.score ===
                          profile.scoreDetails.location.score &&
                        leader.find(item => item.key === "location")?.score !==
                          0
                          ? "leader"
                          : worst.find(item => item.key === "location")
                              ?.score === profile.scoreDetails.location.score
                          ? "worst"
                          : ""
                      }>
                      {round(profile.scoreDetails.location.score)}
                    </span>
                  </td>
                  <td className="hedi--debug-table--languages">
                    {profile.matchingLanguages &&
                      profile.matchingLanguages.map(
                        (t, i) =>
                          `${t.value}${
                            i + 1 !== profile.matchingLanguages.length
                              ? ", "
                              : ""
                          }`
                      )}
                  </td>
                  <td className="hedi--debug-table--languages hedi--debug-info__score">
                    <span
                      className={
                        leader.find(item => item.key === "languages")?.score ===
                          profile.scoreDetails.languages.score &&
                        leader.find(item => item.key === "languages")?.score !==
                          0
                          ? "leader"
                          : worst.find(item => item.key === "languages")
                              ?.score === profile.scoreDetails.languages.score
                          ? "worst"
                          : ""
                      }>
                      {round(profile.scoreDetails.languages.score)}
                    </span>
                  </td>
                  <td className="hedi--debug-table--services">
                    {profile.matchingServices &&
                      profile.matchingServices.map(
                        (t, i) =>
                          `${t.value}${
                            i + 1 !== profile.matchingServices.length
                              ? ", "
                              : ""
                          }`
                      )}
                  </td>
                  <td className="hedi--debug-table--services hedi--debug-info__score">
                    <span
                      className={
                        leader.find(item => item.key === "services")?.score ===
                          profile.scoreDetails.services.score &&
                        leader.find(item => item.key === "services")?.score !==
                          0
                          ? "leader"
                          : worst.find(item => item.key === "services")
                              ?.score === profile.scoreDetails.services.score
                          ? "worst"
                          : ""
                      }>
                      {round(profile.scoreDetails.services.score)}
                    </span>
                  </td>
                  <td className=" hedi--debug-info__score">{totalScore}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

function round(n: number) {
  return Math.ceil(n * 10) / 10;
}
