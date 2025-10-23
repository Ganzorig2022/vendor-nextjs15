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

export const geCardTransactionReportList = async (
	payload: CardTransactionExcelListQuery
): Promise<any> => {
	const { page, limit, start_year } = payload;
	const { data } = await axiosClientWithAuh.post(
		`/card_transaction/excel?page=${page}&limit=${limit}&start_year=${start_year}`,
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
