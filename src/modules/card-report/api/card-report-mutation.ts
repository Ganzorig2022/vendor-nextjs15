import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { calculateExcel, downloadExcel } from "./card-report.service";
import { IDate } from "../types/type";

export function useCalculateExcelMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			type,
			date,
		}: {
			type: "Card" | "P2pTransaction";
			date: IDate;
		}) => calculateExcel(type, date),

		onMutate: () => {
			toast.info("Дахин тооцоолж байна...");
		},

		onSuccess: () => {
			toast.success("Амжилттай тооцооллоо ✅");
			// Optional: refetch the table data after recalculation
			queryClient.invalidateQueries({
				queryKey: ["card-transactions:report"],
			});
		},

		onError: (error: any) => {
			console.error(error);
			toast.error("Тооцоолох явцад алдаа гарлаа ❌");
		},
	});
}

interface DownloadExcelInput {
	filePath: string;
	fileName?: string;
}

export function useDownloadExcelMutation() {
	return useMutation({
		mutationFn: async ({ filePath }: DownloadExcelInput) => {
			return await new Promise<Blob>((resolve, reject) => {
				let current = 0;
				const updateToast = toast.loading("Файл татаж байна... 0 %", {
					id: "download-progress",
				});

				downloadExcel(filePath, {
					onProgress: (p) => {
						current = p;
						toast.loading(`Файл татаж байна... ${p}%`, {
							id: "download-progress",
						});
					},
				})
					.then((blob) => {
						toast.dismiss("download-progress");
						resolve(blob);
					})
					.catch((err) => {
						toast.dismiss("download-progress");
						reject(err);
					});
			});
		},

		onSuccess: (blob, variables) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = variables.fileName || "report.xlsx";
			a.click();
			window.URL.revokeObjectURL(url);
			toast.success("Файл амжилттай татагдлаа 📊");
		},

		onError: () => {
			toast.error("Файл татаж чадсангүй.");
		},
	});
}
