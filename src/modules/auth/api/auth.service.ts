import { axiosClient } from "@/core/api/axios.client";
import * as z from 'zod';
import { loginSchema } from "../schema/login.schema";

export const loginRequest = async (payload: z.infer<typeof loginSchema>) => {
	const { data } = await axiosClient.post("/auth/login", payload);
	return data; // expects backend to return { token, user }
};

export const recoverPassword = async (payload: { username: string }) => {
	const { data } = await axiosClient.post("/user/recover_password", payload);
	return data; // expects backend to return { token, user }
};
