"use client";

import { YearPicker } from "@/components/shared/year-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useCalculateExcelMutation } from "@/modules/card-report/api/card-report-mutation";
import { useCardReportQuery } from "@/modules/card-report/api/card-report.query";
import { CardReportTable } from "@/modules/card-report/components/card-report-table";
import { IReportMonthlyExcels } from "@/modules/card-report/types/type";
import { useEffect, useState } from "react";

const DefaultPages = {
	page: 1,
	limit: 20,
	reload: false,
	start_year: new Date().getFullYear(),
};

export default function CardReportPage() {
	const [filters, setFilters] = useState(DefaultPages);
	const { data, refetch, isLoading, isFetching } =
		useCardReportQuery(filters);

	const calculateExcelMutation = useCalculateExcelMutation();
	const isCalculating = calculateExcelMutation.isPending;

	useEffect(() => {
		refetch();
	}, [filters.start_year, refetch]);

	async function handleRecalculate(row: IReportMonthlyExcels) {
		calculateExcelMutation.mutate({
			type: "Card",
			date: {
				year: row.date.year,
				month: row.date.month,
				day: row.date.day ?? 1,
			},
		});
	}

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	return (
		<div className="p-6 space-y-6">
			{/* 🔹 Filter Card */}
			<Card className="p-4 border shadow-sm bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
				<CardContent className="flex items-center justify-between gap-4 flex-wrap">
					<div className="flex items-center gap-2">
						<YearPicker
							placeholder="Жил сонгох"
							onFilter={(val) =>
								setFilters({ ...filters, ...val })
							}
							query={filters}
							type="start_year"
						/>
					</div>

					<Button
						onClick={() => refetch()}
						variant="secondary"
						className="text-sm"
						disabled={isFetching}>
						{isFetching ? (
							<Spinner className="size-4 mr-2" />
						) : null}
						Шинэчлэх
					</Button>
				</CardContent>
				{/* 🔹 Table */}
				{data && (
					<CardReportTable
						data={data}
						onRecalculate={handleRecalculate}
						// onDownload={handleDownload}
						isCalculating={isCalculating}
					/>
				)}
			</Card>
		</div>
	);
}
