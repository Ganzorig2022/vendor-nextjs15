"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	TrendingDown,
	TrendingUp,
	Users,
	CalendarDays,
	BarChart3,
} from "lucide-react";

type Props = {
	title: string;
	data:
		| number
		| {
				last: number;
				prev: number;
				growthPercent: number;
		  };
	type: "totalCount" | "monthly" | "weekly";
	subTitle: string;
};

const MiniStats = ({ title, data, type, subTitle }: Props) => {
	const start = useMotionValue(0);
	const rounded = useTransform(start, Math.round);
	const [display, setDisplay] = useState<number>(rounded.get());
	const valueToAnimate = typeof data === "number" ? data : data.last;

	useEffect(() => {
		const unsub = rounded.on("change", (v) => setDisplay(v));
		const anim = animate(start, valueToAnimate, {
			duration: 1.5,
			ease: "easeOut",
		});
		return () => {
			unsub();
			anim.stop();
		};
	}, [data, start, rounded]);

	const isTotal = type === "totalCount";

	// 🎨 Dynamic gradient theme based on type
	const gradient =
		type === "totalCount"
			? "from-indigo-500/80 via-indigo-600/70 to-purple-500/60"
			: type === "monthly"
			? "from-emerald-500/80 via-teal-500/70 to-green-500/60"
			: "from-amber-400/80 via-orange-500/70 to-yellow-500/60";

	// 🧠 Select Lucide icon
	const icon =
		type === "totalCount" ? (
			<Users className="size-5 text-white" />
		) : type === "monthly" ? (
			<CalendarDays className="size-5 text-white" />
		) : (
			<BarChart3 className="size-5 text-white" />
		);

	return (
		<Card
			className={`relative overflow-hidden border-none bg-gradient-to-br ${gradient} text-white backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-300`}
		>
			{/* Glass overlay */}
			<div className="absolute inset-0 bg-black/10" />

			<CardHeader className="relative z-10 flex items-center justify-between pb-2">
				<CardDescription className="text-white/90 text-sm font-medium tracking-tight">
					{title}
				</CardDescription>
				<div className="p-2 bg-white/20 rounded-xl flex items-center justify-center">
					{icon}
				</div>
			</CardHeader>

			<CardTitle className="relative z-10 px-6 pb-1 text-3xl font-bold text-white drop-shadow-sm tabular-nums">
				{display.toLocaleString()}
			</CardTitle>

			<CardFooter className="relative z-10 flex-col items-start gap-1 text-xs text-white/80 px-6 pb-3">
				{!isTotal && typeof data !== "number" && (
					<div
						className={`flex items-center gap-1 font-semibold text-sm ${
							data.growthPercent > 0
								? "text-lime-200"
								: data.growthPercent < 0
								? "text-rose-300"
								: "text-white/70"
						}`}
					>
						{data.growthPercent > 0 ? (
							<TrendingUp className="size-4" />
						) : data.growthPercent < 0 ? (
							<TrendingDown className="size-4" />
						) : null}
						{data.growthPercent}%
					</div>
				)}
				<div className="text-white/80">{subTitle}</div>
			</CardFooter>
		</Card>
	);
};

export default MiniStats;
