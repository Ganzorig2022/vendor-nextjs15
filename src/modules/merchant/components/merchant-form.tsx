"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import {
	CompanyMerchantFormType,
	companyMerchantSchema,
	MerchantType,
	PersonMerchantFormType,
	personMerchantSchema,
} from "../schema/merchant.schema";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGeneralData } from "@/hooks/use-general-data";
import { useEffect } from "react";
import {
	ORGANIZATION_FIELD_LABELS,
	PERSON_FIELD_LABELS,
} from "../schema/merchant.schema";
import { IMerchantDetail } from "../types/types";

type Props = {
	merchantType: MerchantType;
	onSubmit: (
		values: CompanyMerchantFormType | PersonMerchantFormType
	) => void;
	data?: IMerchantDetail;
	className?: string;
	disabled?: boolean;
};

const MerchantForm = (props: Props) => {
	const { merchantType, onSubmit, data, className, disabled = false } = props;
	const { MCC_ARRAY, CITY_ARRAY, DISTRICT_ARRAY, BUSINESS_DIRECTIONS_ARRAY } = useGeneralData();

	const isCompany = merchantType === "COMPANY";
	const schema = isCompany ? companyMerchantSchema : personMerchantSchema;

	const defaultValues = isCompany
		? {
				owner_first_name: data?.owner_first_name ?? "",
				owner_last_name: data?.owner_last_name ?? "",
				owner_register_no: data?.owner_register_no ?? "",
				register_number: data?.company_register_number ?? "",
				business_direction_id: data?.g_business_direction_id ?? "",
				company_name: data?.customer.company_name ?? "",
				name: data?.customer.business_name_mon ?? "",
				name_eng: data?.customer.business_name_eng ?? "",
				mcc_code: data?.mcc_code ?? "",
				city: data?.city ?? "",
				district: data?.district ?? "",
				address: data?.address ?? "",
				phone: data?.phone ?? "",
				email: data?.email ?? "",
				location_lat: data?.location_lat ?? "",
				location_lng: data?.location_lng ?? "",
				max_qr_account_count: data?.max_qr_account_count
					? String(data.max_qr_account_count)
					: "",
			}
		: {
				first_name: data?.owner_first_name ?? "",
				last_name: data?.owner_last_name ?? "",
				register_number: data?.owner_register_no ?? "",
				business_name: data?.customer.business_name_mon ?? "",
				business_name_eng: data?.customer.business_name_eng ?? "",
				mcc_code: data?.mcc_code ?? "",
				city: data?.city ?? "",
				district: data?.district ?? "",
				address: data?.address ?? "",
				phone: data?.phone ?? "",
				email: data?.email ?? "",
				business_direction_id: data?.g_business_direction_id ?? "",
			};

	const fieldLabels = isCompany
		? ORGANIZATION_FIELD_LABELS
		: PERSON_FIELD_LABELS;

	const form = useForm<CompanyMerchantFormType | PersonMerchantFormType>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		defaultValues: defaultValues,
	});

	useEffect(() => {
		form.reset(defaultValues);
	}, [data, merchantType]);

	return (
		<Form {...form}>
			<form
				id="merchantForm"
				onSubmit={form.handleSubmit(onSubmit)}
				className={clsx(
					"",
					className // ✅ merge here or on wrapper above
				)}>
				{Object.keys(schema.shape).map((key) => {
					const label = fieldLabels[key] || key;
					const isSelectField = [
						"mcc_code",
						"city",
						"district",
						"business_direction_id",
					].includes(key);

					return (
						<Controller
							key={key}
							name={key as any}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										htmlFor={key}
										className="text-[13px]">
										{label}
									</FieldLabel>
									{key === "mcc_code" && (
										<Select
											disabled={disabled}
											value={field.value ?? ""}
											onValueChange={(val) =>
												field.onChange(val)
											}>
											<SelectTrigger
												className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
												size="sm"
												aria-label="Select a value">
												<SelectValue
													placeholder={`${label} сонгоно уу`}
												/>
											</SelectTrigger>
											<SelectContent className="rounded-xl">
												{MCC_ARRAY.map((mcc) => (
													<SelectItem
														key={mcc.value}
														value={mcc.value}
														className="rounded-lg">
														{mcc.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									{key === "district" && (
										<Select
											disabled={disabled}
											value={field.value ?? ""}
											onValueChange={(val) =>
												field.onChange(val)
											}>
											<SelectTrigger
												className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
												size="sm"
												aria-label="Select a value">
												<SelectValue
													placeholder={`${label} сонгоно уу`}
												/>
											</SelectTrigger>
											<SelectContent className="rounded-xl">
												{DISTRICT_ARRAY.map((dist) => (
													<SelectItem
														key={dist.value}
														value={dist.value}
														className="rounded-lg">
														{dist.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									{key === "city" && (
										<Select
											disabled={disabled}
											value={field.value ?? ""}
											onValueChange={(val) =>
												field.onChange(val)
											}>
											<SelectTrigger
												className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
												size="sm"
												aria-label="Select a value">
												<SelectValue
													placeholder={`${label} сонгоно уу`}
												/>
											</SelectTrigger>
											<SelectContent className="rounded-xl">
												{CITY_ARRAY.map((city) => (
													<SelectItem
														key={city.value}
														value={city.value}
														className="rounded-lg">
														{city.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									{key === "business_direction_id" && (
										<Select
											disabled={disabled}
											value={field.value ?? ""}
											onValueChange={(val) =>
												field.onChange(val)
											}>
											<SelectTrigger
												className="flex w-10 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[400px]/card:hidden"
												size="sm"
												aria-label="Select a value">
												<SelectValue
													placeholder={`${label} сонгоно уу`}
												/>
											</SelectTrigger>
											<SelectContent className="rounded-xl">
												{BUSINESS_DIRECTIONS_ARRAY.map((business) => (
													<SelectItem
														key={business.value}
														value={business.value}
														className="rounded-lg">
														{business.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									{!isSelectField && (
										<>
											<Input
												{...field}
												disabled={disabled}
												id={key}
												value={field.value ?? ""}
												aria-invalid={
													fieldState.invalid
												}
												placeholder={`${label} оруулна уу`}
												className="text-[12px]"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
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
	);
};

export default MerchantForm;
