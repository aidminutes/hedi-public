import { ITag } from "@/modules/model";
import { Tag } from "../Tag";

interface ITagList {
  tags?: Pick<ITag, "label" | "route">[];
  headline?: String;
}

export const TagList = ({ tags, headline }: ITagList): JSX.Element => {
  return (
    <aside className="hedi--tag-list">
      {headline && <h4 className="headline">{headline}</h4>}
      {tags && tags?.length > 0
        ? tags.map(tag => <Tag tag={tag} key={tag.route} />)
        : null}
    </aside>
  );
};
