"use client";

import { CustomSelect } from "@/components/shared/custom-select";
import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSearchFilter } from "@/hooks/use-search-filter";
import useMainStore from "@/modules/general/store/use-main-store";
import { useMerchantMutations } from "@/modules/merchant/api/merchant.mutations";
import { useMerchantQuery } from "@/modules/merchant/api/merchant.query";
import { ComboBoxBusinessDirection } from "@/modules/merchant/components/combo-box-business-direction";
import { ComboBoxMCC } from "@/modules/merchant/components/combo-box-mcc";
import MerchantCreateModal from "@/modules/merchant/components/merchant-create-modal";
import { MerchantListTable } from "@/modules/merchant/components/table";
import { columns } from "@/modules/merchant/components/table-column";
import {
	CirclePlus,
	Download,
	ListRestart,
	Loader2,
	SearchX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MerchantPage() {
	const [openModal, setOpenModal] = useState(false);
	const { onFilterClear, onFilter, query } = useSearchFilter();
	const { generalData } = useMainStore((s) => s);
	const { mccs, business_directions } = generalData;

	const { data, refetch, isLoading } = useMerchantQuery({
		type: "list",
		query,
	});

	const { merchantExportMutation } = useMerchantMutations({
		onSuccess: (res) => {
			window.open(`${generalData?.s3host}${res.url}`);
			toast.success("Амжилттай татлаа.");
		},
	});

	const isBusy = isLoading || merchantExportMutation.isPending;

	const handleDownload = () => merchantExportMutation.mutate(query);

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	return (
		<main>
			<Card className="px-4">
				{/* 🔹 Header Buttons */}
				<div className="flex gap-2 ml-auto">
					<Button
						variant="success"
						size="sm"
						disabled={isBusy}
						onClick={() => setOpenModal(true)}>
						<CirclePlus className="h-4 w-4" />
						Мерчант бүртгэх
					</Button>

					<Button
						variant="info"
						size="sm"
						disabled={isBusy}
						onClick={handleDownload}>
						{merchantExportMutation.isPending ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Download className="h-4 w-4" />
						)}
						{merchantExportMutation.isPending
							? "Excel татаж байна..."
							: "Excel татах"}
					</Button>
				</div>

				{/* 🔹 Filters */}
				<div className="flex gap-2 items-center flex-wrap">
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

					<CustomSelect
						onFilter={onFilter}
						query={query}
						queryField="type"
						placeholder="Мерчантын төрөл"
						options={[
							{ label: "Иргэн", value: "Иргэн" },
							{ label: "Байгууллага", value: "Байгууллага" },
						]}
						disabled={isBusy}
					/>

					<ComboBoxMCC
						data={mccs}
						value={query.mcc_code}
						onChange={(v) => onFilter({ mcc_code: v })}
						disabled={isBusy}
					/>

					<ComboBoxBusinessDirection
						data={business_directions}
						value={query.g_business_direction_id}
						onChange={(v) =>
							onFilter({ g_business_direction_id: v })
						}
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

						<Button
							variant="success"
							size="sm"
							onClick={() => onFilterClear(true)}
							disabled={isBusy}>
							<ListRestart className="h-4 w-4" />
							Шинэчлэх
						</Button>
					</div>
				</div>

				{/* 🔹 Table */}
				<div className="mt-5">
					{data && (
						<MerchantListTable
							columns={columns}
							data={data.rows}
						/>
					)}
				</div>

				{/* 🔹 Modal */}
				<MerchantCreateModal
					open={openModal}
					close={setOpenModal}
					callback={refetch}
				/>
			</Card>
		</main>
	);
}
