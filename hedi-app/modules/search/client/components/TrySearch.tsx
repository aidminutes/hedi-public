import { IPage } from "@/modules/common/types";
import { IWithType } from "@/modules/model";
import { SearchWithTagFilterView } from ".";
import { SearchMidwife } from "./SearchMidwife";
import { SearchMidwifeConfirmation } from "./SearchMidwifeConfirmation";
import { SearchMidwifeEntry } from "./SearchMidwifeEntry";
import { SearchMidwifeWizard } from "./SearchMidwifeWizard/SearchMidwifeWizard";
import { SearchProfileView } from "./SearchProfileView";
import { SearchView } from "./SearchView";

export const TrySearch = ({
  content,
}: {
  content: IWithType;
}): JSX.Element | null => {
  switch (content.type) {
    case "Search":
      // TODO type after removing app page
      return <SearchView content={content as any} key="search" />;
    case "SearchProfile":
      return (
        <SearchProfileView content={content as IPage} key="searchProfile" />
      );
    case "SearchWithTagFilter":
      return (
        <SearchWithTagFilterView
          content={content as any}
          key="searchWithTagFilter"
        />
      );
    case "SearchMidwife":
      return <SearchMidwife content={content as IPage} key="searchMidwife" />;
    case "SearchMidwifeEntry":
      return (
        <SearchMidwifeEntry
          content={content as IPage}
          key="searchMidwifeEntry"
        />
      );
    case "SearchMidwifeWizard":
      return (
        <SearchMidwifeWizard
          content={content as IPage}
          key="searchMidwifeWizard"
        />
      );
    case "SearchMidwifeConfirmation":
      return (
        <SearchMidwifeConfirmation
          content={content as IPage}
          key="searchMidwifeConfirmation"
        />
      );

    default:
      return null;
  }
};
