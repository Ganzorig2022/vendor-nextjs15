"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DefaultPagesType } from "@/modules/card-report/api/card-report.query";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

interface Props {
	placeholder: string;
	onFilter: (value: { [key: string]: string | undefined }) => void;
	query: DefaultPagesType;
	type: string;
	startYear?: number;
	endYear?: number;
	disabled?: boolean;
}

export function YearPicker({
	placeholder,
	onFilter,
	query,
	type,
	startYear = 2015,
	endYear = new Date().getFullYear(),
	disabled = false,
}: Props) {
	const [open, setOpen] = React.useState(false);
	const selectedYear = Number(query[type as keyof DefaultPagesType] ?? "");
	const years = React.useMemo(
		() => Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i),
		[startYear, endYear]
	);

	function handleSelect(year: number) {
		onFilter({ [type]: String(year) });
		setOpen(false);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					disabled={disabled}
					className={cn(
						"w-[180px] justify-between text-left font-normal",
						!selectedYear && "text-muted-foreground",
						disabled && "cursor-not-allowed opacity-60"
					)}
				>
					<div className="flex items-center gap-2">
						<CalendarIcon className="h-4 w-4" />
						<span>
							{selectedYear ? `${selectedYear}` : placeholder}
						</span>
					</div>
				</Button>
			</PopoverTrigger>

			{!disabled && (
				<PopoverContent className="w-[180px] p-0 shadow-md">
					<div className="max-h-[240px] overflow-y-auto divide-y divide-border rounded-md">
						{years.map((year) => (
							<div
								key={year}
								onClick={() => handleSelect(year)}
								className={cn(
									"px-3 py-2 text-sm cursor-pointer transition-colors",
									year === selectedYear
										? "bg-qpay-primary text-white font-medium"
										: "hover:bg-muted"
								)}
							>
								{year}
							</div>
						))}
					</div>
				</PopoverContent>
			)}
		</Popover>
	);
}
