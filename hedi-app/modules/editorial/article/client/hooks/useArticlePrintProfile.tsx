import { useState, useEffect } from "react";

export type ArticlePrintProfile =
  | "Article"
  | "Article with Profiles"
  | "Profiles"
  | null;

export function useArticlePrintProfile() {
  const [printProfile, setPrintProfile] = useState<ArticlePrintProfile>(null);

  useEffect(() => {
    if (printProfile === null) return;
    window.print();
    setPrintProfile(null);
  }, [printProfile]);

  return { printProfile, setPrintProfile };
}
