import { IRegisterInfo } from "./IRegisterInfo";

export interface IRegisterRequest extends IRegisterInfo {
  lang?: string;
  commit?: boolean;
}
