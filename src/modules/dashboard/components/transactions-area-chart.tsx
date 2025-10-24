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
	ChartConfig,
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
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const chartConfig = {
	failed: { label: "Амжилтгүй", color: "var(--color-merchant)" },
	success: { label: "Амжилттай", color: "var(--color-transfer)" },
} satisfies ChartConfig;

type Props = {
	data: any[];
	onRangeChange: (val: rangeQueryType) => void;
	chartTitle: string;
	transactionType: "card" | "p2p";
};

export function ChartAreaInteractive({
	data,
	onRangeChange,
	chartTitle,
	transactionType,
}: Props) {
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
			success: Number(item.success || 0),
			failed: Number(item.failed || 0),
		}));

		const first = parsed[0].date.startOf("month");
		const last = parsed[parsed.length - 1].date.startOf("month");
		const map = new Map(parsed.map((d) => [d.date.format("YYYY-MM"), d]));
		const months: { date: string; success: number; failed: number }[] = [];

		let cur = first.clone();
		while (cur.isBefore(last) || cur.isSame(last)) {
			const key = cur.format("YYYY-MM");
			const found = map.get(key);
			months.push({
				date: cur.format("YYYY-MM-01"),
				success: found?.success ?? 0,
				failed: found?.failed ?? 0,
			});
			cur = cur.add(1, "month");
		}

		return months;
	}, [data]);

	// 🕒 Filter range
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

	// ⚖️ Auto-scale for left (success) and right (failed) axes separately
	const getScaleInfo = (values: number[]) => {
		const max = Math.max(...values, 0);
		let divisor = 1;
		let label = "₮";

		if (max >= 1_000_000_000) {
			divisor = 1_000_000_000;
			label = "Тэрбум ₮";
		} else if (max >= 1_000_000) {
			divisor = 1_000_000;
			label = "Сая ₮";
		} else if (max >= 1_000) {
			divisor = 1_000;
			label = "Мянга ₮";
		}

		return { divisor, label };
	};

	const successScale = React.useMemo(
		() => getScaleInfo(filteredData.map((d) => d.success)),
		[filteredData]
	);
	const failedScale = React.useMemo(
		() => getScaleInfo(filteredData.map((d) => d.failed)),
		[filteredData]
	);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>{chartTitle}</CardTitle>
				<CardAction>
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={(val) => {
							const next = val || "ytd";
							setTimeRange(next);
							onRangeChange?.({
								range_type: next,
								transactionType,
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

					<Select
						value={timeRange}
						onValueChange={(val) => {
							const next = val || "ytd";
							setTimeRange(next);
							onRangeChange?.({
								range_type: next,
								transactionType,
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
					config={chartConfig}
					className="aspect-auto h-[300px] w-full">
					<AreaChart
						data={filteredData}
						margin={{ top: 20, right: 40, left: 60, bottom: 30 }}>
						<defs>
							<linearGradient
								id="fillFailed"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-merchant)"
									stopOpacity={0.5}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-merchant)"
									stopOpacity={0.05}
								/>
							</linearGradient>
							<linearGradient
								id="fillSuccess"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-transfer)"
									stopOpacity={0.5}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-transfer)"
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>

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
							tickFormatter={(v) => dayjs(v).format("MMM YYYY")}
						/>

						{/* Left Y-Axis (Амжилттай) */}
						<YAxis
							yAxisId="left"
							tickLine={false}
							axisLine={false}
							width={80}
							tickMargin={8}
							fontSize={12}
							tickFormatter={(v) =>
								(v / successScale.divisor).toFixed(1)
							}
							label={{
								value: `Амжилттай (${successScale.label})`,
								angle: -90,
								position: "insideLeft",
								style: {
									textAnchor: "middle",
									fill: "#059669",
									fontSize: 12,
									fontWeight: 500,
								},
							}}
						/>

						{/* Right Y-Axis (Амжилтгүй) */}
						<YAxis
							yAxisId="right"
							orientation="right"
							tickLine={false}
							axisLine={false}
							width={80}
							tickMargin={8}
							fontSize={12}
							tickFormatter={(v) =>
								(v / failedScale.divisor).toFixed(1)
							}
							label={{
								value: `Амжилтгүй (${failedScale.label})`,
								angle: 90,
								position: "insideRight",
								style: {
									textAnchor: "middle",
									fill: "#dc2626",
									fontSize: 12,
									fontWeight: 500,
								},
							}}
						/>

						<ChartTooltip
							cursor={{
								stroke: "rgba(0,0,0,0.15)",
								strokeWidth: 1,
							}}
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										dayjs(value, "YYYY-MM-DD").format(
											"MMM YYYY"
										)
									}
									indicator="dot"
									style={{
										fontSize: 12,
										padding: "6px 10px",
									}}
								/>
							}
						/>

						{/* Left (Success) */}
						<Area
							yAxisId="left"
							dataKey="success"
							type="monotone"
							stroke="var(--color-transfer)"
							strokeWidth={2}
							fill="url(#fillSuccess)"
							dot={false}
							activeDot={{ r: 4 }}
						/>

						{/* Right (Failed) */}
						<Area
							yAxisId="right"
							dataKey="failed"
							type="monotone"
							stroke="var(--color-merchant)"
							strokeWidth={1.8}
							fill="url(#fillFailed)"
							dot={false}
							activeDot={{ r: 4 }}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
