import { useState, useEffect } from "react";
import { ICategoryEntry } from "../../../types";

export function useSubCategories(categories: ICategoryEntry[] | null) {
  const [hasSubCategories, setHasSubCategories] = useState(
    categories && categories.length > 0
  );

  useEffect(() => {
    setHasSubCategories(categories && categories.length > 0);
  }, [categories]);

  return { hasSubCategories };
}
