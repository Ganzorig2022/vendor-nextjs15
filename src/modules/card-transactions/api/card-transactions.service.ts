import { axiosClientWithAuh } from "@/core/api/api.client";
import {
	CardTransactionExcelListQuery,
	CardTransactionExportResponse,
	CardTransactionQuery,
	CardTransactionResponse,
} from "../types/type";

export const getCardTransactionList = async (
	payload: CardTransactionQuery
): Promise<CardTransactionResponse> => {
	const { data } = await axiosClientWithAuh.post(
		"/card_transaction/report",
		payload
	);
	return data;
};

export const cardTransactionsExport = async (
	payload: CardTransactionQuery
): Promise<CardTransactionExportResponse> => {
	const { data } = await axiosClientWithAuh.post(
		"/card_transaction/export",
		payload
	);
	return data;
};
