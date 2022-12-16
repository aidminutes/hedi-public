import { useState, useEffect } from "react";
import { IsIErrorResponse } from "@/modules/common/error";
import { useSuggest } from "../../hooks";
import { ISuggestEntry } from "@/modules/search/types";
export interface ISuggestProps {
  query: string;
  onSuggestSelect: (text: string) => void;
}
export function useAutoSuggest(props: ISuggestProps) {
  const { query, onSuggestSelect } = props;
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const { data, error } = useSuggest(
    query !== selectedSuggestion ? query : undefined
  );
  const [hasError, setHasError] = useState(IsIErrorResponse(data));

  useEffect(() => {
    setHasError(IsIErrorResponse(data));
  }, [data, error]);

  if (error) {
    //throw new Error(error);
    console.log("err");
  }

  const stripHtml = (taggedText: string): string => {
    let divNode = document.createElement("DIV");
    divNode.innerHTML = taggedText;
    return divNode.textContent || divNode.innerText || "";
  };
  const handleSuggestSelected = (text: string) => {
    const plainText = stripHtml(text);
    setSelectedSuggestion(plainText);
    onSuggestSelect(plainText);
  };

  return {
    data: !hasError ? (data as ISuggestEntry[]) : null,
    handleSuggestSelected,
  };
}
