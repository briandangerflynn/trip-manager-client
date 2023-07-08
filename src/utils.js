import humps from "humps";
import moment from "moment";

const API_ENDPOINT = "http://localhost:3000";
const FORM_HEADERS = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};

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

const prepFormData = (form) => {
  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    const formattedKey = humps.decamelize(key);
    formData.append(formattedKey, form[key]);
  });
  return formData;
};

const getElapsedTime = (trip) => {
  const checkInTime = moment(trip.start_time);
  const currentTime = moment(new Date());
  const elapsedTime = currentTime.diff(checkInTime, "minutes");

  return formattedElapsedTime(elapsedTime);
};

const formattedElapsedTime = (elapsedTime) => {
  let hours = Math.floor(elapsedTime / 60).toString();
  if (hours < 1) {
    hours = "00";
  } else if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = (elapsedTime % 60).toString();
  if (minutes < 1) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
};

export {
  API_ENDPOINT,
  FORM_HEADERS,
  objectExists,
  storeSession,
  getSession,
  formatDateTime,
  prepFormData,
  getElapsedTime,
};
