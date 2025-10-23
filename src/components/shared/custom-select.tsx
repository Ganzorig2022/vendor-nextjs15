"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IMerchantListQuery } from "@/modules/merchant/types/types";
import { useEffect, useState } from "react";

/** Generic type so it can accept any dataset */
interface CustomSelectProps<T extends Record<string, any>> {
	data: T[]; // dataset
	labelKey: keyof T; // which field to display as label
	valueKey: keyof T; // which field to use as value
	queryField: keyof IMerchantListQuery;
	query: IMerchantListQuery;
	onFilter: (value: { [key: string]: string | undefined }) => void;
	placeholder?: string;
	disabled?: boolean;

	/** optional custom renderer for item */
	renderItem?: (item: T) => React.ReactNode;
	/** optional transform for value → rendered label */
	getDisplayLabel?: (value: string, item?: T) => React.ReactNode;
}

export function CustomSelect<T extends Record<string, any>>({
	data,
	labelKey,
	valueKey,
	queryField,
	query,
	onFilter,
	placeholder = "Сонгох...",
	disabled = false,
	renderItem,
	getDisplayLabel,
}: CustomSelectProps<T>) {
	const [key, setKey] = useState(crypto.randomUUID());

	const value = query[queryField] as string | undefined;

	useEffect(() => {
		if (!query[queryField]) setKey(crypto.randomUUID());
	}, [query]);

	const selectedItem = data.find(
		(item) => String(item[valueKey]) === String(value)
	);

	return (
		<div
			className={cn(
				"relative",
				disabled && "pointer-events-none opacity-60"
			)}>
			<Select
				key={key}
				value={value ?? ""}
				onValueChange={(val) => {
					if (!disabled) onFilter({ [queryField]: val });
				}}
				disabled={disabled}>
				<SelectTrigger
					disabled={disabled}
					className={cn(
						"w-[200px] text-muted-foreground",
						disabled && "cursor-not-allowed"
					)}>
					<SelectValue placeholder={placeholder}>
						{selectedItem
							? getDisplayLabel
								? getDisplayLabel(String(value), selectedItem)
								: String(selectedItem[labelKey])
							: placeholder}
					</SelectValue>
				</SelectTrigger>

				{!disabled && (
					<SelectContent>
						<SelectGroup>
							{data.map((item) => {
								const itemValue = String(item[valueKey]);
								const itemLabel = String(item[labelKey]);

								return (
									<SelectItem
										key={itemValue}
										value={itemValue}>
										{renderItem
											? renderItem(item)
											: itemLabel}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				)}
			</Select>

			{/* Optional visual overlay (for full blocking effect) */}
			{disabled && (
				<div className="absolute inset-0 bg-transparent cursor-not-allowed" />
			)}
		</div>
	);
}
