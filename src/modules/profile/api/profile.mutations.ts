"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkPassword, resetPassword } from "./profile.service";
import { APIError } from "../types/types";

export const useCheckPasswordMutation = (opts?: {
	onSuccess?: (data: any) => void;
	onError?: (err: APIError) => void;
}) => {
	return useMutation<any, APIError, any>({
		mutationFn: checkPassword,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: APIError) => {
			opts?.onError?.(err); // "PASSWORD_BLOCKED" || "WRONG_PASSWORD"
		},
	});
};

export const usePasswordResetMutation = (opts?: {
	onSuccess?: (data: any) => void;
	onError?: (err: unknown) => void;
}) => {
	return useMutation({
		mutationFn: resetPassword,
		onSuccess: (data) => {
			opts?.onSuccess?.(data);
		},
		onError: (err: unknown) => {
			const message =
				err instanceof Error
					? err.message
					: "Нууц үг сэргээхэд алдаа гарлаа.";
			toast.error(message);
			opts?.onError?.(err);
		},
	});
};
