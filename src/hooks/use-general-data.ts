import { IMCC } from '@/modules/general/types/type';
"use client";
import { useMemo } from "react";
import useMainStore from "@/modules/general/store/use-main-store";

export const useGeneralData = () => {
	const generalData = useMainStore((s) => s.generalData);

	const MCC_ARRAY = useMemo(
		() =>
			generalData?.mccs?.map((item) => ({
				label: item.name_mon,
				value: item.mcc_code,
			})) || [],
		[generalData?.mccs]
	);

	const CITY_ARRAY = useMemo(
		() =>
			generalData?.cities?.map((item) => ({
				label: item.name,
				value: item.code,
			})) || [],
		[generalData?.cities]
	);

	const DISTRICT_ARRAY = useMemo(
		() =>
			generalData?.districts?.map((item) => ({
				label: item.name,
				value: item.code,
			})) || [],
		[generalData?.districts]
	);

	const BUSINESS_DIRECTIONS_ARRAY = useMemo(
		() =>
			generalData?.business_directions?.map((item) => ({
				label: item.name,
				value: item.id,
			})) || [],
		[generalData?.business_directions]
	);

	const CARD_TRANSACTIONS_ARRAY = useMemo(
		() =>
			generalData?.CARD_TRANSACTION_TYPE?.map((item) => ({
				label: item.name,
				value: item.code,
			})) || [],
		[generalData?.CARD_TRANSACTION_TYPE]
	);

	// ✅ Also handy lookup helpers
	const getCityName = (code?: string) =>
		CITY_ARRAY.find((c) => c.value === code)?.label ?? "";
	const getDistrictName = (code?: string) =>
		DISTRICT_ARRAY.find((d) => d.value === code)?.label ?? "";
	const getMccName = (code?: string) =>
		MCC_ARRAY.find((m) => m.value === code)?.label ?? "";

	return {
		MCC_ARRAY,
		CITY_ARRAY,
		DISTRICT_ARRAY,
		BUSINESS_DIRECTIONS_ARRAY,
		CARD_TRANSACTIONS_ARRAY,
		getCityName,
		getDistrictName,
		getMccName,
	};
};
