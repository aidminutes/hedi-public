import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AssertClientSide } from "@/modules/common/utils";
import { IScrollToTopConfig } from "./types";

export function useScrollToTop({
  left = 0,
  top = 0,
  behavior = "smooth",
}: IScrollToTopConfig) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // in %
  const [currenPosition, setCurrentPosition] = useState(0);
  const [isAtTheBottom, setIsAtTheBottom] = useState(false);

  const handleRouteChangeComplete = () => {
    if (AssertClientSide()) {
      window.scrollTo({ top, left, behavior });
    }
  };

  useEffect(() => {
    if (!isAtTheBottom && currenPosition > 99) setIsAtTheBottom(true);
    if (isAtTheBottom && currenPosition < 99) setIsAtTheBottom(false);
  }, [currenPosition]);

  const handleScroll = () => {
    if (AssertClientSide() && typeof document !== "undefined") {
      const totalheight = document.documentElement.scrollHeight;
      const scrollheight = window.pageYOffset + window.innerHeight;
      setCurrentPosition((scrollheight / totalheight) * 100);
      setIsVisible(window.pageYOffset > 100);
    }
  };

  useEffect(() => {
    if (AssertClientSide()) {
      window.addEventListener("scroll", handleScroll);
    }

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [behavior, left, top]);

  return {
    isAtTheBottom,
    isVisible,
    handleRouteChangeComplete,
  };
}
