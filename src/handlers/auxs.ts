export const checkNull = (str: string | null): string | undefined => {
  return str === null ? undefined : str;
};

export const getWppNumber = (str: string): string => {
  let res: string = "";
  for (const c of str) {
    if (!isNaN(Number(c))) {
      res += c;
    }
  }
  return res;
};
