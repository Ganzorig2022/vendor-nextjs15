import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export function useDashboardQuery() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
}
