import { axiosClientWithAuh } from "@/core/api/api.client";
import { INewDashboardData } from "../types/types";

export async function getDashboardData() {
	const { data } = await axiosClientWithAuh.get("/dashboard");
	return data;
}

export async function getNewDashboardData(): Promise<INewDashboardData> {
	const { data } = await axiosClientWithAuh.get("/dashboard/new");
	return data;
}
