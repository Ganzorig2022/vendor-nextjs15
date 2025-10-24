"use client";

import { Spinner } from "@/components/ui/spinner";
import { miniChartData } from "@/core/constants/values";
import { useDashboardQuery } from "@/modules/dashboard/api/dashboard.query";
import { MiniStats } from "@/modules/dashboard/components";
import { MerchantRecruitmentBarChart } from "@/modules/dashboard/components/merchants-bar-chart";
import { ChartAreaInteractive } from "@/modules/dashboard/components/transactions-area-chart";
import { TransactionSummaryDual } from "@/modules/dashboard/components/transactions-summary-card";
import { useGeneralQuery } from "@/modules/general/api/general.query";
import useMainStore from "@/modules/general/store/use-main-store";
import { useEffect, useState } from "react";

export type rangeQueryType = {
	range_type: string;
	transactionType: "all" | "card" | "p2p";
};

const HomePage = () => {
	const [rangeType, setRangeType] = useState<rangeQueryType>({
		range_type: "ytd",
		transactionType: "all",
	});

	const { data, refetch, isLoading } = useDashboardQuery(rangeType);
	const { data: generalData } = useGeneralQuery();
	const { updateGeneralData } = useMainStore((s) => s);

	// 🧠 Local caches to persist previously loaded datasets
	const [p2pCache, setP2pCache] = useState<any[]>([]);
	const [cardCache, setCardCache] = useState<any[]>([]);

	useEffect(() => {
		if (generalData) updateGeneralData(generalData);
	}, [generalData]);

	// 🔁 Refetch data when rangeType changes
	useEffect(() => {
		refetch();
	}, [rangeType]);

	// 🧩 Merge cache logic to persist datasets across transactionType changes
	useEffect(() => {
		if (!data) return;

		switch (rangeType.transactionType) {
			case "all":
				setP2pCache(data.p2p_transactions ?? []);
				setCardCache(data.card_transactions ?? []);
				break;

			case "card":
				setCardCache(data.card_transactions ?? []);
				// ✅ Keep old p2pCache if backend didn’t return it
				if (data.p2p_transactions?.length)
					setP2pCache(data.p2p_transactions);
				break;

			case "p2p":
				setP2pCache(data.p2p_transactions ?? []);
				// ✅ Keep old cardCache if backend didn’t return it
				if (data.card_transactions?.length)
					setCardCache(data.card_transactions);
				break;
		}
	}, [data, rangeType.transactionType]);

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	return (
		<div className="m-5">
			{data && (
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					{/* 🧾 Merchant stats */}
					<div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6">
							<MiniStats
								title="Нийт мерчант"
								type="totalCount"
								data={data.merchant.totalCount}
								subTitle="Нийт идэвхтэй мерчант"
							/>

							<MiniStats
								title="Сүүлийн 6 сар мерчант"
								type="monthly"
								data={data.merchant.monthly}
								subTitle="Сүүлийн 1 сарын өсөлт"
							/>

							<MiniStats
								title="Сүүлийн 7 хоног мерчант"
								type="weekly"
								data={data.merchant.weekly}
								subTitle="Сүүлийн 7 хоногийн өсөлт"
							/>
						</div>
					</div>
					{/* 🧾 Transaction stats */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6 lg:px-6">
						<TransactionSummaryDual
							title="Дансны гүйлгээ"
							type="p2p"
							data={data.transaction_totals.p2p}
						/>
						<TransactionSummaryDual
							title="Картын гүйлгээ"
							type="card"
							data={data.transaction_totals.card}
						/>
					</div>

					{/* 🧭 Transaction charts */}
					<div className="px-4 lg:px-6">
						<ChartAreaInteractive
							data={p2pCache}
							onRangeChange={setRangeType}
							chartTitle="Дансны гүйлгээ"
							transactionType="p2p"
						/>
					</div>

					<div className="px-4 lg:px-6">
						<ChartAreaInteractive
							data={cardCache}
							onRangeChange={setRangeType}
							chartTitle="Картын гүйлгээ"
							transactionType="card"
						/>
					</div>

					<div className="px-4 lg:px-6">
						<MerchantRecruitmentBarChart
							data={data.merchant_recruitment}
							onRangeChange={setRangeType}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
