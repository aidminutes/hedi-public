import { IRegisterRequest } from "../../types";

export function getEncodeInfo(info: IRegisterRequest) {
  const infoParameters = new URLSearchParams();
  Object.entries(info).forEach(entry => {
    if (entry[1]) infoParameters.append(entry[0], entry[1]);
  });
  return infoParameters.toString();
}
