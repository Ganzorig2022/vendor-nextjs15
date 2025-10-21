import { axiosClientWithAuh } from "@/core/api/api.client";

export async function getDashboardData() {
const { data } = await axiosClientWithAuh.get("/dashboard");
  return data;
}
