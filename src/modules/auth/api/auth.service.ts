import { axiosClient } from "@/core/api/axios.client";
import { LoginInput } from "../schema/login.schema";

export const loginRequest = async (payload: LoginInput) => {
  const { data } = await axiosClient.post("/auth/login", payload);
  return data; // expects backend to return { token, user }
};
