import { matchIsValidTel } from "mui-tel-input";
import { store } from "../redux";
import { dispatchSnackbar } from "../redux/application";
import { IErrorConnection, IErrorType } from "../redux/type";
import { ORDER_STATUS, StockType } from "./constant.ts";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

export const substring100 = (str: string) => {
  if (str.length > 100) {
    str = str.substring(0, 100);
  }
  return str;
};

export const strGreater100 = (str: string) => str.length > 100;

export const dateShortFormat = (d: string) => {
  const date = new Date(d);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: true,
  });
};

export const dateFullDayFormat = (d: string) => {
  const date = new Date(d);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
  });
};

export const validateEmail = (email: string) => {
  if (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please match the requested format";
    }
  } else {
    return undefined;
  }
};

export const validatePhone = (phone: string) => {
  let result: undefined | string = undefined;
  if (phone?.startsWith("+")) {
    const isMatch = matchIsValidTel(phone);
    if (!isMatch) {
      result = "Phone number is invalid.";
    }
  }
  return result;
};

export const snackbarError = (error: IErrorConnection | IErrorType) => {
  if ("error" in error && error.status === "FETCH_ERROR") {
    store.dispatch(dispatchSnackbar({ message: error.error, status: "error" }));
  } else {
    store.dispatch(
      dispatchSnackbar({ message: error.data.message, status: "error" }),
    );
  }
};

// Function to generate a random number in the format "xxxxxxxxx-x"
export const generateRandomNumber = (): string => {
  // Generate a 9-digit random number
  const nineDigits = Math.floor(
    100000000 + Math.random() * 900000000,
  ).toString();
  // Generate a random single digit (0-9)
  const singleDigit = Math.floor(Math.random() * 10).toString();
  // Combine with a hyphen
  return `${nineDigits}-${singleDigit}`;
};

export const titleName = (pathname: string): StockType => {
  const path = lastPathName(pathname);
  const type = {
    ["stock"]: "Stock",
    ["pre-stock"]: "Pre stock",
    ["live"]: "Live",
  };

  return type[path] ?? "Stock";
};

export const mapPathType = (type: StockType) => {
  const pathType = {
    [StockType.STOCK]: "stock",
    [StockType.PRE_STOCK]: "pre-stock",
    [StockType.LIVE]: "live",
  };

  return pathType[type];
};

export const lastPathName = (pathname: string, number = 2) => {
  const splitPathname = pathname.split("/");
  const pathName = splitPathname[splitPathname.length - number];

  return pathName;
};

export const formatPrice = (num: number) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
};
