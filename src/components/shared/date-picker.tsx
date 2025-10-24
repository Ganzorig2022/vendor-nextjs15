"use client";

import { formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IMerchantListQuery } from "@/modules/merchant/types/types";

interface Props {
	placeholder: string;
	onFilter: (value: { [key: string]: string | undefined }) => void;
	query: IMerchantListQuery;
	type: string;
	disabled?: boolean;
}

export function DatePicker({
	placeholder,
	onFilter,
	query,
	type,
	disabled = false,
}: Props) {
	const [date, setDate] = React.useState<Date>();

	React.useEffect(() => {
		if (!query[type as keyof IMerchantListQuery]) {
			setDate(undefined);
		}
	}, [query]);

	const formattedDate =
		query[type as keyof IMerchantListQuery] &&
		formatISO(query[type as keyof IMerchantListQuery] as string, {
			representation: "date",
		});

	return (
		<Popover open={!disabled && undefined}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					disabled={disabled}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground",
						disabled && "cursor-not-allowed opacity-60"
					)}>
					<CalendarIcon />
					{formattedDate ? formattedDate : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>

			{/* Disable all popover behavior if disabled */}
			{!disabled && (
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(date) => {
							if (date) {
								setDate(date);
								onFilter({ [type]: formatISO(date) });
							}
						}}
						autoFocus
					/>
				</PopoverContent>
			)}
		</Popover>
	);
}
