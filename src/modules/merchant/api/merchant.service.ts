import { axiosClientWithAuh } from "@/core/api/api.client";
import {
	IMerchantDetail,
	IMerchantItem,
	IMerchantList,
	IMerchantListQuery,
} from "../types/types";
import {
	CompanyMerchantFormType,
	PersonMerchantFormType,
} from "../schema/merchant.schema";

export const getMerchantList = async (
	payload: IMerchantListQuery
): Promise<IMerchantList> => {
	const { data } = await axiosClientWithAuh.post(
		"/merchant/list_vendor",
		payload
	);
	return data;
};

export const getMerchant = async (
	merchantId: string
): Promise<IMerchantDetail> => {
	const { data } = await axiosClientWithAuh.get(
		`/merchant/get/${merchantId}`
	);
	return data;
};

export const merchantCompanyCreate = async (
	payload: CompanyMerchantFormType | PersonMerchantFormType
): Promise<IMerchantItem> => {
	const { data } = await axiosClientWithAuh.post("/merchant/company", payload);
	return data;
};

export const merchantPersonCreate = async (
	payload: CompanyMerchantFormType | PersonMerchantFormType
): Promise<IMerchantItem> => {
	const { data } = await axiosClientWithAuh.post("/merchant/person", payload);
	return data;
};

export const merchantCompanyUpdate = async (
	payload: CompanyMerchantFormType
): Promise<IMerchantItem> => {
	const { data } = await axiosClientWithAuh.post(
		"/merchant/company_update",
		payload
	);
	return data;
};

export const merchantPersonUpdate = async (
	payload: PersonMerchantFormType
): Promise<IMerchantItem> => {
	const { data } = await axiosClientWithAuh.post(
		"/merchant/person_update",
		payload
	);
	return data;
};
