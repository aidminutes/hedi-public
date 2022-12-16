import { IAPIResponse } from "@/modules/model";
import { ParsedUrlQuery } from "querystring";

/* --- dev helper functions --- */
export function AssertClientSide() {
  return typeof window !== "undefined";
}

export function AssertServerSide() {
  return typeof window === "undefined";
}

export function NotificationsSupported() {
  return (
    AssertClientSide() &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

export function AssertEnvDev() {
  return process.env.NODE_ENV === "development";
}

export function AssertEnvProduction() {
  return process.env.NODE_ENV === "production";
}

// HACK: should be solved on backend gql side
// --- Build assets URL --- //
export function buildAssetUrl(url: string | undefined): string {
  if (url === undefined) return "";
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
  return `${BASE_URL}${url}`;
}

export const routeToSegments = (route?: string) => {
  const segments = route ? route.split("/").filter(s => s) : [];
  segments.shift();
  return segments;
};

export const segmentsQueryToSearchParamEntries = (
  segmentsQuery: ParsedUrlQuery,
  queryKeys = ["segments"]
) =>
  Object.entries(segmentsQuery).reduce((acc, cur, i) => {
    if (!queryKeys.includes(cur[0])) acc.push(cur);
    return acc;
  }, [] as [string, string | string[] | undefined][]);

export const segmentsQueryToSearchParams = (
  segmentsQuery: ParsedUrlQuery,
  queryKeys = ["segments"]
) => {
  const searchParamsArray = segmentsQueryToSearchParamEntries(
    segmentsQuery,
    queryKeys
  );
  if (searchParamsArray.length === 0) return "";
  return searchParamsArray.reduce((acc, [k, v], i) => {
    acc += i === 0 ? "?" : "&";
    if (v) {
      acc += `${k}=${v}`;
    } else {
      acc += k;
    }
    return acc;
  }, "");
};

export function jsonFetcher<T extends IAPIResponse<any> | null>(
  url: RequestInfo
) {
  return fetch(url)
    .then(response => response.json().catch(() => null))
    .then(jsonResponse => jsonResponse as T); // TODO must be | null as well
}

export function jsonPost<T extends IAPIResponse<any> | null>(
  url: RequestInfo,
  data: object,
  returnAsText = false
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(response =>
      (returnAsText ? response.text() : response.json()).catch(() => null)
    )
    .then(jsonResponse => jsonResponse as T | null);
}

export function getLangByRoute(route: string) {
  return route
    .split("/")
    .filter(s => s)
    .shift();
}

export function prettifyUrl(url: string) {
  if (url === null) return;
  return url.replace(/(^\w+:|^)\/\//, "");
}

export function formatPhoneNumber(phoneNumber: string) {
  // TODO make better just a HACK for test
  let newString = phoneNumber.match(/[0-9]{0,14}/g)?.join("");
  if (!newString) {
    return null;
  }
  let editedNumber = newString.slice(1);
  return newString.startsWith("00")
    ? `+${newString.substr(2)}`
    : newString.startsWith("0")
    ? `+49${editedNumber}`
    : newString.startsWith("049")
    ? `+${editedNumber}`
    : newString.startsWith("49")
    ? `+${newString}`
    : newString.startsWith("0049")
    ? newString
    : newString;
}

export function transformStringToUrl(string: string) {
  return !string ||
    string.startsWith("http://") ||
    string.startsWith("https://")
    ? string
    : `http://${string}`;
}

// HACK carbon typing is not aligned with current online documentation.
// our current version might be not up to date
export function convertToCarbonSize(
  size?: "sm" | "md" | "lg"
): "sm" | "xl" | undefined {
  switch (size) {
    case "lg":
      return "xl";
    case "md":
      return undefined;
    default:
      return size;
  }
}

export function isEven(value: number) {
  return value % 2 === 0 ? true : false;
}

export function shortenUrl(value: string, withHttps?: boolean): string {
  const url = new URL(value);
  const { pathname, origin, host } = url;
  const pathElements = pathname.split("/");
  const firstElement = pathElements[1];
  const newPathname = `/${firstElement}/...`;
  const start = withHttps ? origin : host;
  return `${start}${newPathname}`;
}

export const fuzzyFilter = (query: string, elements: string[]) => {
  return elements.filter(e => fuzzySearch(query, e));
};

const fuzzySearch = (query: string, searchString: string) => {
  const str = searchString.toLowerCase();
  let i = 0,
    n = -1,
    l;
  query = query.toLowerCase();
  for (; (l = query[i++]); ) {
    if (!~(n = str.indexOf(l, n + 1))) {
      return false;
    }
  }
  return true;
};

export function replaceUsingIndex(
  string: string,
  index: number,
  replacement: String
) {
  if (index >= string.length) return string;

  return string.substring(0, index) + replacement + string.substring(index + 1);
}

export function replaceLastSlashWithSharp(route: string) {
  return (route ?? "").replace(
    /\/([^\/]*)$/,
    (match, hashPart) => "#" + encodeURIComponent(hashPart)
  );
}

export function transformUrlRoutes(url: string, type: string) {
  switch (type) {
    case "taxonomy":
      url = convertSolrResultTaxonomyUrl(url);
      break;
  }
  return url;
}

export function convertSolrResultTaxonomyUrl(taxonomyUrl: string) {
  return taxonomyUrl.replace("taxonomy_term", "taxonomy/term");
}

export function dateToString(date: Date | undefined, format: string = "d.m.Y") {
  date = new Date(date as any);
  return !isNaN(date.getTime()) ? formatDatetime(date, format) : "";
}

function formatDatetime(date: Date, format: string) {
  const _padStart = (value: number): string =>
    value.toString().padStart(2, "0");
  return format
    .replace(/Y/g, _padStart(date.getFullYear()))
    .replace(/d/g, _padStart(date.getDate()))
    .replace(/m/g, _padStart(date.getMonth() + 1));
}

export function getAge(birthDate: Date | undefined) {
  if (!birthDate) return 0;
  return new Date().getFullYear() - new Date(birthDate).getFullYear();
}

export function calculateAge(date: Date | undefined) {
  if (!date) return 0;
  const birthDate = new Date(date);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  )
    years--;

  return years;
}

export const isBoolean = (value: any) => typeof value === "boolean";

const romanNumeralLookup: { [key: string]: number } = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

export function romanize(num: number) {
  if (num < 1) return "-";

  let roman = "";
  let i;

  for (i in romanNumeralLookup) {
    while (num >= romanNumeralLookup[i]) {
      roman += i;
      num -= romanNumeralLookup[i];
    }
  }
  return roman;
}
