import { Checkmark16 } from "@carbon/icons-react";

interface IServiceProps {
  route: string;
  label: string;
}
export const Service = ({ route, label }: IServiceProps): JSX.Element => {
  return (
    <p>
      <Checkmark16 />{" "}
      <span className="bx--tag__label hedi-unstyled-link">{label}</span>
    </p>
  );
};
