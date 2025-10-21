"use client";
import { animate, m, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
	text: string;
	data: number;
	icon: string;
};
const MiniStats = ({ text, data, icon }: Props) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, Math.round);
	// store a renderable number from the MotionValue
	const [display, setDisplay] = useState<number>(rounded.get());

	useEffect(() => {
		// subscribe to changes on the transformed MotionValue
		const unsubscribe = rounded.on("change", (v) => setDisplay(v));

		// animate the base motion value
		const animation = animate(count, data, { duration: 2 });

		return () => {
			unsubscribe();
			animation.stop();
		};
	}, [data, count, rounded]);

	return (
		<>
			<div className="flex justify-between items-center mx-4">
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
			</div>
		</>
	);
};

export default MiniStats;
