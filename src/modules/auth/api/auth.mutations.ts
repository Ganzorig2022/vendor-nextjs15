"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginRequest, recoverPassword } from "./auth.service";
import { useAuthStore } from "../store/auth.store";
import { toast } from "sonner";

export const useAuthMutations = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data) => {
      const { access_token } = data;
      if (!access_token) return;

      setAuth({ access_token, user: data.user ?? null });

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token }),
        credentials: "include",
      });

      router.replace("/");
    },
  });
};

export const useRecoverPasswordMutation = (
  opts?: {
    onSuccess?: (data: any) => void;
    onError?: (err: unknown) => void;
  }
) => {
  return useMutation({
    mutationFn: recoverPassword,
    onSuccess: (data) => {
      toast.success(`Амжилттай солигдлоо. Та "${data.email}" хаягаар орно уу.`);
      opts?.onSuccess?.(data);
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Нууц үг сэргээхэд алдаа гарлаа.";
      toast.error(message);
      opts?.onError?.(err);
    },
  });
};