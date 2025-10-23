"use client";

import { APIError } from "@/modules/profile/types/types";
import { useMutation } from "@tanstack/react-query";
import { cardTransactionsExport } from "./card-transactions.service";

export const useCardTransactionsMutations = (opts?: {
	onSuccess?: (data: any) => void;
	onError?: (err: APIError) => void;
}) => {

	const cardTransactionsExportMutation = useMutation({
		mutationFn: cardTransactionsExport,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err);
		},
	});

	return {
		cardTransactionsExportMutation,
	};
};
