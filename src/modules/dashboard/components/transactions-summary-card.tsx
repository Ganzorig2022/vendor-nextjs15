"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import {
	Banknote,
	CreditCard,
	TrendingUp,
	TrendingDown,
	Wallet2,
} from "lucide-react";

type TransactionTotals = {
	success: number;
	failed: number;
};

type Props = {
	title: string; // e.g. "P2P гүйлгээ" or "Картын гүйлгээ"
	data: TransactionTotals;
	type: "p2p" | "card";
};

export function TransactionSummaryDual({ title, data, type }: Props) {
	const [successDisplay, setSuccessDisplay] = useState(0);
	const [failedDisplay, setFailedDisplay] = useState(0);
	const [totalDisplay, setTotalDisplay] = useState(0);

	const mvSuccess = useMotionValue(0);
	const mvFailed = useMotionValue(0);
	const mvTotal = useMotionValue(0);

	const roundSuccess = useTransform(mvSuccess, Math.round);
	const roundFailed = useTransform(mvFailed, Math.round);
	const roundTotal = useTransform(mvTotal, Math.round);

	useEffect(() => {
		const unsub1 = roundSuccess.on("change", setSuccessDisplay);
		const unsub2 = roundFailed.on("change", setFailedDisplay);
		const unsub3 = roundTotal.on("change", setTotalDisplay);

		const anim1 = animate(mvSuccess, data.success, { duration: 1.5 });
		const anim2 = animate(mvFailed, data.failed, { duration: 1.5 });
		const anim3 = animate(mvTotal, data.success + data.failed, {
			duration: 1.5,
		});

		return () => {
			unsub1();
			unsub2();
			unsub3();
			anim1.stop();
			anim2.stop();
			anim3.stop();
		};
	}, [data]);

	const formatMoney = (val: number) =>
		val >= 1_000_000_000
			? `${(val / 1_000_000_000).toFixed(1)} тэрбум ₮`
			: val >= 1_000_000
				? `${(val / 1_000_000).toFixed(1)} сая ₮`
				: `${val.toLocaleString()} ₮`;

	const isP2P = type === "p2p";
	const gradient = isP2P
		? "from-emerald-300/80 via-emerald-400/60 to-teal-500/40"
		: "from-indigo-300/80 via-blue-400/60 to-cyan-500/40";

	const icon = isP2P ? (
		<Banknote className="size-5 text-white/90" />
	) : (
		<CreditCard className="size-5 text-white/90" />
	);

	return (
		<Card
			className={`relative overflow-hidden border-none shadow-sm transition-all duration-300 hover:shadow-md bg-gradient-to-br ${gradient} text-white backdrop-blur-md`}>
			{/* Subtle overlay */}
			<div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

			<CardHeader className="relative z-10 flex items-center justify-between">
				<CardTitle className="text-base font-semibold">
					{title}
				</CardTitle>
				<div className="p-2 bg-white/10 rounded-xl">{icon}</div>
			</CardHeader>

			<CardContent className="relative z-10 mt-1 space-y-2">
				{/* Total */}
				<div className="flex justify-between items-center text-lg font-bold tracking-tight">
					<span>Нийт:</span>
					<motion.span
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						className="font-extrabold text-white drop-shadow-md">
						{formatMoney(totalDisplay)}
					</motion.span>
				</div>

				{/* Success */}
				<div className="flex justify-between text-sm font-medium text-white/90">
					<span className="flex items-center gap-1">
						<TrendingUp className="size-4 text-lime-200" />
						Амжилттай:
					</span>
					<span className="font-semibold">
						{formatMoney(successDisplay)}
					</span>
				</div>

				{/* Failed */}
				<div className="flex justify-between text-sm font-medium text-white/90">
					<span className="flex items-center gap-1">
						<TrendingDown className="size-4 text-rose-300" />
						Амжилтгүй:
					</span>
					<span className="font-semibold">
						{formatMoney(failedDisplay)}
					</span>
				</div>
			</CardContent>

			<CardFooter className="relative z-10 mt-3 border-t border-white/20 pt-2 text-xs text-white/80 justify-center">
				Сүүлийн 1 жил
			</CardFooter>
		</Card>
	);
}
