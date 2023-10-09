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

export const getDateAtTime = (date: Date, time: string): Date  => {
  return new Date();
}
