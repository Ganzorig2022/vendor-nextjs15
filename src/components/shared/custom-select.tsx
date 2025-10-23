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
import { useEffect, useState } from "react";

interface CustomSelectProps<
  T extends Record<string, any>,
  Q extends Record<string, any>
> {
  data: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  queryField: keyof Q;
  query: Q;
  onFilter: (value: { [key: string]: string | undefined }) => void;
  placeholder?: string;
  disabled?: boolean;
  renderItem?: (item: T) => React.ReactNode;
  getDisplayLabel?: (value: string, item?: T) => React.ReactNode;
}

export function CustomSelect<
	T extends Record<string, any>,
	Q extends Record<string, any>,
>({
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
}: CustomSelectProps<T, Q>) {
	const [key, setKey] = useState(crypto.randomUUID());
	const value = query[queryField] as string | undefined;

	useEffect(() => {
		if (!query[queryField]) setKey(crypto.randomUUID());
	}, [query, ]);

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
					if (!disabled) onFilter({ [queryField as string]: val });
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

			{disabled && (
				<div className="absolute inset-0 bg-transparent cursor-not-allowed" />
			)}
		</div>
	);
}
