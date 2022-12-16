import { IGenericComponent } from "@/modules/components";

export const isNewsBarExpired = (givenDate: IGenericComponent): Boolean => {
  let isExpired = false;
  let expirationDateNewsBar = new Date().getTime();

  if (givenDate.text !== undefined) {
    expirationDateNewsBar = new Date(givenDate.text).getTime();
  }
  const millisecondsLeft = expirationDateNewsBar - new Date().getTime();
  isExpired = millisecondsLeft >= 0 ? false : true;
  return isExpired;
};
