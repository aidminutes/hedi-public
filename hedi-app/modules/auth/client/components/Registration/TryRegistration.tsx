import { IWithType } from "@/modules/model";
import { IRegistration } from "../../../types";
import { RegistrationView } from "./RegistrationView";

export const TryRegistration = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null =>
  content.type === "Registration" ? (
    <RegistrationView content={content as IRegistration} />
  ) : null;
