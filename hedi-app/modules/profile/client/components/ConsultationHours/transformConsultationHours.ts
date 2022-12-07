import { IConsultationHour } from "@/modules/profile/types/dataTypes";

export interface IWorkDay {
  day: string;
  times: string;
  availability: string;
}

export const transformConsultationHours = (
  consultationHours: IConsultationHour[]
) => {
  const days: (IWorkDay | null)[] = Array(8).fill(null);
  consultationHours.forEach(cHour => {
    let day = days[cHour.weekday.index];
    const times = cHour.startTime
      ? `${cHour.startTime} – ${cHour.endTime}`
      : "";
    if (!day) {
      day = {
        day: cHour.weekday.abbreviation ?? cHour.weekday.label,
        times,
        availability: cHour.availability.label,
      };
    } else {
      day.times += "/n" + times;
      day.availability += "/n" + cHour.availability.label;
    }
    days[cHour.weekday.index] = day;
  });
  return days;
};
