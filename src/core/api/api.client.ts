import axios from "axios";
import { toast } from "sonner";

// Client-side: calls your Next.js API routes which proxy to backend
export const axiosClientWithAuh = axios.create({
	baseURL: "/api/proxy", // Routes through your Next.js API
	withCredentials: true,
});

axiosClientWithAuh.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.message || "Системийн алдаа.";

		// ✅ Show toast only in browser
		if (typeof window !== "undefined") {
			toast.error(message);
		}
		return Promise.reject(new Error(message));
	}
);
