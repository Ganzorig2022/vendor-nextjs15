"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	CompanyMerchantFormType,
	companyMerchantSchema,
	MerchantType,
	PersonMerchantFormType,
	personMerchantSchema,
} from "../schema/merchant.schema";

import {
	PERSON_FIELD_LABELS,
	ORGANIZATION_FIELD_LABELS,
} from "../schema/merchant.schema";
import { useMerchantMutations } from "../api/merchant.mutations";
import useMainStore from "@/modules/general/store/use-main-store";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
type Props = {
	open: boolean;
	close: React.Dispatch<React.SetStateAction<boolean>>;
	callback: () => void;
};

export default function MerchantCreateModal({ open, close, callback }: Props) {
	const { generalData } = useMainStore((s) => s);
	const MCC_ARRAY = generalData?.mccs?.map((item) => ({
		label: item.name_mon,
		value: item.mcc_code,
	}));
	const DISTRICT_ARRAY = generalData?.districts?.map((item) => ({
		label: item.name,
		value: item.code,
	}));
	const CITY_ARRAY = generalData?.cities?.map((item) => ({
		label: item.name,
		value: item.code,
	}));

	const [merchantType, setMerchantType] = useState<MerchantType>("PERSON");
	const { merchantCompanyCreateMutation, merchantPersonCreateMutation } =
		useMerchantMutations({
			onSuccess: () => {
				close(false);
				toast.success("Амжилттай хадгалагдлаа.");
        callback()
			},
			onError: () => {
				close(false);
			},
		});
	const loading =
		merchantCompanyCreateMutation.isPending ||
		merchantPersonCreateMutation.isPending;

	const schema =
		merchantType === "ORGANIZATION"
			? companyMerchantSchema
			: personMerchantSchema;

	const fieldLabels =
		merchantType === "ORGANIZATION"
			? ORGANIZATION_FIELD_LABELS
			: PERSON_FIELD_LABELS;

	const form = useForm<CompanyMerchantFormType | PersonMerchantFormType>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
	});

	const onSubmit = (
		values: CompanyMerchantFormType | PersonMerchantFormType
	) => {
		console.log("✅ Submitted:", merchantType, values);

		const service =
			merchantType === "PERSON"
				? merchantPersonCreateMutation
				: merchantCompanyCreateMutation;

		service.mutate(values);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={close}>
			<DialogContent className="min-w-[600px]">
				<DialogHeader>
					<DialogTitle className="border-b pb-2">
						Мерчант бүртгэх
					</DialogTitle>
				</DialogHeader>

				{/* 👇 Merchant Type Toggle */}
				<div className="flex gap-2 my-4">
					<Button
						variant={merchantType === "PERSON" ? "info" : "outline"}
						size="sm"
						onClick={() => setMerchantType("PERSON")}>
						Хувь хүн
					</Button>
					<Button
						variant={
							merchantType === "ORGANIZATION" ? "info" : "outline"
						}
						size="sm"
						onClick={() => setMerchantType("ORGANIZATION")}>
						Байгууллага
					</Button>
				</div>

				<Form {...form}>
					<form
						id="merchantForm"
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
						{Object.keys(schema.shape).map((key) => {
							const label = fieldLabels[key] || key;
							const isSelectField = [
								"mcc_code",
								"city",
								"district",
							].includes(key);

							return (
								<Controller
									key={key}
									name={key as any}
									control={form.control}
									render={({ field, fieldState }) => (
										<Field
											data-invalid={fieldState.invalid}>
											<FieldLabel
												htmlFor={key}
												className="text-[13px]">
												{label}
											</FieldLabel>
											{key === "mcc_code" && (
												<Select
													value={field.value ?? ""}
													onValueChange={(val) =>
														field.onChange(val)
													} // ✅ fix
												>
													<SelectTrigger
														className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
														size="sm"
														aria-label="Select a value">
														<SelectValue
															placeholder={`${label} сонгоно уу`}
														/>
													</SelectTrigger>
													<SelectContent className="rounded-xl">
														{MCC_ARRAY.map(
															(mcc) => (
																<SelectItem
																	key={
																		mcc.value
																	}
																	value={
																		mcc.value
																	}
																	className="rounded-lg">
																	{mcc.label}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											)}
											{key === "district" && (
												<Select
													value={field.value ?? ""}
													onValueChange={(val) =>
														field.onChange(val)
													} // ✅ fix
												>
													<SelectTrigger
														className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
														size="sm"
														aria-label="Select a value">
														<SelectValue
															placeholder={`${label} сонгоно уу`}
														/>
													</SelectTrigger>
													<SelectContent className="rounded-xl">
														{DISTRICT_ARRAY.map(
															(dist) => (
																<SelectItem
																	key={
																		dist.value
																	}
																	value={
																		dist.value
																	}
																	className="rounded-lg">
																	{dist.label}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											)}
											{key === "city" && (
												<Select
													value={field.value ?? ""}
													onValueChange={(val) =>
														field.onChange(val)
													} // ✅ fix
												>
													<SelectTrigger
														className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
														size="sm"
														aria-label="Select a value">
														<SelectValue
															placeholder={`${label} сонгоно уу`}
														/>
													</SelectTrigger>
													<SelectContent className="rounded-xl">
														{CITY_ARRAY.map(
															(city) => (
																<SelectItem
																	key={
																		city.value
																	}
																	value={
																		city.value
																	}
																	className="rounded-lg">
																	{city.label}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											)}
											{!isSelectField && (
												<>
													<Input
														{...field}
														id={key}
														value={
															field.value ?? ""
														}
														aria-invalid={
															fieldState.invalid
														}
														placeholder={`${label} оруулна уу`}
														className="text-[12px]"
													/>
													{fieldState.invalid && (
														<FieldError
															errors={[
																fieldState.error,
															]}
														/>
													)}
												</>
											)}
										</Field>
									)}
								/>
							);
						})}
					</form>
				</Form>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="clear_search"
							disabled={loading}>
							Болих
						</Button>
					</DialogClose>
					<Button
						size="sm"
						variant="info"
						type="submit"
						form="merchantForm"
						disabled={loading}>
						{loading && <Spinner className="mr-2" />}
						{!loading ? "Хадгалах" : "Хадгалж байна..."}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
