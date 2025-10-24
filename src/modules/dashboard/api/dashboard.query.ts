import { rangeQueryType } from "@/app/(protected)/page";
import { useQuery } from "@tanstack/react-query";
import { getNewDashboardData } from "./dashboard.service";

export function useDashboardQuery(range_type: rangeQueryType) {
	return useQuery({
		queryKey: ["dashboardData", range_type],
		queryFn: () => getNewDashboardData(range_type),
		staleTime: 1000 * 60 * 5,
	});
}
