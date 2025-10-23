import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
	P2PTransactionExcel,
	P2PTransactionListQuery,
	P2PTransactionResponse,
} from "../types/type";
import {
	getP2pTransactionList,
	getP2pTransactionReportList
} from "./p2p-transactions.service";

type p2pQueryType =
	| { type: "list"; query: P2PTransactionListQuery }
	| { type: "report"; query: P2PTransactionExcel };

// Overload signatures 👇
export function useP2pTransactionsQuery(config: {
	type: "list";
	query: P2PTransactionListQuery;
}): UseQueryResult<P2PTransactionResponse>;
export function useP2pTransactionsQuery(config: {
	type: "report";
	query: P2PTransactionExcel;
}): UseQueryResult<P2PTransactionResponse>;

// Implementation 👇
export function useP2pTransactionsQuery(config: p2pQueryType) {
	switch (config.type) {
		case "list":
			return useQuery({
				queryKey: ["p2p-transactions:list", config.query],
				queryFn: () => getP2pTransactionList(config.query),
			});

		case "report":
			return useQuery({
				queryKey: ["p2p-transactions:report", config.query],
				queryFn: () => getP2pTransactionReportList(config.query),
			});

		default:
			throw new Error(
				"Unsupported query type for useP2pTransactionsQuery"
			);
	}
}
