"use client";
import { initialPageValues } from "@/core/constants/values";
import useMainStore from "@/modules/general/store/use-main-store";
import { IMerchantListQuery } from "@/modules/merchant/types/types";
import { useState } from "react";

interface FilterValue {
	[key: string]: string | undefined;
}

export const useSearchFilter = () => {
	const { generalData } = useMainStore((s) => s);
	const [query, setQuery] = useState<IMerchantListQuery>(initialPageValues);
	const { mccs } = generalData;
	const MCC_CODES_label = mccs?.map((mcc) => ({
		label: mcc.name_mon,
		value: mcc.mcc_code,
	}));
	const onFilter = (newValue: FilterValue) => {
		// if (newValue.mcc_code) {
		// 	const code = MCC_CODES_label.find(
		// 		(code) => code.label === newValue.mcc_code
		// 	);
		// 	setQuery((prev) => ({
		// 		...prev,
		// 		page: 1,
		// 		mcc_code: code?.value,
		// 		mcc_code_mon: code?.label,
		// 	}));
		// } else if (newValue.transaction_type) {
		// 	setQuery((prev) => ({
		// 		...prev,
		// 		page: 1,
		// 		transaction_type: newValue.transaction_type,
		// 	}));
		// } else {
		// 	setQuery((prev) => ({
		// 		...prev,
		// 		page: 1,
		// 		...newValue,
		// 	}));
		// }
		setQuery((prev) => ({
			...prev,
			page: 1,
			...newValue,
		}));
	};

	const onFilterClear = (reload = false) => {
		if (reload)
			return setQuery((prev) => ({ ...initialPageValues, reload: true }));

		setQuery(initialPageValues);
	};

	return {
		query,
		setQuery,
		onFilter,
		onFilterClear,
	};
};
