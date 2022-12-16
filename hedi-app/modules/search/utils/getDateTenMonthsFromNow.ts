export function getDateTenMonthsFromNow(): string {
  const now = Date.now();
  const tenMonthsInMilliseconds = 26298000000;
  const tenMonthsAway = new Date(now + tenMonthsInMilliseconds);

  return tenMonthsAway.toLocaleDateString("de");
}
