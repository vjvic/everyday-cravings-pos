import { eachDayOfInterval, format, eachMonthOfInterval } from "date-fns";

//Set  item to local storage
export const setItemToLcalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

//Get item from local storage
export const getItemFromLocalStorage = (name) => {
  if (name === "cartItems") {
    return localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : [];
  } else {
    return localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name))
      : null;
  }
};

const currentYear = format(new Date(), "yyyy");
const currentDay = format(new Date(), "d");
const currentMonth = format(new Date(), "M");

const lastDay = (y, m) => {
  return new Date(y, m, 0).getDate();
};

// return all days of month
export const getAllDaysOfMonth = () => {
  const days = eachDayOfInterval({
    start: new Date(currentYear, currentMonth - 1, 1),
    end: new Date(
      currentYear,
      currentMonth - 1,
      lastDay(currentYear, currentDay)
    ),
  }).map((d) => format(new Date(d), "d"));

  return days;
};

//return all months of year
export const getAllMonthsOfYear = () => {
  const year = eachMonthOfInterval({
    start: new Date(currentYear, 1, 0),
    end: new Date(currentYear, 12, 0),
  }).map((y) => format(new Date(y), "MMM"));

  return year;
};

//return all cart items total amount
export const totalAmount = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
};

//Unique id

export const uniqueID = () => {
  return Math.floor(Math.random() * Date.now());
};
