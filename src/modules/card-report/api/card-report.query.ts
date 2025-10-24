import { useQuery } from "@tanstack/react-query";
import { geCardTransactionReportList } from "./card-report.service";

export type DefaultPagesType  = {
	page: number,
	limit: number,
	reload: boolean,
	start_year: number,
};

export function useCardReportQuery(payload: DefaultPagesType) {
	return useQuery({
		queryKey: ["card-transactions:report", payload],
		queryFn: () => geCardTransactionReportList(payload),
	});
}
