"use client";

import { IMerchantItem } from "@/modules/merchant/types/types";
import { create } from "zustand";
import { IUser } from "../types/type";

type AuthState = {
	token: string | null;
	clientName: string | null;
	processCode: string | null;
	user: IUser | null;
	merchant: IMerchantItem | null;
	setAuth: (data: {
		clientName: string;
		processCode: string;
		access_token: string;
		user: IUser;
		merchant: IMerchantItem;
	}) => void;
	logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	clientName: null,
	processCode: null,
	user: null,
	merchant: null,

	setAuth: (data) =>
		set({
			token: data.access_token,
			processCode: data.processCode,
			user: data.user,
			merchant: data.merchant,
		}),

	logout: async () => {
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			// Clear client state
			set({ token: null, user: null, merchant: null });
		} catch (error) {
			console.error("Logout failed:", error);
		}
	},
}));
