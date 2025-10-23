"use client";

import { CustomSelect } from "@/components/shared/custom-select";
import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSearchFilter } from "@/hooks/use-search-filter";
import useMainStore from "@/modules/general/store/use-main-store";
import { useMerchantQuery } from "@/modules/merchant/api/merchant.query";
import { ComboBoxBusinessDirection } from "@/modules/merchant/components/combo-box-business-direction";
import { ComboBoxMCC } from "@/modules/merchant/components/combo-box-mcc";
import MerchantCreateModal from "@/modules/merchant/components/merchant-create-modal";
import { MerchantListTable } from "@/modules/merchant/components/table";
import { columns } from "@/modules/merchant/components/table-column";
import { m } from "framer-motion";
import {
	CirclePlus,
	Download,
	ListRestart,
	Loader2,
	SearchX,
} from "lucide-react";
import { useState } from "react";

const MerchantPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const { onFilterClear, onFilter, query } = useSearchFilter();
	const { generalData } = useMainStore((s) => s);
	const { mccs, business_directions } = generalData;
	const { data, refetch, isLoading } = useMerchantQuery({
		type: "list",
		query: query,
	});

	if (isLoading)
		return (
			<div className="flex h-screen w-auto items-center justify-center">
				<Spinner className="size-8 text-qpay-primary" />
			</div>
		);

	return (
		<main>
			<Card className="px-4">
				<div className="flex gap-2 ml-auto">
					<Button
						variant="success"
						size="sm"
						disabled={isLoading}
						onClick={() => setOpenModal(true)}>
						<CirclePlus className="h-4 w-4" />
						Мерчант бүртгэх
					</Button>
					<Button
						variant="info"
						size="sm"
						disabled={isLoading}>
						{isLoading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Download className="h-4 w-4" />
						)}
						{!isLoading ? "Excel татах" : "Excel татаж байна."}
					</Button>
				</div>
				<div className="flex gap-2 items-center flex-wrap">
					<div>
						<Input
							type="text"
							onChange={(e) =>
								onFilter({ search: e.target.value.trim() })
							}
							placeholder="Хайх"
							value={query?.search || ""}
							className="text-[13px]"
						/>
					</div>
					<div>
						<CustomSelect
							onFilter={onFilter}
							query={query}
							queryField="type"
							placeholder="Мерчантын төрөл"
							options={[
								{ label: "Иргэн", value: "Иргэн" },
								{ label: "Байгууллага", value: "Байгууллага" },
							]}
						/>
					</div>
					<ComboBoxMCC
						data={mccs}
						value={query.mcc_code}
						onChange={(v) => onFilter({ mcc_code: v })}
					/>
					<ComboBoxBusinessDirection
						data={business_directions}
						value={query.g_business_direction_id}
						onChange={(v) =>
							onFilter({ g_business_direction_id: v })
						}
					/>
					<div className="gap-2 flex">
						<DatePicker
							placeholder="Эхлэх огноо"
							onFilter={onFilter}
							query={query}
							type="start_date"
						/>
						<DatePicker
							placeholder="Дуусах огноо"
							onFilter={onFilter}
							query={query}
							type="end_date"
						/>
					</div>
					<div className="gap-2 flex">
						<Button
							variant="clear_search"
							size="sm"
							onClick={() => onFilterClear()}>
							<SearchX className="h-4 w-4 mr-2" />
							Цэвэрлэх
						</Button>
						<Button
							variant="success"
							size="sm"
							onClick={() => onFilterClear(true)}
							disabled={isLoading}>
							<ListRestart className="h-4 w-4" />
							Шинэчлэх
						</Button>
					</div>
				</div>
				<div className="mt-5">
					{data && (
						<MerchantListTable
							columns={columns}
							data={data.rows}
						/>
					)}
				</div>
				<MerchantCreateModal
					open={openModal}
					close={setOpenModal}
					callback={refetch}
				/>
			</Card>
		</main>
	);
};

export default MerchantPage;
