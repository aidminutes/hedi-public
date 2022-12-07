import { IErrorResponse, IsIErrorResponse } from "@/modules/common/error";
import { IProfileSearchResponse } from "@/modules/search/types";
import { useState } from "react";

export const useSearchIProfileSort = (
  data: IErrorResponse | IProfileSearchResponse | null
) => {
  const sortFields: string[] =
    data && !IsIErrorResponse(data) && data.result.length
      ? Object.keys(data.result[0].scoreDetails ?? {}).map(key => key)
      : [];

  const [selectedSortField, setSelectedSortField] = useState("");

  const sorterFn = (result: IProfileSearchResponse) => {
    return {
      ...result,
      result: result.result.sort(
        (a, b) =>
          (b.scoreDetails?.[selectedSortField]?.score || 0) -
          (a.scoreDetails?.[selectedSortField]?.score || 0)
      ),
    };
  };

  const handleSortFieldChange = (value: string) => setSelectedSortField(value);
  const sortedData = data && !IsIErrorResponse(data) ? sorterFn(data) : data;

  return { sortFields, handleSortFieldChange, sortedData };
};
