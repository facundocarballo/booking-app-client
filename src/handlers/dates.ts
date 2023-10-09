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
  date.setHours(Number(hour));
  date.setMinutes(Number(minutes));
  return date;
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
