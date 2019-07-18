import { NOTIFY_USER } from "./types";

export const notifyUser = (message, messageType) => {
  // What we return to the reducer
  return {
    type: NOTIFY_USER,
    message,
    messageType
  };
};
