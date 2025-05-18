import axios from "axios";

export const myAPI = axios.create({
	baseURL: process.env.API_URL,
});

if (typeof window !== "undefined") {
	const token = localStorage.getItem("token");
	if (token) {
		myAPI.defaults.headers.common["Authorization"] = token;
	}
}
