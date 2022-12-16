export function segmentsToRoute(segments: string[], locale: string = "de") {
  if (segments.length === 0 || segments[0] !== locale) {
    segments.splice(0, 0, locale);
  }
  return "/" + segments.join("/");
}
