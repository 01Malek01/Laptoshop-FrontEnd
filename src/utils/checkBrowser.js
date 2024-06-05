// utils.js
export const isBrowser = () => typeof window !== "undefined";

export const getFromLocalStorage = (key) => {
  if (isBrowser() && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null; // Or any default value you prefer
};

export const setToLocalStorage = (key, value) => {
  if (isBrowser()) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
