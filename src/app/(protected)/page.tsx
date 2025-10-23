"use client";

import { Spinner } from "@/components/ui/spinner";
import { miniChartData } from "@/core/constants/values";
import { useDashboardQuery } from "@/modules/dashboard/api/dashboard.query";
import { getNewDashboardData } from "@/modules/dashboard/api/dashboard.service";
import { MiniStats } from "@/modules/dashboard/components";
import { ChartAreaInteractive } from "@/modules/dashboard/components/chart-interactive";
import { IMerchantCount, MerchantCount } from "@/modules/dashboard/types/types";
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
	const { data: generalData } = useGeneralQuery();
	const { updateGeneralData } = useMainStore((s) => s);

	useEffect(() => {
		if (generalData) updateGeneralData(generalData);
	}, [generalData]);


	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	return (
		<div className="m-5 ">
			{data && (
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<div>
						<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
							<MiniStats
								data={data.merchant.totalCount}
								title={miniChartData[0].title}
								icon={miniChartData[0].icon}
								type={miniChartData[0].type}
								subTitle={miniChartData[0].subTitle}
							/>
							<MiniStats
								data={data.merchant.monthly}
								title={miniChartData[1].title}
								icon={miniChartData[1].icon}
								type={miniChartData[1].type}
								subTitle={miniChartData[1].subTitle}
							/>
							<MiniStats
								data={data.merchant.weekly}
								title={miniChartData[2].title}
								icon={miniChartData[2].icon}
								type={miniChartData[2].type}
								subTitle={miniChartData[2].subTitle}
							/>
						</div>
					</div>
					{/* <div className="flex gap-4 py-4 md:gap-6 md:py-6">
						<div className="flex-1">
							<DynamicApexBarChart
								series={data?.p2p_transactions}
								titleText="Дансны"
							/>
						</div>
						<div className="flex-1">
							<DynamicApexBarChart
								series={data?.card_transactions}
								titleText="Картын"
							/>
						</div>
					</div>
					<div className="mt-4">
						<DynamicApexAreChart data={data?.dashboard} />
					</div> */}
					<div>
						<ChartAreaInteractive p2p_transactions={data.p2p_transactions}/>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
