import { useRouter } from "next/router";
import { IBackToHome, IBackToHomeDefinition } from "./types";

export function useBackToHome(
  backToHome?: IBackToHomeDefinition
): IBackToHome | undefined {
  const locale = useRouter().locale ?? "de";
  if (!backToHome) return backToHome;
  else {
    backToHome.href = `/${locale}`;
    return backToHome;
  }
}
