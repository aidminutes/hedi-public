import { getLangByRoute } from "@/modules/common/utils";
import { useRouter } from "next/router";

export const getSearchQueryTextFromSegments = (route: string) => {
  const router = useRouter();

  let initialQueryText = "";

  let path = router.asPath;
  let lastSegmentOfRoute = route.split("/").pop() ?? "";
  let lang = getLangByRoute(route) ?? "de";
  let match = router.asPath.match(RegExp(`([^\/]+$)`));
  let lastSegmentOfPath = "";

  if (match && match.length > 0) {
    lastSegmentOfPath = match[0];
  }

  if (!path.startsWith(lang + "/") || !path.startsWith("/" + lang + "/")) {
    path = "/" + lang + path;
  }

  if (
    lastSegmentOfRoute !== lastSegmentOfPath &&
    (route.includes(lastSegmentOfPath) || !path.includes(route))
  ) {
    return "";
  }

  try {
    match = path.match(RegExp(`(?<=${lastSegmentOfRoute}\/).*$`));
    if (match && match.length > 0) {
      initialQueryText = match[0];
    }
  } catch (error) {}

  initialQueryText = decodeURIComponent(initialQueryText);

  return initialQueryText;
};
