import React, { useState } from "react";
import { useRouter } from "next/router";

export function useGlobalSearchMenu() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (query: string) => {
    setSearchText(query);
  };

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO add dynamic route
    router.push("/search/" + searchText);
  };

  return {
    searchText,
    handleSearchInput,
    handleSearchSubmit,
  };
}
