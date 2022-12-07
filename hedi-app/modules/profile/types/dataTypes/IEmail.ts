import { IDataKind, IDataVisibility } from "../taxonomyTypes";

export interface IEmail {
  dataKind: IDataKind;
  email: string;
  dataVisibility: IDataVisibility;
}

export interface IEmailInput {
  dataKind: number;
  email: string;
  dataVisibility: number;
}

export const EmailInputDefault: IEmailInput = {
  dataKind: 0,
  email: "",
  dataVisibility: 0,
};

export function emailToInput(email: IEmail): IEmailInput {
  return {
    dataKind: email.dataKind.index,
    email: email.email,
    dataVisibility: email.dataVisibility.index,
  };
}
