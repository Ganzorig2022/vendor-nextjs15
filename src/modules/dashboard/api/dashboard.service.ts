import { axiosClient } from "@/core/api/axios.client";

export async function getDashboardData() {
const { data } = await axiosClient.get("/dashboard");
  return data;
}
