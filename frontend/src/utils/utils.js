//Set  item to local storage
export const setItemToLcalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
