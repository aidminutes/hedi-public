import { ColumnDefaultProps } from "carbon-components-react";
import { IArticleEntryListProps } from "../../../types";

export function generateArticleEntryListColumnProps(
  props: Pick<IArticleEntryListProps, "entryType">
) {
  const { entryType } = props;

  const columnProps: ColumnDefaultProps =
    entryType === "full"
      ? { sm: 4, md: 6, lg: 12 }
      : entryType === "normal-neighbours"
      ? { sm: 4, md: 4, lg: 8 }
      : { sm: 4, md: 6, lg: 10 };

  return { columnProps };
}
