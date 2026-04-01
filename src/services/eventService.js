import { eventsMock } from "../mocks/eventsMock";

export const getEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventsMock);
    }, 300);
  });
};