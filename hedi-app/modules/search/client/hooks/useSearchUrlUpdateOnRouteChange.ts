import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export const useSearchUrlUpdateOnRouteChange = (
  initialQueryText: string,
  currentQueryText: string
) => {
  const router = useRouter();
  const updateUrlPathWithCurrentQueryText = useCallback(
    newUrl => {
      const currentPath = router.asPath.startsWith("/" + router.locale)
        ? router.asPath
        : "/" + router.locale + router.asPath;
      if (newUrl.includes(currentPath)) {
        return; // Next sometimes causes this during Fast Refresh.
      }

      // immediately remove the listener, otherwise we get infinite loops due to the router.pushs and .replaces here.
      router.events.off("routeChangeStart", updateUrlPathWithCurrentQueryText);

      let pathBeforeLeave;
      if (initialQueryText.trim().length === 0) {
        if (currentPath.endsWith("/")) {
          pathBeforeLeave = `${currentPath}${currentQueryText}`;
        } else {
          pathBeforeLeave = `${currentPath}/${currentQueryText}`;
        }
      } else {
        pathBeforeLeave = currentPath.replace(
          encodeURIComponent(initialQueryText),
          encodeURIComponent(currentQueryText)
        );
      }

      router.replace(pathBeforeLeave, undefined, { shallow: true });
    },
    [initialQueryText, currentQueryText]
  );

  useEffect(() => {
    router.events.on("routeChangeStart", updateUrlPathWithCurrentQueryText);
    return () =>
      router.events.off("routeChangeStart", updateUrlPathWithCurrentQueryText);
  }, [router, updateUrlPathWithCurrentQueryText]);
};
