import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
import React from "react";

export const tokenDecode = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export function numberWithCommas(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export const successNotification = ({ title, message }) =>
  showNotification({
    title,
    message: message,
    color: "green",
    icon: <IconCheck />,
  });

export const errorNotification = ({ title, message, icon }) =>
  showNotification({
    title,
    message: message,
    color: "red",
    icon: icon ? icon : <IconAlertCircle />,
  });
