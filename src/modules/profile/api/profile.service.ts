import { axiosClient } from "@/core/api/axios.client";

export const checkPassword = async (payload: {
	password: string;
	user_id: string;
}) => {
	const { data } = await axiosClient.post("/auth/oldPassword", payload);
	return data;
};
export const resetPassword = async (payload: {
	username: string;
	password: string;
	user_id: string;
}) => {
	const { data } = await axiosClient.post("/auth/reset", payload);
	return data;
};
