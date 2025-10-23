"use client";

import { CustomSelect } from "@/components/shared/custom-select";
import { DatePicker } from "@/components/shared/date-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGeneralData } from "@/hooks/use-general-data";
import { useSearchFilter } from "@/hooks/use-search-filter";
import { getCardTransactionType } from "@/lib/utils";
import useMainStore from "@/modules/general/store/use-main-store";
import { ComboBoxMCC } from "@/modules/merchant/components/combo-box-mcc";
import { useP2pTransactionsMutations } from "@/modules/p2p-transactions/api/p2p-transactions.mutations";
import { useP2pTransactionsQuery } from "@/modules/p2p-transactions/api/p2p-transactions.query";
import { P2pTransactionsListTable } from "@/modules/p2p-transactions/components/table";
import { columns } from "@/modules/p2p-transactions/components/table-column";
import { Download, Loader2, SearchX } from "lucide-react";
import { toast } from "sonner";

const CardTransactionsPage = () => {
	const { generalData } = useMainStore((s) => s);
	const { CARD_TRANSACTIONS_ARRAY } = useGeneralData();
	const { onFilterClear, onFilter, query } = useSearchFilter();
	const { mccs } = generalData;
	const { data, isLoading } = useP2pTransactionsQuery({
		type: "list",
		query,
	});

	const { p2pTransactionsExportMutation } = useP2pTransactionsMutations({
		onSuccess: (res) => {
			window.open(`${generalData?.s3host}${res.url}`);
			toast.success("Амжилттай татлаа.");
		},
	});

	const isBusy = isLoading || p2pTransactionsExportMutation.isPending;

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	const handleDownload = () => p2pTransactionsExportMutation.mutate(query);
	return (
		<main>
			<Card className="px-4">
				{/* 🔹 Header Buttons */}
				<div className="flex gap-2 ml-auto">
					<Button
						variant="info"
						size="sm"
						disabled={isBusy}
						onClick={handleDownload}>
						{p2pTransactionsExportMutation.isPending ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Download className="h-4 w-4" />
						)}
						{p2pTransactionsExportMutation.isPending
							? "Excel татаж байна..."
							: "Excel татах"}
					</Button>
				</div>

				{/* 🔹 Filters */}
				<div className="flex gap-2 items-center flex-wrap">
					<div>
						<Input
							type="text"
							value={query?.search || ""}
							onChange={(e) =>
								onFilter({ search: e.target.value.trim() })
							}
							placeholder="Хайх"
							className="text-[13px]"
							disabled={isBusy}
						/>
					</div>
					<CustomSelect
						data={[
							{ value: "PAID", label: "Амжилттай" },
							{ value: "FAILED", label: "Амжилтгүй" },
						]}
						labelKey="label"
						valueKey="value"
						queryField={"payment_status" as any}
						query={query}
						onFilter={onFilter}
						placeholder="Гүйлгээний төлөв"
						renderItem={(item) => (
							<Badge variant={item.value.toLowerCase() as any}>
								{item.label}
							</Badge>
						)}
						disabled={isBusy}
					/>

					<CustomSelect
						data={CARD_TRANSACTIONS_ARRAY}
						labelKey="label"
						valueKey="value"
						queryField={"payment_type" as any}
						query={query}
						onFilter={onFilter}
						placeholder="Гүйлгээний төрөл"
						renderItem={(item) => {
							const type = getCardTransactionType(item.value);
							return (
								<Badge
									variant={
										type?.code.toLowerCase() ?? "default"
									}>
									{type?.name}
								</Badge>
							);
						}}
						disabled={isBusy}
					/>

					<ComboBoxMCC
						data={mccs}
						value={query.mcc_code}
						onChange={(v) => onFilter({ mcc_code: v })}
						disabled={isBusy}
					/>

					<div className="gap-2 flex">
						<DatePicker
							placeholder="Эхлэх огноо"
							onFilter={onFilter}
							query={query}
							type="start_date"
							disabled={isBusy}
						/>
						<DatePicker
							placeholder="Дуусах огноо"
							onFilter={onFilter}
							query={query}
							type="end_date"
							disabled={isBusy}
						/>
					</div>

					<div className="gap-2 flex">
						<Button
							variant="clear_search"
							size="sm"
							onClick={() => onFilterClear()}
							disabled={isBusy}>
							<SearchX className="h-4 w-4 mr-2" />
							Цэвэрлэх
						</Button>
					</div>
				</div>

				{/* 🔹 Table */}
				<div className="mt-5">
					{data && (
						<P2pTransactionsListTable
							columns={columns}
							data={data.rows}
						/>
					)}
				</div>
			</Card>
		</main>
	);
};

export default CardTransactionsPage;
