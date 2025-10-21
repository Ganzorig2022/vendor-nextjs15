"use client";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { miniChartData } from "@/core/constants/values";
import { useDashboardQuery } from "@/modules/dashboard/api/dashboard.query";
import { MiniStats } from "@/modules/dashboard/components";
import { MerchantCount } from "@/modules/dashboard/types/types";
import { useGeneralQuery } from "@/modules/general/api/general.query";
import useMainStore from "@/modules/general/store/use-main-store";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicApexBarChart = dynamic(
	() => import("@/modules/dashboard/components/barChart"),
	{ ssr: false }
);
const DynamicApexAreChart = dynamic(
	() => import("@/modules/dashboard/components/merchantAreaChart"),
	{ ssr: false }
);

const HomePage = () => {
	const { data, isLoading } = useDashboardQuery();
	const { data: general } = useGeneralQuery();
	const { updateGeneralData } = useMainStore((s) => s);

	useEffect(() => {
		if (general) updateGeneralData(general);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [general]);

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	return (
		<div className="m-5">
			{data && (
				<>
					<div className="flex justify-center gap-4">
						{miniChartData.map((mini, i) => {
							const count =
								data?.merchant[
									mini.type as keyof MerchantCount
								];
							return (
								<Card
									className="flex-1"
									key={i}>
									<MiniStats
										data={count ? +count : 0}
										text={mini.text}
										icon={mini.icon}
									/>
								</Card>
							);
						})}
					</div>
					<div className="flex gap-4 w-full justify-center mt-4">
						<div className="flex-2">
							<DynamicApexBarChart
								series={data?.p2p_transactions}
								titleText="Дансны"
							/>
						</div>
						<div className="flex-2">
							<DynamicApexBarChart
								series={data?.card_transactions}
								titleText="Картын"
							/>
						</div>
					</div>
					<div className="mt-4">
						<DynamicApexAreChart data={data?.dashboard} />
					</div>
				</>
			)}
		</div>
	);
};

export default HomePage;
