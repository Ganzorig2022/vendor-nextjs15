import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
	CardTransactionExcelListQuery,
	CardTransactionQuery,
	CardTransactionResponse,
} from "../types/type";
import {
	geCardTransactionReportList,
	getCardTransactionList,
} from "./card-transactions.service";

type MerchantQueryType =
	| { type: "list"; query: CardTransactionQuery }
	| { type: "report"; query: CardTransactionExcelListQuery };

// Overload signatures 👇
export function useCardTransactionsQuery(config: {
	type: "list";
	query: CardTransactionQuery;
}): UseQueryResult<CardTransactionResponse>;
export function useCardTransactionsQuery(config: {
	type: "report";
	query: CardTransactionExcelListQuery;
}): UseQueryResult<CardTransactionResponse>;

// Implementation 👇
export function useCardTransactionsQuery(config: MerchantQueryType) {
	switch (config.type) {
		case "list":
			return useQuery({
				queryKey: ["card-transactions:list", config.query],
				queryFn: () => getCardTransactionList(config.query),
			});

		case "report":
			return useQuery({
				queryKey: ["card-transactions:report", config.query],
				queryFn: () => geCardTransactionReportList(config.query),
			});

		default:
			throw new Error(
				"Unsupported query type for useCardTransactionsQuery"
			);
	}
}
