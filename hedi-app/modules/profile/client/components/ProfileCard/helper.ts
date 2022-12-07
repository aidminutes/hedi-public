export function getDistanceString(
  distanceInKm: number,
  distanceTemplate = "{d} km",
  locale?: string
) {
  return distanceTemplate.replace(
    "{d}",
    distanceInKm.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })
  );
}
