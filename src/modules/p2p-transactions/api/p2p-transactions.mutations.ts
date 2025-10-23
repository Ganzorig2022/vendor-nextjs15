"use client";

import { APIError } from "@/modules/profile/types/types";
import { useMutation } from "@tanstack/react-query";
import { p2pTransactionsExport } from "./p2p-transactions.service";

export const useP2pTransactionsMutations = (opts?: {
	onSuccess?: (data: any) => void;
	onError?: (err: APIError) => void;
}) => {

	const p2pTransactionsExportMutation = useMutation({
		mutationFn: p2pTransactionsExport,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err);
		},
	});

	return {
		p2pTransactionsExportMutation,
	};
};
