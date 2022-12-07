import { GlobalWizardStates } from "@/modules/common/types";
import { SearchMidwifeStates as states } from "./SearchMidwifeStates";

export interface ITransition {
  src: string;
  next: string[];
  back: string[];
}

export const useMidwifeStateTransitions = (): ITransition[] => {
  return [
    { src: states.SEARCH_ENTRY, next: [states.SEARCH_RESULT], back: [] },
    {
      src: states.SEARCH_RESULT,
      next: [
        GlobalWizardStates.LOGIN,
        states.VISIT_CARD,
        states.PRAGNANCY_DATA,
        states.REVIEW,
      ],
      back: [],
    },
    {
      src: GlobalWizardStates.LOGIN,
      next: [
        GlobalWizardStates.REGISTER,
        GlobalWizardStates.FORGOT_PASSWORD,
        states.VISIT_CARD,
        states.PRAGNANCY_DATA,
        states.REVIEW,
      ],
      back: [],
    },
    {
      src: GlobalWizardStates.REGISTER,
      next: [GlobalWizardStates.LOGIN],
      back: [GlobalWizardStates.LOGIN],
    }, // finish
    {
      src: GlobalWizardStates.REGISTER_ACTIVATE,
      next: [GlobalWizardStates.LOGIN],
      back: [],
    },

    {
      src: GlobalWizardStates.FORGOT_PASSWORD,
      next: [],
      back: [GlobalWizardStates.REGISTER],
    }, // finish
    {
      src: GlobalWizardStates.FORGOT_PASSWORD_ACTIVATE,
      next: [GlobalWizardStates.LOGIN],
      back: [],
    },
    {
      src: states.VISIT_CARD,
      next: [states.PRAGNANCY_DATA, states.REVIEW],
      back: [],
    },
    {
      src: states.PRAGNANCY_DATA,
      next: [states.REVIEW],
      back: [states.VISIT_CARD],
    },
    {
      src: states.REVIEW,
      next: [states.FINISH],
      back: [states.VISIT_CARD, states.PRAGNANCY_DATA, states.SEARCH_RESULT],
    },
    { src: states.FINISH, next: [], back: [] },
  ];
};
