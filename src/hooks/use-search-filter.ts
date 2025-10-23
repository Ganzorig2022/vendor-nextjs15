"use client";
import { initialPageValues } from "@/core/constants/values";
import { IMerchantListQuery } from "@/modules/merchant/types/types";
import { P2PTransactionListQuery } from "@/modules/p2p-transactions/types/type";
import { useState } from "react";

interface FilterValue {
  [key: string]: string | undefined | number;
}

export const useSearchFilter = () => {
  const [query, setQuery] = useState<
    IMerchantListQuery | P2PTransactionListQuery
  >({
    ...initialPageValues,
  });

  const onFilter = (newValue: FilterValue) => {
    setQuery((prev) => ({
      ...prev,
      page: 1, // reset to first page whenever filtering
      ...newValue,
    }));
  };

  const onPageChange = (page: number) => {
    setQuery((prev) => ({ ...prev, page }));
  };

  const onLimitChange = (limit: number) => {
    setQuery((prev) => ({ ...prev, limit, page: 1 }));
  };

  const onFilterClear = (reload = false) => {
    setQuery(() => ({
      ...initialPageValues,
      ...(reload ? { reload: true } : {}),
    }));
  };

  return {
    query,
    setQuery,
    onFilter,
    onFilterClear,
    onPageChange,
    onLimitChange,
  };
};
