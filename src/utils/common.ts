import { matchIsValidTel } from "mui-tel-input";
import { store } from "../redux";
import { dispatchSnackbar } from "../redux/application";
import { IErrorConnection, IErrorType } from "../redux/type";

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
