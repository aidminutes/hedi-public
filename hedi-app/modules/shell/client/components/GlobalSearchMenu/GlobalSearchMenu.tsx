import { useGlobalSearchMenu } from "./useGlobalSearchMenu";
import { useToggleVisibility } from "../../hooks";
import { Search32, Close32 } from "@carbon/icons-react";
import { Button, Form } from "carbon-components-react";
import { SearchInput } from "@/modules/search/client/components";

export const GlobalSearchMenu = () => {
  const { isVisible, toggleVisibility } = useToggleVisibility();
  const {
    searchText,
    handleSearchInput,
    handleSearchSubmit,
  } = useGlobalSearchMenu();

  return (
    <>
      <Button
        renderIcon={isVisible ? Close32 : Search32}
        // TODO description
        iconDescription="Icon Description"
        hasIconOnly
        onClick={() => toggleVisibility()}
      />
      <Form
        onSubmit={e => handleSearchSubmit(e)}
        className={`hedi--global-search-menu ${isVisible ? "" : "hidden"}`}>
        <SearchInput
          onQueryChanged={e => handleSearchInput(e)}
          id={"search-header"}
          query={searchText}
        />
      </Form>
    </>
  );
};
