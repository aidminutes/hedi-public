import { RankedScoredIProfile } from "@/modules/search/types";
import { useEffect, useState } from "react";

interface IMidwifeSearchScores {
  key: string;
  score: null | Number;
}
const initialValues: IMidwifeSearchScores[] = [
  {
    key: "careTypes",
    score: null,
  },

  {
    key: "deliveryCareAvailability",
    score: null,
  },
  {
    key: "languages",
    score: null,
  },
  {
    key: "location",
    score: null,
  },
  {
    key: "postpartumCareAvailability",
    score: null,
  },
  {
    key: "prenatalCareAvailability",
    score: null,
  },
  {
    key: "services",
    score: null,
  },
];

export type ScoreDetailsType =
  | "careTypes"
  | "dateRange"
  | "deliveryCareAvailability"
  | "languages"
  | "location"
  | "postpartumCareAvailability"
  | "prenatalCareAvailability"
  | "services"
  | "meta"
  | "name";

export function useDebugMidwifeSearchScores(profileResults: RankedScoredIProfile[]) {
  const [leader, setLeader] = useState(initialValues);
  const [worst, setWorst] = useState(initialValues);
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    resetValues();
    findLeaders(profileResults);
    findWorst(profileResults);
  }, [profileResults, render]);

  const resetValues = () => {
    console.log("resetValues");
    setLeader(initialValues);
    setWorst(initialValues);
  };

  const triggerRerender = () => {
    console.log("triggerRerender");
    setRender(!render);
  };
  const findLeaders = (profileResults: RankedScoredIProfile[]) => {
    let tempLeaders = leader;
    profileResults.forEach(profile => {
      const { scoreDetails } = profile;
      for (const [key, value] of Object.entries(scoreDetails)) {
        const leaderValue = tempLeaders.find(m => m.key === key);
        if (leaderValue !== undefined) {
          const hasHighgerValue =
            leaderValue.score === null
              ? true
              : value.score > leaderValue.score
              ? true
              : false;
          if (hasHighgerValue) {
            const newLeader = tempLeaders.filter(
              element => element.key !== key
            );
            newLeader.push({ key, score: value.score });
            tempLeaders = newLeader;
          }
        }
      }
    });
    setLeader(tempLeaders);
  };
  const findWorst = (profileResults: RankedScoredIProfile[]) => {
    let tempWorst = worst;
    profileResults.forEach(profile => {
      const { scoreDetails } = profile;
      for (const [key, value] of Object.entries(scoreDetails)) {
        const worstValue = tempWorst.find(m => m.key === key);
        if (worstValue !== undefined) {
          const hasLowerValue =
            worstValue.score === null
              ? true
              : value.score < worstValue.score
              ? true
              : false;
          if (hasLowerValue) {
            const newWorst = tempWorst.filter(element => element.key !== key);
            newWorst.push({ key, score: value.score });
            tempWorst = newWorst;
          }
        }
      }
    });
    setWorst(tempWorst);
  };

  return { leader, worst, triggerRerender };
}
