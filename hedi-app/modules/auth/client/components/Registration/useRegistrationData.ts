import { IRegisterInfo } from "@/modules/auth/types";
import { useState } from "react";

export function useRegistrationData() {
  const [registrationData, setRegistrationData] = useState<IRegisterInfo>({});

  return { registrationData, setRegistrationData };
}
