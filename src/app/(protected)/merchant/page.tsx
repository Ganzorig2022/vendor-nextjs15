"use client";

import { ComboBoxMCC } from "@/components/shared/combobox-mcc";
import { CustomSelect } from "@/components/shared/custom-select";
import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSearchFilter } from "@/hooks/use-search-filter";
import useMainStore from "@/modules/general/store/use-main-store";
import { useMerchantQuery } from "@/modules/merchant/api/merchant.query";
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
	const { onFilterClear, onFilter, query } = useSearchFilter();
	const { generalData } = useMainStore((s) => s);
	const { mccs } = generalData;
	const { data, refetch, isLoading } = useMerchantQuery(query);
	const [openModal, setOpenModal] = useState(false);

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
					<div>
						<ComboBoxMCC
							onFilter={onFilter}
							query={query}
							data={mccs}
						/>
					</div>
					<div>
						<DatePicker
							placeholder="Эхлэх огноо"
							onFilter={onFilter}
							query={query}
							type="start_date"
						/>
					</div>
					<div>
						<DatePicker
							placeholder="Дуусах огноо"
							onFilter={onFilter}
							query={query}
							type="end_date"
						/>
					</div>
					<m.div whileTap={{ scale: 0.85 }}>
						<Button
							variant="clear_search"
							size="sm"
							onClick={() => onFilterClear()}>
							<SearchX className="h-4 w-4 mr-2" />
							Цэвэрлэх
						</Button>
					</m.div>
					<Button
						variant="success"
						size="sm"
						onClick={() => onFilterClear(true)}
						disabled={isLoading}>
						<ListRestart className="h-4 w-4" />
						Шинэчлэх
					</Button>
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
