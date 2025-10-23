"use client";
import { initialPageValues } from "@/core/constants/values";
import { IMerchantListQuery } from "@/modules/merchant/types/types";
import { P2PTransactionListQuery } from "@/modules/p2p-transactions/types/type";
import { useState } from "react";

interface FilterValue {
	[key: string]: string | undefined;
}

export const useSearchFilter = () => {
	const [query, setQuery] = useState<
		IMerchantListQuery | P2PTransactionListQuery
	>(initialPageValues);

	const onFilter = (newValue: FilterValue) => {
		setQuery((prev) => ({
			...prev,
			page: 1,
			...newValue,
		}));
	};

	const onFilterClear = (reload = false) => {
		if (reload)
			return setQuery(() => ({ ...initialPageValues, reload: true }));

		setQuery(initialPageValues);
	};

	return {
		query,
		setQuery,
		onFilter,
		onFilterClear,
	};
};
