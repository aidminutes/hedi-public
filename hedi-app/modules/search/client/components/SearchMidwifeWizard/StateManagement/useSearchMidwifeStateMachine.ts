import { useState } from "react";
import { useMidwifeStateTransitions } from "./useMidwifeStateTransitions";
import {
  SearchMidwifeStates,
  SearchMidwifeStates as states,
} from "./SearchMidwifeStates";
import { useRouter } from "next/router";
import { useUser } from "@/modules/auth/client/hooks";
import {
  requestMyPregnancy,
  requestMyProfile,
} from "@/modules/profile/client/request";
import { GlobalWizardStates, IWizardData } from "@/modules/common/types";
import { useSystemContext } from "@/modules/shell/client/contexts/SystemContext/SystemContext";
import { IUserInfo } from "@/modules/auth/types";

export const useSearchMidwifeStateMachine = () => {
  const systemContext = useSystemContext();
  const contextWizardState = systemContext.sysData?.wizardState;

  const isValidState = (state: string): boolean => {
    let valid = Object.values(states).includes(state as SearchMidwifeStates);
    if (!valid) {
      valid = Object.values(GlobalWizardStates).includes(
        state as GlobalWizardStates
      );
    }
    return valid;
  };

  let initialState: string = states.SEARCH_ENTRY;
  if (!!contextWizardState) {
    initialState = contextWizardState;
  }

  if (!isValidState) {
    console.log(
      "ERROR: InvalidState: The state is not available in this wizard. state: ",
      initialState
    );
  }

  const [counter, setCounter] = useState(0);

  const [currentState, setCurrentState] = useState<string>(initialState);
  const contextWizardData = systemContext.sysData?.wizardData;

  const [wizardData, setWizardData] = useState<IWizardData<any>[]>(
    contextWizardData ?? []
  );

  const router = useRouter();
  const { defaultLocale } = router;
  const defaultLang = defaultLocale || "de";

  const [user] = useUser();
  const transitions = useMidwifeStateTransitions();
  const getWizardData = <T = string>(key: string): T | null => {
    const data = wizardData.filter((data: IWizardData<T>) => key == data.key);
    if (data.length > 0) {
      return data[0].value;
    }
    return null;
  };

  const checkState = (destinations: string[] | undefined, desired: string) => {
    if (destinations?.includes(desired)) {
      return desired;
    } else {
      throw new Error(`Desired state: ${desired} is not available`);
    }
  };

  const transitionNext = (current: string, desired: string) => {
    const transition = transitions.find(
      transition => transition.src == current
    );
    return checkState(transition?.next, desired);
  };

  const transitionBack = (current: string, desired: string) => {
    const transition = transitions.find(
      transition => transition.src == current
    );
    return checkState(transition?.back, desired);
  };

  const getPossibleStatesNext = (current: string) => {
    const transition = transitions.find(
      transition => transition.src == current
    );
    return transition?.next;
  };
  const getPossibleStatesBack = (current: string) => {
    const transition = transitions.find(
      transition => transition.src == current
    );
    return transition?.back;
  };

  const upsertWizardData = (data?: IWizardData, updatePage?: boolean): void => {
    if (!!data) {
      let newData = wizardData.filter(
        (currentData: IWizardData) => currentData.key != data.key
      );
      newData.push(data);
      setWizardData(newData);
      if (updatePage) {
        setCounter(counter + 1);
      }
    }
  };

  //throws exception
  const next = (
    desired?: string,
    data?: IWizardData,
    thisUser?: IUserInfo | undefined
  ): void => {
    const currentUser = thisUser ?? user;
    const isMidwifeUser = currentUser?.role === "midwife";

    upsertWizardData(data);
    if (desired) {
      moveStateForward(desired);
    } else {
      const possibleStates = getPossibleStatesNext(currentState);
      if (possibleStates?.length == 0) {
        throw new Error(`No next step is available`);
      } else if (possibleStates?.length == 1) {
        moveStateForward(possibleStates[0]);
      } else {
        switch (currentState) {
          case GlobalWizardStates.LOGIN:
          case states.SEARCH_RESULT:
            if (currentUser == undefined) {
              moveStateForward(GlobalWizardStates.LOGIN);
            } else if (!isMidwifeUser) {
              isVisitCardComplete(defaultLang).then(result => {
                !result
                  ? moveStateForward(states.VISIT_CARD)
                  : isPragnancyDataComplete().then(result => {
                      !result
                        ? moveStateForward(states.PRAGNANCY_DATA)
                        : moveStateForward(states.REVIEW);
                    });
              });
            }

            break;
          case states.VISIT_CARD:
            isPragnancyDataComplete().then(result => {
              !result
                ? moveStateForward(states.PRAGNANCY_DATA)
                : moveStateForward(states.REVIEW);
            });
            break;
        }
      }
    }
  };

  //throws exception
  const back = (desired?: string, data?: IWizardData): void => {
    upsertWizardData(data);
    if (desired) {
      moveStateBackward(desired);
    } else {
      const possibleStates = getPossibleStatesBack(currentState);
      if (possibleStates?.length == 0) {
        throw new Error(`No back step is available`);
      } else if (possibleStates?.length == 1) {
        moveStateBackward(possibleStates[0]);
      } else {
        switch (currentState) {
          case states.REVIEW:
            moveStateBackward(states.PRAGNANCY_DATA);
            break;
        }
      }
    }
  };

  const moveStateForward = (desired: string) => {
    if (currentState != desired) {
      const newState = transitionNext(currentState, desired);
      if (newState) {
        setCurrentState(newState);
      }
    }
  };
  const moveStateBackward = (desired: string) => {
    const newState = transitionBack(currentState, desired);
    if (newState) {
      setCurrentState(newState);
    }
  };

  const isVisitCardComplete = async (defaultLang: string): Promise<boolean> => {
    return await requestMyProfile(defaultLang).then(profile => {
      const email = profile?.emails?.[0]?.email ?? null;
      const postalCode = profile?.addresses?.[0]?.postalCode ?? null;
      const givenName = profile?.givenName ?? null;
      const familyName = profile?.familyName ?? null;
      //Todo: The criteria for completeness should be adjusted
      const result = !!email && !!postalCode && !!givenName && !!familyName;
      return result;
    });
  };
  const isPragnancyDataComplete = async (): Promise<boolean> => {
    return await requestMyPregnancy().then(pregnancy => {
      //Todo: The criteria for completeness should be adjusted
      return !!pregnancy?.expectedDeliveryDate ? true : false;
    });
  };

  return {
    currentState,
    counter,
    next,
    back,
    wizardData,
    getWizardData,
    upsertWizardData,
  };
};
