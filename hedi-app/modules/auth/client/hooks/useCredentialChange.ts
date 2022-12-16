import { useEffect, useState } from "react";
import { IRegisterError, IRegisterInfo } from "../../types";

export const useCredentialChange = (
  givenName: string,
  familyName: string,
  mail: string,
  pass: string,
  role: string,
  errors?: IRegisterError,
  onChange?: (info: IRegisterInfo) => void
) => {
  const [isCheckCredentialError, setIsCheckCredentialError] = useState(true);
  useEffect(() => {
    if (onChange && (givenName || familyName || mail || pass || role)) {
      onChange({ givenName, familyName, mail, pass, role });
      setIsCheckCredentialError(false);
    }
  }, [givenName, familyName, mail, pass, role]);
  useEffect(() => {
    setIsCheckCredentialError(true);
  }, [errors]);

  return { isCheckCredentialError, onChange };
};
