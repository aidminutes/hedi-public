import { Button } from "carbon-components-react";
import { ArrowUp32 } from "@carbon/icons-react";
import { useScrollToTop } from "./useScrollToTop";
import { IScrollToTop } from "./types";

export const ScrollToTop = (props: IScrollToTop): JSX.Element => {
  const {
    handleRouteChangeComplete,
    isVisible,
    isAtTheBottom,
  } = useScrollToTop(props);

  const { appStyle, label } = props;

  return (
    <div
      className={`hedi--scroll-to-top${
        isAtTheBottom ? " hedi--scroll-to-top__bottom" : ""
      }${appStyle ? ` ${appStyle}--scroll-to-top` : ""}`}>
      {isVisible ? (
        <Button
          hasIconOnly
          renderIcon={ArrowUp32}
          iconDescription={label?.text}
          tooltipPosition="left"
          onClick={() => handleRouteChangeComplete()}
        />
      ) : null}
    </div>
  );
};
export default ScrollToTop;
