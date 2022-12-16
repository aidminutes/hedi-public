import { FormatDateRelativeParams } from "./types";

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _MS_PER_MINUTE = 1000 * 60;

export const formatDateRelative = (parameters: FormatDateRelativeParams) => {
  const {
    date,
    locale,
    momentsAgoText,
    todayText,
    yesterdayText,
    hideTime,
    alwaysShowTime,
  } = parameters;
  const dtf = Intl.DateTimeFormat;
  if (!date) {
    return "--";
  }

  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23);
  endOfDay.setMinutes(59);
  endOfDay.setSeconds(59);

  const getDateDiffInDays = (a: Date, b: Date) => {
    return Math.floor(Math.abs(a.getTime() - b.getTime()) / _MS_PER_DAY);
  };
  const getDateDiffInMinutes = (a: Date, b: Date) => {
    return Math.round(Math.abs(a.getTime() - b.getTime()) / _MS_PER_MINUTE);
  };

  const dateDiffInDays = getDateDiffInDays(endOfDay, date);
  const dateDiffInMinutes = getDateDiffInMinutes(now, date);

  const aMomentAgo = dateDiffInMinutes < 2;
  const isToday = dateDiffInDays === 0;
  const isYesterday = dateDiffInDays === 1;
  const lessThanAWeekAgo = dateDiffInDays <= 7;

  let options = {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  if (hideTime) {
    /*
                --> z.B. DayBreak, ChatEvents
                          < 1 Tag - “Heute”
                          < 2 Tage - “Gestern”
                          über 2 Tage - “[Tag] [Monat] [Jahr]”
                       */
    if (isToday) {
      return todayText;
    } else if (isYesterday) {
      return yesterdayText;
    } else {
      options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      } as Intl.DateTimeFormatOptions;
      //TODO add actual locales
      return dtf(locale, options).format(date);
    }
  }

  if (alwaysShowTime) {
    /*
                --> z.B TimeLine
                      dayOnly===false &&  showTime==true:
                          < 2min - "gerade eben"
                          < 1 Tag - “[Uhrzeit]”
                          < 2 Tage - “Gestern, [Uhrzeit]”
                          über 2 Tage - “[Tag] [Monat] [Jahr], [Uhrzeit]”
                      */
    if (aMomentAgo) {
      return momentsAgoText;
    } else if (isToday) {
      options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      } as Intl.DateTimeFormatOptions;
      return dtf(locale, options).format(date);
    } else if (isYesterday) {
      options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      } as Intl.DateTimeFormatOptions;
      return `${yesterdayText}, ${dtf(locale, options).format(date)}`;
    } else {
      options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      } as Intl.DateTimeFormatOptions;
      return dtf(locale, options).format(date);
    }
  } else {
    /*
                  --> z.B: RoomList
                        dayOnly===false &&  showTime==false:
                            < 2min - "gerade eben"
                            < 1 Tag - “[Uhrzeit]”
                            < 2 Tage - “Gestern”
                            über 2 Tage - “[Tag] [Monat] [Jahr]”
                        */
    if (aMomentAgo) {
      return momentsAgoText;
    } else if (isToday) {
      options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      } as Intl.DateTimeFormatOptions;
      return dtf(locale, options).format(date);
    } else if (isYesterday) {
      return yesterdayText;
    } else {
      options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      } as Intl.DateTimeFormatOptions;
      return dtf(locale, options).format(date);
    }
  }
};
