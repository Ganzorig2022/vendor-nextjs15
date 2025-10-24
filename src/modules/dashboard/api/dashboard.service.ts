import { axiosClientWithAuh } from "@/core/api/api.client";
import { INewDashboardData } from "../types/types";
import { rangeQueryType } from "@/app/(protected)/page";

export async function getDashboardData() {
	const { data } = await axiosClientWithAuh.get("/dashboard");
	return data;
}

export async function getNewDashboardData(
	range_type: rangeQueryType
): Promise<INewDashboardData> {
	const { data } = await axiosClientWithAuh.post("/dashboard/new", range_type);
	return data;
}
