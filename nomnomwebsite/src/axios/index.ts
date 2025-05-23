import axios from "axios";

export const myAPI = axios.create({
  baseURL: process.env.API_URL,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    myAPI.defaults.headers.common["Authorization"] = token;
  } else {
    delete myAPI.defaults.headers.common["Authorization"];
  }
};
