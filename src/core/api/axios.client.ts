import axios from "axios";

export const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	// withCredentials: true, // so cookies (token) are sent automatically
});

axiosClient.interceptors.request.use((config) => {
	if (config.url?.includes("/api/file")) {
		config.headers.Authorization = `Basic ZXRsX2dlbmVyYXRvcjokcXBheTcwMjI=`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const backendError = error.response?.data?.error;
		const message = error.response?.data?.message || "Системийн алдаа.";

		const customError = {
			code: backendError,
			message,
			status: error.response?.status,
		};

		if (typeof window !== "undefined") {
			import("sonner").then(({ toast }) => {
				toast.error(message);
			});
		}

		return Promise.reject(customError);
	}
);
