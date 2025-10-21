"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/core/constants/routes";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordChecklist from "react-password-checklist";
import { toast } from "sonner";
import { z } from "zod";
import {
	useCheckPasswordMutation,
	usePasswordResetMutation,
} from "../api/profile.mutations";
import { recoverPassSchema } from "../schema/profile.schema";
import { APIError } from "../types/types";
type RecoverPasswordModalProps = {
	open: boolean;
	close: Dispatch<SetStateAction<boolean>>;
};

const inputFields = [
	{
		name: "oldPassword",
		label: "Хуучин нууц үг",
		placeholder: "Хуучин нууц үгээ оруулна уу",
		maxLength: 30,
		disableOnBlur: false,
	},
	{
		name: "newPassword",
		label: "Шинэ нууц үг",
		placeholder: "Шинэ нууц үгээ оруулна уу",
		maxLength: 30,
		disableOnBlur: true,
	},
	{
		name: "confirmPassword",
		label: "Шинэ нууц үгээ баталгаажуулна уу",
		placeholder: "Дахин нууц үгээ оруулна уу",
		maxLength: 30,
		disableOnBlur: true,
	},
];

type RecoverPassFormData = z.infer<typeof recoverPassSchema>;

const RecoverPasswordModal = ({ open, close }: RecoverPasswordModalProps) => {
	const { user, logout } = useAuthStore((s) => s);
	const { replace } = useRouter();

	const goToLogin = async () => {
		close(false);
		await logout();
		replace(ROUTES.auth.login);
	};

	const checkPassword = useCheckPasswordMutation({
		onSuccess: () => {
			toast.success(`Хуучин нууц үг зөв байна.`);
		},
		onError: (err: APIError) => {
			if (err?.code === "PASSWORD_BLOCKED") return goToLogin();
			close(false);
		},
	});

	const passwordResetMutation = usePasswordResetMutation({
		onSuccess: (data) => {
			toast.success(
				`Амжилттай солигдлоо. Та "${data.email_masked}" хаягаар орно уу.`
			);
			goToLogin();
		},
	});
	const loading = checkPassword.isPending || passwordResetMutation.isPending;
	const formId = "recoverPassForm";
	const [isPasswordValid, setIsPasswordValid] = useState(false);

	const recoverPassForm = useForm<RecoverPassFormData>({
		resolver: zodResolver(recoverPassSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const inputName = e.target.name;

		if (value === "") return;
		// * Зөвхөн хуучин нууц үг таарч байгаа эсэхийг шалгах...
		if (inputName === "oldPassword" && value !== "")
			onCheckOldPassword(value);
	};

	const onCheckOldPassword = (oldPassword: string) => {
		checkPassword.mutate({
			password: oldPassword,
			user_id: user.id,
		});
	};

	const password = recoverPassForm.watch("newPassword") || "";
	const confirmPassword = recoverPassForm.watch("confirmPassword") || "";

	const onSubmit = (values: z.infer<typeof recoverPassSchema>) => {
		if (!isPasswordValid) {
			console.warn("❌ Password not valid according to checklist");
			return;
		}
		passwordResetMutation.mutate({
			username: user.username,
			password: confirmPassword,
			user_id: user.id,
		});
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(state: boolean) => {
				close(state);
			}}>
			<DialogContent className="min-w-[300px]">
				<DialogHeader>
					<DialogTitle className="mb-2 border-b-2 pb-2">
						Нууц үг сэргээх
					</DialogTitle>
					<DialogDescription className="bg-merchant/70 px-5 py-2 rounded-md text-white">
						*Бүртгэлтэй цахим шуудан руу нууц үг илгээгдэх болно.
					</DialogDescription>
				</DialogHeader>
				<Form {...recoverPassForm}>
					<form
						id={formId}
						onSubmit={recoverPassForm.handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-6 relative px-4">
						{inputFields.map((item) => (
							<Controller
								key={item.name}
								// @ts-ignore
								name={item.name}
								control={recoverPassForm.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={item.name}>
											{item.label}
										</FieldLabel>
										<Input
											{...field}
											id={item.name}
											aria-invalid={fieldState.invalid}
											placeholder={item.placeholder}
											maxLength={item.maxLength}
											onBlur={handleOnBlur}
											type="password"
											autoComplete="new-password"
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						))}
					</form>
				</Form>
				{/* ✅ Password Checklist — Real Validation */}
				<div style={{ marginTop: 40, marginBottom: 40 }}>
					<PasswordChecklist
						rules={[
							"minLength",
							"specialChar",
							"number",
							"capital",
							"match",
						]}
						minLength={8}
						value={password}
						valueAgain={confirmPassword}
						messages={{
							minLength: "7-с дээш урттай байх",
							specialChar: "Тусгай тэмдэгт орсон байх",
							number: "Тоо орсон байх",
							capital: "Том үсэг орсон байх",
							match: "Давтан нууц үг таарсан байх",
						}}
						onChange={(isValid) => setIsPasswordValid(isValid)}
					/>
				</div>
				<DialogFooter>
					<DialogClose>
						<Button
							type="button"
							size="sm"
							onClick={() => recoverPassForm.reset()}
							variant="clear_search">
							Болих
						</Button>
					</DialogClose>
					<Field orientation="horizontal">
						<Button
							size="sm"
							className="ml-auto"
							disabled={loading}
							variant="info"
							type="submit"
							form={formId}>
							{loading && <Spinner className="mr-2" />}
							{!loading ? "Сэргээх" : "Сэргээж байна..."}
						</Button>
					</Field>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default RecoverPasswordModal;
