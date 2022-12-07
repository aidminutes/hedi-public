export function calculatePregnancyWeekAndDay(value: string) {
  const pregnancyDaysTotal = 280;
  const today = new Date();
  const expectedDeilveryDate = new Date(value);

  const diffTime = expectedDeilveryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

  const pregnancyDaysTillNow = pregnancyDaysTotal - diffDays;

  const pregnancyWeek = Math.floor(pregnancyDaysTillNow / 7);
  const pregnancyDay = pregnancyDaysTillNow % 7;

  const result = `${pregnancyWeek} + ${pregnancyDay}`;

  return result;
}