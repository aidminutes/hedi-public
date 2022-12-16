import { ITag } from "@/modules/model";
import { Checkmark24 } from "@carbon/icons-react";

interface ITagProps {
  tag: Pick<ITag, "label">;
}
export const Tag = ({ tag }: ITagProps): JSX.Element => {
  return (
    <span className="hedi--tag">
      <Checkmark24 className="hedi--tag__checkmark" />
      {tag.label}
    </span>
  );
};
