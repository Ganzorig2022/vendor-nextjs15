"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { Minus, Plus, RotateCcw } from "lucide-react";
import * as React from "react";
import { IReportMonthlyExcels } from "../types/type";
import { ReportDownloadButton } from "./card-report-download";

interface Props {
	data: IReportMonthlyExcels[];
	onRecalculate: (row: IReportMonthlyExcels) => Promise<void>;
	// onDownload: (row: IReportMonthlyExcels) => Promise<void>;
	isCalculating?: boolean;
}

export function CardReportTable({
	data,
	onRecalculate,
	// onDownload,
	isCalculating = false,
}: Props) {
	const columnHelper = createColumnHelper<IReportMonthlyExcels>();

	const formatAmount = (val: number) =>
		(val || 0).toLocaleString("mn-MN") + " ₮";

	const columns = [
		columnHelper.display({
			id: "date",
			header: () => (
				<div className="text-center font-semibold">Огноо</div>
			),
			cell: ({ row }) => {
				const d = row.original.date;
				const m = String(d.month).padStart(2, "0");
				const dateStr = d.day
					? `${d.year}-${m}-${String(d.day).padStart(2, "0")}`
					: `${d.year}-${m}`;
				return (
					<div className="text-center font-medium text-foreground">
						{dateStr}
					</div>
				);
			},
		}),
		columnHelper.display({
			id: "total",
			header: () => (
				<div className="text-center font-semibold">Нийт гүйлгээ</div>
			),
			cell: ({ row }) => {
				const s = row.original.stats;
				return (
					<div className="flex flex-col items-center gap-1 text-sm text-gray-700">
						<div className="flex items-center gap-1 font-semibold text-foreground">
							{s.payment_count}
							<span className="text-[10px] opacity-70">
								(тоо)
							</span>
						</div>
						<div className="w-full h-[1px] bg-border/50" />
						<div className="text-xs font-medium bg-muted/40 rounded-md px-2 py-[2px]">
							{formatAmount(s.sum_payment_amount)}
						</div>
					</div>
				);
			},
		}),

		// ✅ Success column
		columnHelper.display({
			id: "success",
			header: () => (
				<div className="text-center font-semibold">Амжилттай</div>
			),
			cell: ({ row }) => {
				const s = row.original.stats;
				return (
					<div className="flex flex-col items-center gap-1 text-green-600 text-sm">
						<div className="flex items-center gap-1">
							<div className="font-semibold">
								{s.payment_count_paid}
							</div>
							<span className="text-[10px] opacity-70">
								(тоо)
							</span>
						</div>
						<div className="w-full h-[1px] bg-green-500/10" />
						<div className="text-xs text-green-700 font-medium bg-green-500/5 px-2 py-[2px] rounded-md">
							{formatAmount(s.sum_payment_amount_paid)}
						</div>
					</div>
				);
			},
		}),
		// ✅ Failed column
		columnHelper.display({
			id: "failed",
			header: () => (
				<div className="text-center font-semibold">Амжилтгүй</div>
			),
			cell: ({ row }) => {
				const s = row.original.stats;
				const failedCount = s.payment_count - s.payment_count_paid;
				const failedAmount =
					s.sum_payment_amount - s.sum_payment_amount_paid;

				return (
					<div className="flex flex-col items-center gap-1 text-rose-600 text-sm">
						<div className="flex items-center gap-1">
							<div className="font-semibold">{failedCount}</div>
							<span className="text-[10px] opacity-70">
								(тоо)
							</span>
						</div>
						<div className="w-full h-[1px] bg-rose-500/10" />
						<div className="text-xs text-rose-700 font-medium bg-rose-500/5 px-2 py-[2px] rounded-md">
							{formatAmount(failedAmount)}
						</div>
					</div>
				);
			},
		}),
		columnHelper.display({
			id: "date_calculated",
			header: () => (
				<div className="text-center font-semibold">
					Тооцоолсон огноо
				</div>
			),
			cell: ({ row }) => {
				const d = row.original.file?.created_date;
				return (
					<div className="text-center text-xs text-muted-foreground">
						{d ? dayjs(d).format("YYYY-MM-DD HH:mm") : "-"}
					</div>
				);
			},
		}),
		columnHelper.display({
			id: "actions",
			header: () => (
				<div className="text-center font-semibold">Үйлдэл</div>
			),
			cell: ({ row }) => {
				const record = row.original;
				return (
					<div className="flex justify-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onRecalculate(record)}>
							<RotateCcw className="h-4 w-4 mr-1" />
							{isCalculating ? "Тооцолж байна..." : "Дахин"}
						</Button>

						{record.file?.path && (
							<ReportDownloadButton file={record.file} />
						)}
					</div>
				);
			},
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
	});

	return (
		<>
			<div className="rounded-lg border overflow-hidden">
				<Table>
					<TableHeader className="bg-muted/40">
						{table.getHeaderGroups().map((hg) => (
							<TableRow key={hg.id}>
								<TableHead className="w-[40px]" />{" "}
								{/* 👈 empty space for icons */}
								{hg.headers.map((header) => (
									<TableHead
										key={header.id}
										className="text-center text-xs sm:text-sm font-semibold">
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<React.Fragment key={row.id}>
								<TableRow
									onClick={() => row.toggleExpanded()}
									className={`group cursor-pointer transition hover:bg-muted/30 ${
										row.getIsExpanded() ? "bg-muted/20" : ""
									}`}>
									{/* ➕ Expand / collapse icon */}
									<TableCell className="w-[40px] text-center">
										<div className="flex justify-center items-center">
											{row.getIsExpanded() ? (
												<Minus className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-foreground" />
											) : (
												<Plus className="h-4 w-4 text-muted-foreground transition-transform group-hover:text-foreground" />
											)}
										</div>
									</TableCell>

									{/* Render rest of cells */}
									{row
										.getVisibleCells()
										.map((cell, cellIndex) => (
											<TableCell
												key={cell.id}
												className={`text-center py-2 ${
													cellIndex === 0
														? "pl-0"
														: ""
												}`}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
								</TableRow>

								{/* Expand child table */}
								{row.getIsExpanded() &&
									row.original.daily_excels &&
									row.original.daily_excels.length > 0 && (
										<TableRow>
											<TableCell colSpan={columns.length}>
												<div className="pl-8 py-2 border-l-2 border-muted-foreground/20">
													<CardReportTable
														data={
															row.original
																.daily_excels
														}
														onRecalculate={
															onRecalculate
														}
													/>
												</div>
											</TableCell>
										</TableRow>
									)}
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
