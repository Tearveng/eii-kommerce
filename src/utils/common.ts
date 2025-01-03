export const substring100 = (str: string) => {
  if (str.length > 100) {
    str = str.substring(0, 100);
  }
  return str;
};

export const strGreater100 = (str: string) => str.length > 100;
