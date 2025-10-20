import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard.service";

export function useDashboardQuery() {

  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5,
  });
}
