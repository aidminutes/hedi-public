import { IEntry } from "@/modules/common/types/IEntry";
import { jsonPost } from "@/modules/common/utils";
import { TextInput } from "@/modules/components";
import { IAPIResponse } from "@/modules/model";
import { useTextInput } from "@/modules/react/hooks/useTextInput";
import {
  IQuickSearchResponse,
  quickSearchAPIUrl,
} from "@/modules/search/types";
import { useEffect } from "react";
import useSWR from "swr";
import { Suggestions } from "../Suggestions";
import { IQuickSearch } from "./types";

export const QuickSearch = (props: IQuickSearch) => {
  const { lang, onSelect, quickSearchLabel, ...definition } = props;
  const { suggestionsDefinition, textInput } = definition;
  const [searchText, onSearchTextChange, setSearchText] = useTextInput("");

  useEffect(() => () => setSearchText(""), []);

  const { data } = useSWR(
    [quickSearchAPIUrl, searchText, lang],
    (url, searchText, lang) =>
      jsonPost<IAPIResponse<IQuickSearchResponse>>(url, {
        searchText,
        lang,
      }).then(res => res?.data?.result ?? null)
  );
  const elements = Array.isArray(data) ? data : [];
  return (
    <div className="hedi--quick-search">
      <Suggestions
        searchIsActive={true}
        handleElementSelection={onSelect ?? (() => {})}
        elements={elements}
        {...suggestionsDefinition}
      />
      <TextInput
        {...textInput}
        value={searchText}
        onChange={onSearchTextChange}
      />
    </div>
  );
};
