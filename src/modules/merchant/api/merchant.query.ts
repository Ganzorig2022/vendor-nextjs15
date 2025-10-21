import { useQuery } from "@tanstack/react-query";
import { getMerchantList } from "./merchant.service";
import { IMerchantListQuery } from "../types/types";

export const useMerchantQuery = (query: IMerchantListQuery) => {
	return useQuery({
		queryKey: ["getMerchantList", query],
		queryFn: () => getMerchantList(query),
	});
};
