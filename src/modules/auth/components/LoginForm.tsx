"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
	useAuthMutations,
	useRecoverPasswordMutation,
} from "../api/auth.mutations";
import { loginSchema } from "../schema/login.schema";
const DynamicRecoverPasswordModal = dynamic(
	() => import("@/modules/auth/components/recover-password-modal"),
	{ ssr: false }
);

export const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { username: "", password: "" },
	});
	const { theme } = useTheme();
	const loginMutation = useAuthMutations();
	const recoverPasswordMutation = useRecoverPasswordMutation({
		onSuccess: () => {
			setRecoveryUserName("");
			setOpenPasswordRecoverModal(false);
		},
	});
	const loading = loginMutation.isPending || recoverPasswordMutation.isPending;
	const [submitError, setSubmitError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [openPasswordRecoverModal, setOpenPasswordRecoverModal] =
		useState(false);
	const [recoveryUserName, setRecoveryUserName] = useState("");

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		loginMutation.mutate(values);
	};
	const onRecoverPass = () => {
		if (!recoveryUserName) {
			return toast.error("Нэвтрэх нэрээ оруулна уу.");
		}
		recoverPasswordMutation.mutate({ username: recoveryUserName });
	};

	return (
		<div>
			<Card className={`${theme === "dark" && "border"}`}>
				<Form {...form}>
					<form
						onChange={() => {
							if (submitError) setSubmitError("");
						}}
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full sm:justify-center sm:w-[400px] flex flex-col gap-6 relative p-4">
						<Image
							src={
								theme === "dark"
									? "/logo.svg"
									: "/logo-blue.svg"
							}
							alt="Qpay Logo"
							width={250}
							height={200}
							className="mx-auto"
							priority
						/>
						<FormField
							// disabled={loading}
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="username"
											placeholder="Нэвтрэх нэр"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							// disabled={loading}
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="Нууц үг"
											{...field}
										/>
									</FormControl>
									<FormMessage />
									<div
										className="absolute top-[45%] right-6"
										onClick={() =>
											setShowPassword((prev) => !prev)
										}>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</div>
								</FormItem>
							)}
						/>
						{submitError && (
							<FormMessage>{submitError}</FormMessage>
						)}
						<m.div whileTap={{ scale: 0.85 }}>
							<div className="">
								<Button
									type="submit"
									className="w-full p-6 bg-qpay-secondary dark:text-white "
									size="lg"
									disabled={loading}>
									{loading && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{!loading ? "Нэвтрэх" : "Нэвтэрч байна."}
								</Button>
							</div>
						</m.div>
						<div>
							<span
								className="text-qpay-secondary float-right hover:underline cursor-pointer dark:text-white"
								onClick={() =>
									setOpenPasswordRecoverModal(true)
								}>
								Нууц үг сэргээх
							</span>
						</div>
						<>
							<span className="text-center text-sm text-[#d9d9da]">
								v 0.3
							</span>
						</>
					</form>
				</Form>
				<DynamicRecoverPasswordModal
					open={openPasswordRecoverModal}
					close={setOpenPasswordRecoverModal}
					recoveryUserName={recoveryUserName}
					setRecoveryUserName={setRecoveryUserName}
					callback={onRecoverPass}
				/>
			</Card>
		</div>
	);
};
