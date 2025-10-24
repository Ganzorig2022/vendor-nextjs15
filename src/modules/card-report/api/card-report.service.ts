import { axiosClientWithAuh } from "@/core/api/api.client";
import { DefaultPagesType } from "./card-report.query";
import { IDate, IReportMonthlyExcels } from "../types/type";
import { axiosClient } from "@/core/api/axios.client";
import { AxiosProgressEvent } from "axios";

export const geCardTransactionReportList = async (
	payload: DefaultPagesType
): Promise<IReportMonthlyExcels[]> => {
	const { page, limit, start_year } = payload;
	const { data } = await axiosClientWithAuh.get(
		`/card_transaction/excel?page=${page}&limit=${limit}&start_year=${start_year}`
	);
	return data;
};

export function calculateExcel(
	type: "Card" | "P2pTransaction",
	date: IDate
): Promise<any> {
	const url = `${type === "Card" ? "card_transaction" : "p2p_transaction"}`;
	return axiosClientWithAuh.post(
		`/${url}/report_monthly/update`,
		{
			date: date,
		},
		{
			headers: {
				Authorization: `Basic ZXRsX2dlbmVyYXRvcjokcXBheTcwMjI=`,
			},
		}
	);
}

interface DownloadExcelOptions {
	onProgress?: (percentage: number) => void;
	silent?: boolean;
}

export async function downloadExcel(
	filePath: string,
	options: DownloadExcelOptions = {}
): Promise<Blob> {
	const { onProgress, silent = false } = options;

	// const url = `${process.env.NEXT_PUBLIC_QPAY_ETL_URL}/api/file`;
	const url = 'https://g3.qpay.mn/api/file'
	try {
		const response = await axiosClient.post(
			url,
			{ path: filePath },
			{
				responseType: "blob",
				headers: {
					Authorization: `Basic ZXRsX2dlbmVyYXRvcjokcXBheTcwMjI=`,
					"Content-Type": "application/json",
				},
				onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
					if (!progressEvent.total) return;
					const percent = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					onProgress?.(percent);
				},
			}
		);

		return response.data as Blob;
	} catch (error: any) {
		// 🚨 If silent mode, manually show toast error
		if (silent && typeof window !== "undefined") {
			import("sonner").then(({ toast }) => {
				toast.error(
					error.response?.data?.message || "Файл татаж чадсангүй."
				);
			});
		}
		console.error("❌ Excel download failed:", error);
		throw error;
	}
}
