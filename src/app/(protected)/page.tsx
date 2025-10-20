"use client";

import { Card } from "@/components/ui/card";
import { miniChartData } from "@/core/constants/values";
import { MiniStats } from "@/modules/dashboard/components";
import { useDashboardQuery } from "@/modules/dashboard/hooks/useDashboardQuery";
import { MerchantCount } from "@/modules/dashboard/types/types";
import dynamic from "next/dynamic";

const DynamicApexBarChart = dynamic(
  () => import('@/modules/dashboard/components/barChart'),
  { ssr: false },
)
const DynamicApexAreChart = dynamic(
  () => import('@/modules/dashboard/components/merchantAreaChart'),
  { ssr: false },
)

const HomePage = () => {
	const { data, isLoading } = useDashboardQuery();
	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="">
			{data && (
				<>
					<div className="flex justify-center">
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
					<div className="flex gap-2 w-full justify-center">
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
					<div>
						<DynamicApexAreChart data={data?.dashboard} />
					</div>
				</>
			)}
			{/* <FadeLoader loading={isFetching} /> */}
		</div>
	);
};

export default HomePage;
