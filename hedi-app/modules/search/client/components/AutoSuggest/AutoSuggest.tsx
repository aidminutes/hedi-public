import { useAutoSuggest, ISuggestProps } from "./useAutoSuggest";
import { ISuggestEntry } from "../../../types";
import { HTML } from "@/modules/react/html";
import { UnorderedList, ListItem } from "carbon-components-react";

export const AutoSuggest: React.FunctionComponent<ISuggestProps> = (
  props: ISuggestProps
) => {
  const { data, handleSuggestSelected } = useAutoSuggest(props);

  return (
    <div className="hedi--search__auto-suggest--wrap">
      <UnorderedList
        role="listbox"
        id="suggestion-list"
        className="hedi--search__auto-suggest">
        {data &&
          data.map((suggestedResult: ISuggestEntry, index: any) => (
            <div>
              <ListItem
                key={index}
                onClick={() => handleSuggestSelected(suggestedResult.term)}>
                <HTML data={suggestedResult.term} />
              </ListItem>
            </div>
          ))}
      </UnorderedList>
    </div>
  );
};
