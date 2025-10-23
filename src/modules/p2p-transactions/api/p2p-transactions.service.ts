import { axiosClientWithAuh } from "@/core/api/api.client";
import {
	ITransactionReportWithDaily,
	P2PTransactionExcel,
	P2pTransactionExportResponse,
	P2PTransactionListQuery,
	P2PTransactionResponse,
} from "../types/type";

export const getP2pTransactionList = async (
	payload: P2PTransactionListQuery
): Promise<P2PTransactionResponse> => {
	const { data } = await axiosClientWithAuh.post(
		"/p2p_transaction/report",
		payload
	);
	return data;
};

export const getP2pTransactionReportList = async (
	payload: P2PTransactionExcel
): Promise<ITransactionReportWithDaily[]> => {
	const { page, limit, start_year } = payload;
	const { data } = await axiosClientWithAuh.post(
		`/p2p_transaction/excel?page=${page}&limit=${limit}&start_year=${start_year}`,
		payload
	);
	return data;
};

export const p2pTransactionsExport = async (
	payload: P2PTransactionListQuery
): Promise<P2pTransactionExportResponse> => {
	const { data } = await axiosClientWithAuh.post(
		"/p2p_transaction/export",
		payload
	);
	return data;
};
