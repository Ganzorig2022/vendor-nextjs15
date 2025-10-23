"use client";

import { CustomSelect } from "@/components/shared/custom-select";
import { DatePicker } from "@/components/shared/date-picker";
import { PaginationBar } from "@/components/shared/pagination-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGeneralData } from "@/hooks/use-general-data";
import { useSearchFilter } from "@/hooks/use-search-filter";
import { getCardTransactionType, numberWithCommas } from "@/lib/utils";
import { useCardTransactionsMutations } from "@/modules/card-transactions/api/card-transactions.mutations";
import { useCardTransactionsQuery } from "@/modules/card-transactions/api/card-transactions.query";
import { CardTransactionsListTable } from "@/modules/card-transactions/components/table";
import { columns } from "@/modules/card-transactions/components/table-column";
import useMainStore from "@/modules/general/store/use-main-store";
import { ComboBoxMCC } from "@/modules/merchant/components/combo-box-mcc";
import { Download, Loader2, SearchX } from "lucide-react";
import { toast } from "sonner";

const CardTransactionsPage = () => {
	const { generalData } = useMainStore((s) => s);
	const { CARD_TRANSACTIONS_ARRAY } = useGeneralData();
	const { query, onFilter, onFilterClear, onPageChange, onLimitChange } =
		useSearchFilter();
	const { mccs } = generalData;

	const { data, isLoading } = useCardTransactionsQuery({
		type: "list",
		query,
	});

	const { cardTransactionsExportMutation } = useCardTransactionsMutations({
		onSuccess: (res) => {
			window.open(`${generalData?.s3host}${res.url}`);
			toast.success("Амжилттай татлаа.");
		},
	});

	const isBusy = isLoading || cardTransactionsExportMutation.isPending;

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	const handleDownload = () => cardTransactionsExportMutation.mutate(query);
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
						{cardTransactionsExportMutation.isPending ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Download className="h-4 w-4" />
						)}
						{cardTransactionsExportMutation.isPending
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
							{ value: "SUCCESS", label: "Амжилттай" },
							{ value: "FAILED", label: "Амжилтгүй" },
						]}
						labelKey="label"
						valueKey="value"
						queryField={"transaction_status" as any}
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
						queryField={"transaction_type" as any}
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
				<div className="mt-5 flex flex-col">
					{data && (
						<>
							<div className="ml-auto p-4">
								Хуудасны нийт дүн:
								<span className="ml-2">
									{numberWithCommas(
										(+data.totalAmountPerPage || 0).toFixed(
											2
										)
									)}
								</span>
							</div>
							<CardTransactionsListTable
								columns={columns(query.page, query.limit)}
								data={data?.rows ?? []}
								isLoading={isLoading}
							/>
							<PaginationBar
								page={query.page}
								limit={query.limit}
								totalCount={data?.count ?? 0}
								onPageChange={onPageChange}
								onLimitChange={onLimitChange}
								isLoading={isLoading}
							/>
						</>
					)}
				</div>
			</Card>
		</main>
	);
};

export default CardTransactionsPage;
