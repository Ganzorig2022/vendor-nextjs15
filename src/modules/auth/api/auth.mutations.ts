"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginRequest } from "./auth.service";
import { useAuthStore } from "../store/auth.store";

export const useLoginMutation = () => {
	const router = useRouter();
	const { setAuth } = useAuthStore();

	return useMutation({
		mutationFn: loginRequest, // calls backend /auth/login
		onSuccess: async (data) => {
			// 1️⃣  Extract access_token from backend response
			const { access_token } = data;
			if (!access_token) {
				console.error("No access_token in response");
				return;
			}

			// 2️⃣  Save to Zustand (optional for UI state)
			setAuth({ access_token: access_token, user: data.user ?? null });

			// 3️⃣  Ask Next.js route handler to store it securely
			const response = await fetch("/api/auth/session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ access_token }),
				credentials: "include",
			});

			if (!response.ok) {
				console.error("Failed to set access_token cookie");
				return;
			}

			// 4️⃣  Redirect after cookie is set
			router.replace("/");
		},
		onError: (err: unknown) => {
			const message = err instanceof Error ? err.message : "Login failed";
			console.error(message);
		},
	});
};
