import axios from "axios";

export const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true, // so cookies (token) are sent automatically
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.message || "Unexpected server error.";
		return Promise.reject(new Error(message));
	}
);