import { AssertClientSide } from "./functions";

export function getBrowserNameAndVersion() {
  if (AssertClientSide()) {
    const ua = navigator.userAgent;
    let versionMatch;
    let nameMatch =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
    if (/trident/i.test(nameMatch[1])) {
      versionMatch = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (versionMatch[1] || "");
    }
    if (nameMatch[1] === "Chrome") {
      versionMatch = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (versionMatch != null)
        return versionMatch.slice(1).join(" ").replace("OPR", "Opera");
    }
    nameMatch = nameMatch[2]
      ? [nameMatch[1], nameMatch[2]]
      : [navigator.appName, navigator.appVersion, "-?"];
    if ((versionMatch = ua.match(/version\/(\d+)/i)) != null)
      nameMatch.splice(1, 1, versionMatch[1]);
    return nameMatch.join(" ");
  }
  return "";
}

export function getScreenResolution() {
  if (AssertClientSide()) {
    return (
      (window.screen.width * (window.devicePixelRatio || 1)).toFixed() +
      " x " +
      (window.screen.height * (window.devicePixelRatio || 1)).toFixed()
    );
  }
  return "";
}
