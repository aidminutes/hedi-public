import { AssertClientSide } from ".";

export function getRedirectParam() {
  if (AssertClientSide() && window.location.pathname) {
    let path = window.location.pathname;
    if (path.includes("redirect="))
      path = path.substring(0, path.indexOf("redirect=") - 1);
    return {
      redirectParamString: "redirect=" + path,
    };
  } else {
    return {
      redirectParamString: "redirect=/",
    };
  }
}
