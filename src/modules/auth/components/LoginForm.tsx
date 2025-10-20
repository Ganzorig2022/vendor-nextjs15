"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../schema/login.schema";
import { useLoginMutation } from "../api/auth.mutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export const LoginForm = () => {
	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { username: "", password: "" },
	});

	const loginMutation = useLoginMutation();

	const onSubmit = (values: LoginInput) => {
		loginMutation.mutate(values);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ type: "spring", duration: 0.7 }}
			className="flex justify-center items-center min-h-screen">
			<Card className="w-full max-w-md shadow-2xl border border-gray-200">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-semibold flex items-center justify-center gap-2">
						<LogIn className="h-5 w-5" /> Нэвтрэх
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имэйл</FormLabel>
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
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Нууц үг</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="********"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full mt-2"
								disabled={loginMutation.isPending}>
								{loginMutation.isPending
									? "Нэвтэрч байна..."
									: "Нэвтрэх"}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</motion.div>
	);
};
