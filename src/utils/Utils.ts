import { notifications } from "@mantine/notifications";
import type { AxiosError } from "axios";

const axiosConfig = <P>(/*token?: string,*/ params?: P) => {
  return {
    headers: {
      // Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    params: params ? params : {},
  };
};

export const handleSuccess = (message = "Operation successful!") => {
  notifications.show({
    title: "Success",
    message,
    color: "green",
    withBorder: true,
    styles: () => ({
      root: {
        backgroundColor: "#defce4",
      },
    }),
  });
};

export const handleError = (error: AxiosError<{ message?: string }>) => {
  const errorMessage = error.response?.data?.message || "Something went wrong.";
  notifications.show({
    title: "Error",
    message: errorMessage,
    color: "red",
    withBorder: true,
    styles: () => ({
      root: {
        backgroundColor: "#fcdede",
      },
    }),
  });
};

export { axiosConfig };
