import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IMerchantList, IMerchantListQuery, IMerchantDetail } from "../types/types";
import { getMerchant, getMerchantList } from "./merchant.service";

type MerchantQueryType =
	| { type: "list"; query: IMerchantListQuery }
	| { type: "detail"; merchant_id: string }
	| { type: "transactions"; merchant_id: string };

// Overload signatures 👇
export function useMerchantQuery(config: { type: "list"; query: IMerchantListQuery }): UseQueryResult<IMerchantList>;
export function useMerchantQuery(config: { type: "detail"; merchant_id: string }): UseQueryResult<IMerchantDetail>;
export function useMerchantQuery(config: { type: "transactions"; merchant_id: string }): UseQueryResult<any>; // optional

// Implementation 👇
export function useMerchantQuery(config: MerchantQueryType) {
	switch (config.type) {
		case "list":
			return useQuery({
				queryKey: ["merchant:list", config.query],
				queryFn: () => getMerchantList(config.query),
			});

		case "detail":
			return useQuery({
				queryKey: ["merchant:detail", config.merchant_id],
				queryFn: () => getMerchant(config.merchant_id),
				enabled: !!config.merchant_id,
			});

		case "transactions":
			return useQuery({
				queryKey: ["merchant:transactions", config.merchant_id],
				queryFn: async () => {
					// placeholder
					return [];
				},
				enabled: !!config.merchant_id,
			});

		default:
			throw new Error("Unsupported query type for useMerchantQuery");
	}
}
