"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { merchantSchema, userSchema } from "../schema/profile.schema";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useRef, useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
const RecoverPasswordModal = dynamic(
	() => import("@/modules/profile/components/recover-password-modal"),
	{ ssr: false }
);

type MerchantFormData = z.infer<typeof merchantSchema>;
type UserFormData = z.infer<typeof userSchema>;

export function ProfileForm() {
	const { user, merchant } = useAuthStore((s) => s);
	const isCitizen: boolean = merchant?.owner_type === "CITIZEN";
	const toastShownRef = useRef(false);
	const [showModal, setShowModal] = useState(false);

	const merchantForm = useForm<MerchantFormData>({
		resolver: zodResolver(merchantSchema),
		defaultValues: {
			customerType: isCitizen ? "Иргэн" : "Байгууллага",
			merchantName: merchant?.customer_name ?? "",
			lastName: merchant?.owner_last_name ?? "",
			firstName: merchant?.owner_first_name ?? "",
			processCode: "GOLOMTBANK_VD00000030_1000029",
			quickQrName: "байхгүй",
			register: merchant?.owner_register_no ?? "",
		},
	});

	const userForm = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: user?.username ?? "",
			userLastName: user?.last_name ?? "",
			userFirstName: user?.first_name ?? "",
			position: user?.position ?? "",
			userRegister: user?.register ?? "",
			email: user?.email ?? "",
			phone: user?.phone ?? "",
		},
	});

	const onShowResetPasswordModal = () => {
		// * only show once
		if (!toastShownRef.current) {
			toast.warning(
				`Та хуучин нууц үгээ 3н удаа буруу оруулсан тохилдолд блоклогдох болно.`
			);
			toastShownRef.current = true; // lock it
		}

		setShowModal(true);
	};

	return (
		<div className="min-h-screen p-4 md:p-8">
			<div className="mx-auto ">
				<div className="grid gap-6 lg:grid-cols-2">
					{/* Merchant Information Card */}
					<div className="flex">
						<Card className="border-border shadow-sm flex-1">
							<CardHeader className="border-b border-border bg-card">
								<CardTitle className="text-xl font-semibold text-card-foreground">
									Мерчантын мэдээлэл
								</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<form className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<div className="space-y-2">
											<Label
												htmlFor="customerType"
												className="text-xs font-medium text-foreground">
												Харилцагчийн төрөл
											</Label>
											<Input
												id="customerType"
												{...merchantForm.register(
													"customerType"
												)}
												className="bg-background"
												disabled
											/>
											{merchantForm.formState.errors
												.customerType && (
												<p className="text-xs text-destructive">
													{
														merchantForm.formState
															.errors.customerType
															.message
													}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="merchantName"
												className="text-xs font-medium text-foreground">
												Мерчантын нэр
											</Label>
											<Input
												id="merchantName"
												{...merchantForm.register(
													"merchantName"
												)}
												className="bg-background"
												disabled
											/>
											{merchantForm.formState.errors
												.merchantName && (
												<p className="text-xs text-destructive">
													{
														merchantForm.formState
															.errors.merchantName
															.message
													}
												</p>
											)}
										</div>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<div className="space-y-2">
											<Label
												htmlFor="lastName"
												className="text-xs font-medium text-foreground">
												Овог
											</Label>
											<Input
												id="lastName"
												{...merchantForm.register(
													"lastName"
												)}
												className="bg-background"
												disabled
											/>
											{merchantForm.formState.errors
												.lastName && (
												<p className="text-xs text-destructive">
													{
														merchantForm.formState
															.errors.lastName
															.message
													}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="processCode"
												className="text-xs font-medium text-foreground">
												Процесс код
											</Label>
											<Input
												id="processCode"
												{...merchantForm.register(
													"processCode"
												)}
												className="bg-background"
												disabled
											/>
											{merchantForm.formState.errors
												.processCode && (
												<p className="text-xs text-destructive">
													{
														merchantForm.formState
															.errors.processCode
															.message
													}
												</p>
											)}
										</div>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<div className="space-y-2">
											<Label
												htmlFor="firstName"
												className="text-xs font-medium text-foreground">
												Нэр
											</Label>
											<Input
												id="firstName"
												{...merchantForm.register(
													"firstName"
												)}
												className="bg-background"
												disabled
											/>
											{merchantForm.formState.errors
												.firstName && (
												<p className="text-xs text-destructive">
													{
														merchantForm.formState
															.errors.firstName
															.message
													}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="quickQrName"
												className="text-xs font-medium text-foreground">
												Quick Qr Клейнт нэр
											</Label>
											<Input
												id="quickQrName"
												{...merchantForm.register(
													"quickQrName"
												)}
												className="bg-background"
												disabled
											/>
											{merchantForm.formState.errors
												.quickQrName && (
												<p className="text-xs text-destructive">
													{
														merchantForm.formState
															.errors.quickQrName
															.message
													}
												</p>
											)}
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="register"
											className="text-xs font-medium text-foreground">
											Регистр
										</Label>
										<Input
											id="register"
											{...merchantForm.register(
												"register"
											)}
											className="bg-background"
											disabled
										/>
										{merchantForm.formState.errors
											.register && (
											<p className="text-xs text-destructive">
												{
													merchantForm.formState
														.errors.register.message
												}
											</p>
										)}
									</div>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* User Information Card */}
					<div className="flex">
						<Card className="border-border shadow-sm flex-1">
							<CardHeader className="border-b border-border bg-card">
								<CardTitle className="text-xl font-semibold text-card-foreground">
									Хэрэглэгчийн мэдээлэл
								</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<form className="space-y-5">
									<div className="grid gap-5 sm:grid-cols-2">
										<div className="space-y-2">
											<Label
												htmlFor="username"
												className="text-xs font-medium text-foreground">
												Нэвтрэх нэр
											</Label>
											<Input
												id="username"
												{...userForm.register(
													"username"
												)}
												className="bg-background"
												disabled
											/>
											{userForm.formState.errors
												.username && (
												<p className="text-xs text-destructive">
													{
														userForm.formState
															.errors.username
															.message
													}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="userLastName"
												className="text-xs font-medium text-foreground">
												Овог
											</Label>
											<Input
												id="userLastName"
												{...userForm.register(
													"userLastName"
												)}
												className="bg-background"
												disabled
											/>
											{userForm.formState.errors
												.userLastName && (
												<p className="text-xs text-destructive">
													{
														userForm.formState
															.errors.userLastName
															.message
													}
												</p>
											)}
										</div>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<div className="space-y-2">
											<Label
												htmlFor="position"
												className="text-xs font-medium text-foreground">
												Албан тушаал
											</Label>
											<Input
												id="position"
												{...userForm.register(
													"position"
												)}
												className="bg-background"
												disabled
											/>
											{userForm.formState.errors
												.position && (
												<p className="text-xs text-destructive">
													{
														userForm.formState
															.errors.position
															.message
													}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="userFirstName"
												className="text-xs font-medium text-foreground">
												Нэр
											</Label>
											<Input
												id="userFirstName"
												{...userForm.register(
													"userFirstName"
												)}
												className="bg-background"
												disabled
											/>
											{userForm.formState.errors
												.userFirstName && (
												<p className="text-xs text-destructive">
													{
														userForm.formState
															.errors
															.userFirstName
															.message
													}
												</p>
											)}
										</div>
									</div>

									<div className="grid gap-5 sm:grid-cols-2">
										<div className="space-y-2">
											<Label
												htmlFor="userRegister"
												className="text-xs font-medium text-foreground">
												Регистр
											</Label>
											<Input
												id="userRegister"
												{...userForm.register(
													"userRegister"
												)}
												className="bg-background"
												disabled
											/>
											{userForm.formState.errors
												.userRegister && (
												<p className="text-xs text-destructive">
													{
														userForm.formState
															.errors.userRegister
															.message
													}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<Label
												htmlFor="email"
												className="text-xs font-medium text-foreground">
												Цахим хаяг
											</Label>
											<Input
												id="email"
												type="email"
												{...userForm.register("email")}
												className="bg-background"
												disabled
											/>
											{userForm.formState.errors
												.email && (
												<p className="text-xs text-destructive">
													{
														userForm.formState
															.errors.email
															.message
													}
												</p>
											)}
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="phone"
											className="text-xs font-medium text-foreground">
											Утас
										</Label>
										<Input
											id="phone"
											{...userForm.register("phone")}
											className="bg-background"
											disabled
										/>
										{userForm.formState.errors.phone && (
											<p className="text-xs text-destructive">
												{
													userForm.formState.errors
														.phone.message
												}
											</p>
										)}
									</div>
								</form>
								<div className="flex justify-end pt-4">
									<Button
										onClick={onShowResetPasswordModal}
										variant="info"
										size="sm"
										className="gap-2">
										<KeyRound className="h-4 w-4" />
										Нууц үг солих
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<RecoverPasswordModal
				open={showModal}
				close={setShowModal}
			/>
		</div>
	);
}
