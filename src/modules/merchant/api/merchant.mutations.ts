"use client";

import { useMutation } from "@tanstack/react-query";
import {
	merchantCompanyCreate,
	merchantCompanyUpdate,
	merchantPersonCreate,
	merchantPersonUpdate,
} from "./merchant.service";
import { APIError } from "@/modules/profile/types/types";

export const useMerchantMutations = (opts?: {
	onSuccess?: (data: any) => void;
	onError?: (err: APIError) => void;
}) => {
	const merchantCompanyCreateMutation = useMutation({
		mutationFn: merchantCompanyCreate,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err); //
		},
	});

	const merchantPersonCreateMutation = useMutation({
		mutationFn: merchantPersonCreate,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err); //
		},
	});

	const merchantCompanyUpdateMutation = useMutation({
		mutationFn: merchantCompanyUpdate,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err); //
		},
	});

	const merchantPersonUpdateMutation = useMutation({
		mutationFn: merchantPersonUpdate,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err); //
		},
	});

	return {
		merchantCompanyCreateMutation,
		merchantPersonCreateMutation,
		merchantCompanyUpdateMutation,
		merchantPersonUpdateMutation,
	};
};
