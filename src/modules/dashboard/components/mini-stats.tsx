"use client";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
type Props = {
	text: string;
	data: number;
	icon: string;
};
const MiniStats = ({ text, data }: Props) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, Math.round);
	const [display, setDisplay] = useState<number>(rounded.get());

	useEffect(() => {
		const unsubscribe = rounded.on("change", (v) => setDisplay(v));
		const animation = animate(count, data, { duration: 2 });

		return () => {
			unsubscribe();
			animation.stop();
		};
	}, [data, count, rounded]);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>{text}</CardDescription>
				<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-text-main">
					{display}
				</CardTitle>
				<CardAction>
					<Badge variant="outline">
						<TrendingUp />
						+12.5%
					</Badge>
				</CardAction>
			</CardHeader>
			{/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
				<div className="line-clamp-1 flex gap-2 font-medium">
					Trending up this month <TrendingUp className="size-4" />
				</div>
				<div className="text-muted-foreground">
					Visitors for the last 6 months
				</div>
			</CardFooter> */}
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
