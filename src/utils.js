const API_ENDPOINT = "http://localhost:3000";

const objectExists = (object) => {
  if (object) {
    return Object.keys(object).length !== 0;
  } else {
    return false;
  }
};

const storeSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

const getSession = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const formatDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString();
};

export { API_ENDPOINT, objectExists, storeSession, getSession, formatDateTime };
