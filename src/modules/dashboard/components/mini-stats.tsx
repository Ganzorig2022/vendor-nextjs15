"use client";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
	title: string;
	data:
		| number
		| {
				last: number;
				prev: number;
				growthPercent: number;
		  };
	icon: string;
	type: string;
	subTitle: string;
	subCount?: number;
};

const MiniStats = ({ title, data, type, subTitle }: Props) => {
	const isTotalCount = type === "totalCount";
	const startFrom = useMotionValue(0);
	const rounded = useTransform(startFrom, Math.round);
	const [display, setDisplay] = useState<number>(rounded.get());
	const countToBeAnimated = typeof data === "number" ? data : data.last;
	useEffect(() => {
		const unsubscribe = rounded.on("change", (v) => setDisplay(v));
		const animation = animate(startFrom, countToBeAnimated, {
			duration: 2,
		});

		return () => {
			unsubscribe();
			animation.stop();
		};
	}, [data, startFrom, rounded]);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>{title}</CardDescription>
				<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-text-main">
					{display}
				</CardTitle>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1.5 text-sm">
				{!isTotalCount && typeof data !== 'number' && (
					<div className="line-clamp-1 flex gap-2 font-medium">
						{data.growthPercent > 0 ? (
							<TrendingUp className="size-4" />
						) : (
							<TrendingDown className="size-4" />
						)}
						{data.growthPercent} %
					</div>
				)}
				<div className="text-muted-foreground">{subTitle}</div>
			</CardFooter>
		</Card>
	);
};

export default MiniStats;

{
	/* <div className="flex justify-between items-center mx-4">
				<div className="flex flex-col">
					<div className="text-text-title font-extrabold">{text}</div>
					<m.h1 className="text-text-main font-bold text-3xl dark:text-gray-400">
						{display}
					</m.h1>
				</div>
				<div>
					<div
						className={`bg-qpay-secondary border rounded-full p-2 transition hover:scale-110`}>
						<Image
							src={icon}
							alt="stat_logo"
							width={30}
							height={30}
							quality={100}
						/>
					</div>
				</div>
			</div> */
}
