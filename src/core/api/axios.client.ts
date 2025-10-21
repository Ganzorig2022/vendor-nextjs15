import axios from "axios";

export const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true, // so cookies (token) are sent automatically
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const backendError = error.response?.data?.error;
		const message = error.response?.data?.message || "Системийн алдаа.";

		// 		{
		//   code: "PASSWORD_BLOCKED",
		//   message: "Таны нууц үг блоклогдлоо. Нууц үгээ сэргээнэ үү.",
		//   status: 400
		// }
		const customError = {
			code: backendError,
			message,
			status: error.response?.status,
		};

		// ✅ Show toast only in browser
		if (typeof window !== "undefined") {
			import("sonner").then(({ toast }) => {
				toast.error(message);
			});
		}

		return Promise.reject(customError);
	}
);
