export const DAY_TIME = 1000 * 60 * 60 * 24;

export const convertStringToTime = (dateString: any): Date => {
  const [hours, minutes, seconds] = dateString.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, seconds);

  return date;
};

export const incrementTime = (now: Date, time: Date): Date => {
  let increment = 1000 * 60;
  if (time.getHours() > 0) {
    increment *= time.getHours();
  }
  if (time.getMinutes() > 0) {
    increment *= time.getMinutes();
  }
  if (time.getSeconds() > 0) {
    increment *= time.getSeconds();
  }

  return new Date(now.getTime() + increment);
};

export const getTimeString = (time: Date): string => {
  let res = "";
  const hour = time.getHours();
  const minutes = time.getMinutes();
  if (hour < 10) {
    res += `0${hour}:`;
  } else {
    res += `${hour}:`;
  }

  if (minutes < 10) {
    res += `0${minutes}`;
  } else {
    res += `${minutes}`;
  }

  return res;
};

export const getDateAtTime = (date: Date, time: string): Date => {
  const [hour, minutes] = time.split(":");
  const d = new Date(date);
  d.setHours(Number(hour));
  d.setMinutes(Number(minutes));
  return d;
};

export function formatDateToCustomString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const areEqualsByHoursAndMinuts = (a: Date, b: Date): boolean => {
  if (a.getHours() !== b.getHours()) return false;
  if (a.getMinutes() !== b.getMinutes()) return false;
  return true;
};

export const compareTimes = (a: string, b: string): number => {
  const [hourA, minutesA] = a.split(":");
  const [hourB, minutesB] = b.split(":");
  return (
    Number(hourA) * 60 +
    Number(minutesA) -
    (Number(hourB) * 60 + Number(minutesB))
  );
};

export const areInTheSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const areInTheSameWeek = (a: Date, b: Date): boolean => {
  let minDate: Date;
  let maxDate: Date;

  if (a.getTime() < b.getTime()) {
    minDate = getCleanDate(a, false);
    maxDate = getCleanDate(b, true);
  } else {
    minDate = getCleanDate(b, false);
    maxDate = getCleanDate(a, true);
  }

  const weekDayOfMinDate = minDate.getDay();
  const daysToEndWeek = 6 - weekDayOfMinDate;
  const maxTimestamp = getCleanDate(
    new Date(minDate.getTime() + DAY_TIME * daysToEndWeek),
    true
  );
  return maxDate.getTime() <= maxTimestamp.getTime();
};

export const areInTheSameMonth = (a: Date, b: Date): boolean => {
  return a.getMonth() === b.getMonth();
};

export const areInTheSameYear = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear();
};

export const getCleanDate = (d: Date, max: boolean): Date => {
  const nDate = new Date(d);
  const hour = max ? 23 : 0;
  const other = max ? 59 : 0;
  nDate.setHours(hour);
  nDate.setMinutes(other);
  nDate.setSeconds(other);
  nDate.setMilliseconds(other);
  return nDate;
};

export const getDateString = (d: Date): string => {
  return `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
};

export const getWeekRange = (d: Date): string => {
  const weekDay = d.getDay();
  const minDate = getCleanDate(
    new Date(d.getTime() - DAY_TIME * weekDay),
    false
  );
  const maxDate = getCleanDate(
    new Date(minDate.getTime() + DAY_TIME * 6),
    true
  );
  return `${getDateString(minDate)} to ${getDateString(maxDate)}`;
};

export const getMonthString = (d: Date): string => {
  switch (d.getMonth()) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Month doesn't exist.";
  }
};

export const getDaysBetweenTwoDates = (a: Date, b: Date): number => {
  const aClean = getCleanDate(a, false);
  const bClean = getCleanDate(b, false);
  const diffMiliseconds = Math.abs(aClean.getTime() - b.getTime());
  return Math.ceil(diffMiliseconds / DAY_TIME);
};
