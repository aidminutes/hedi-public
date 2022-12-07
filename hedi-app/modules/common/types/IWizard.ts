import { IUserInfo } from "@/modules/auth/types";

export interface IWizardData<T = string> {
  key: string;
  value: T;
}

export interface IWizard {
  id: Wizards;
  next: <T = string>(
    desired?: string,
    data?: IWizardData<T>,
    thisUser?: IUserInfo | undefined
  ) => void;
  back: <T = string>(desired?: string, data?: IWizardData<T>) => void;
  getWizardData: <T = string>(key: string) => T | null;
  upsertWizardData: <T = string>(
    data?: IWizardData<T>,
    updatePage?: boolean
  ) => void;
}

export enum Wizards {
  searchMidwifeWizard = "searchMidwifeWizard", // Notice: This should be the wizard page id (in cms)
}
