"use client";

import { rangeQueryType } from "@/app/(protected)/page";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import * as React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
	data: any[];
	onRangeChange: (val: rangeQueryType) => void;
};

export function MerchantRecruitmentBarChart({ data, onRangeChange }: Props) {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = React.useState("ytd");

	React.useEffect(() => {
		if (isMobile) setTimeRange("6m");
	}, [isMobile]);

	// 🧠 Fill missing months
	const chartData = React.useMemo(() => {
		if (!data?.length) return [];

		const sorted = [...data].sort((a, b) =>
			a.year === b.year ? a.month - b.month : a.year - b.year
		);

		const parsed = sorted.map((item) => ({
			date: dayjs(
				`${item.year}-${String(item.month).padStart(2, "0")}-01`
			),
			count: Number(item.count || 0),
		}));

		const first = parsed[0].date.startOf("month");
		const last = parsed[parsed.length - 1].date.startOf("month");

		const map = new Map(parsed.map((d) => [d.date.format("YYYY-MM"), d]));
		const months: { date: string; count: number }[] = [];

		let cur = first.clone();
		while (cur.isBefore(last) || cur.isSame(last)) {
			const key = cur.format("YYYY-MM");
			const found = map.get(key);
			months.push({
				date: cur.format("YYYY-MM-01"),
				count: found?.count ?? 0,
			});
			cur = cur.add(1, "month");
		}

		return months;
	}, [data]);

	// 🕒 Filter by range
	const filteredData = React.useMemo(() => {
		if (!chartData.length) return [];
		const now = dayjs();
		let start = now.subtract(1, "year");

		switch (timeRange) {
			case "ytd":
				start = now.startOf("year");
				break;
			case "1y":
				start = now.subtract(1, "year").startOf("year");
				break;
			case "6m":
				start = now.subtract(6, "month");
				break;
			case "3m":
				start = now.subtract(3, "month");
				break;
		}

		return chartData.filter((d) => dayjs(d.date).isSameOrAfter(start));
	}, [chartData, timeRange]);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Мерчант элсүүлэлт</CardTitle>
				<CardAction>
					{/* Desktop toggles */}
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={(val) => {
							const next = val || "ytd";
							setTimeRange(next);
							onRangeChange?.({
								range_type: next,
								transactionType: "p2p", // irrelevant but consistent with other charts
							});
						}}
						variant="outline"
						className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
						<ToggleGroupItem value="ytd">Энэ жил</ToggleGroupItem>
						<ToggleGroupItem value="1y">Өмнөх жил</ToggleGroupItem>
						<ToggleGroupItem value="6m">
							Сүүлийн 6 сар
						</ToggleGroupItem>
						<ToggleGroupItem value="3m">
							Сүүлийн 3 сар
						</ToggleGroupItem>
					</ToggleGroup>

					{/* Mobile select */}
					<Select
						value={timeRange}
						onValueChange={(val) => {
							const next = val || "ytd";
							setTimeRange(next);
							onRangeChange?.({
								range_type: next,
								transactionType: "p2p",
							});
						}}>
						<SelectTrigger
							className="flex w-40 @[767px]/card:hidden"
							size="sm">
							<SelectValue placeholder="Сүүлийн 6 сар" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="ytd">Энэ жил</SelectItem>
							<SelectItem value="1y">Өмнөх жил</SelectItem>
							<SelectItem value="6m">Сүүлийн 6 сар</SelectItem>
							<SelectItem value="3m">Сүүлийн 3 сар</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					className="aspect-auto h-[300px] w-full"
					config={{
						count: {
							label: "Merchant Count",
							color: "var(--color-transfer)",
						},
					}}>
					<ResponsiveContainer
						width="100%"
						height={300}>
						<BarChart
							data={filteredData}
							margin={{
								top: 20,
								right: 40,
								left: 60,
								bottom: 30,
							}}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(0,0,0,0.06)"
								vertical={false}
							/>

							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={12}
								minTickGap={32}
								fontSize={12}
								fontWeight={500}
								tickFormatter={(v) =>
									dayjs(v).format("MMM YYYY")
								}
							/>

							<YAxis
								tickLine={false}
								axisLine={false}
								width={80}
								tickMargin={8}
								fontSize={12}
								label={{
									value: "Мерчант (тоо)",
									angle: -90,
									position: "insideLeft",
									style: {
										textAnchor: "middle",
										fill: "#202754",
										fontSize: 12,
										fontWeight: 500,
									},
								}}
							/>

							<ChartTooltip
								cursor={{ fill: "rgba(0,0,0,0.05)" }}
								content={
									<ChartTooltipContent
										labelFormatter={(value) =>
											dayjs(
												value as string,
												"YYYY-MM-DD"
											).format("MMM YYYY")
										}
										formatter={(value) =>
											`${Number(value).toLocaleString()} мерчант`
										}
									/>
								}
							/>

							<Bar
								dataKey="count"
								fill="var(--color-invoice)"
								radius={[6, 6, 0, 0]}
								barSize={40}
							/>
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
