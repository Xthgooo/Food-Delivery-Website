import axios from "axios";

export const myAPI = axios.create({
	baseURL: process.env.API_URL,
	headers: { Authorization: localStorage.getItem("token") || "" },
});
