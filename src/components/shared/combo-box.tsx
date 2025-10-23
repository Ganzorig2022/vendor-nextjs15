"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// ✅ Generic type for dynamic datasets
interface ComboBoxProps<T extends Record<string, any>> {
	labelKey: keyof T; // Which field to show as text
	valueKey: keyof T; // Which field to use as the value
	data: T[]; // The dataset (can be MCC[], BusinessDirection[], etc.)
	onSelect: (value: string, item: T | undefined) => void; // Callback
	placeholder?: string;
	emptyText?: string;
	selectedValue?: string;
	className?: string;
}

export function ComboBox<T extends Record<string, any>>({
	labelKey,
	valueKey,
	data,
	onSelect,
	placeholder = "Сонгох...",
	emptyText = "Мэдээлэл олдсонгүй.",
	selectedValue,
	className,
}: ComboBoxProps<T>) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(selectedValue ?? "");
	const [key, setKey] = React.useState(crypto.randomUUID());

	// Reset when data changes or value cleared
	React.useEffect(() => {
		if (!selectedValue) {
			setValue("");
			setKey(crypto.randomUUID());
		}
	}, [selectedValue, data]);

	// Helper to find selected item
	const selectedItem = data.find((item) => String(item[valueKey]) === value);

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			key={key}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-[300px] justify-between text-gray-500",
						className
					)}>
					{selectedItem
						? String(selectedItem[labelKey])
						: placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{data.map((item) => {
								const itemValue = String(item[valueKey]);
								const itemLabel = String(item[labelKey]);
								return (
									<CommandItem
										key={itemValue}
										value={itemLabel}
										onSelect={() => {
											const newValue =
												itemValue === value
													? ""
													: itemValue;

											setValue(newValue);
											setOpen(false);
											onSelect(newValue, item);
										}}>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												value === itemValue
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{itemLabel}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
