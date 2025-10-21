'use client'

import { ComboBoxMCC } from "@/components/shared/combobox-mcc";
import { CustomSelect } from "@/components/shared/custom-select";
import { DatePicker } from "@/components/shared/date-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchFilter } from "@/hooks/use-search-filter";
import useMainStore from "@/modules/general/store/use-main-store";
import { useMerchantQuery } from "@/modules/merchant/api/merchant.query";
import { MerchantListTable } from "@/modules/merchant/components/table";
import { columns } from "@/modules/merchant/components/table-column";
import { m } from 'framer-motion';
import { SearchX } from "lucide-react";

type Props = {};

const MerchantPage = (props: Props) => {
	const { onFilterClear, onFilter, query } = useSearchFilter();
  const { generalData } = useMainStore((s) => s)
  const { mccs } = generalData
  const { data, isLoading } = useMerchantQuery(query);

	return (
		<main>
			<Card className="px-4">
				<div className="flex gap-2 items-center">
					<div>
						<Input
							type="text"
							onChange={(e) =>
								onFilter({ search: e.target.value.trim() })
							}
							placeholder="Хайх"
							value={query?.search || ""}
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
							onClick={onFilterClear}>
							<SearchX className="h-4 w-4 mr-2" />
							Цэвэрлэх
						</Button>
					</m.div>
				</div>
				<div className="mt-5">
					{data && (
						<MerchantListTable
							columns={columns}
							data={data.rows}
						/>
					)}
				</div>
			</Card>
		</main>
	);
};

export default MerchantPage;
