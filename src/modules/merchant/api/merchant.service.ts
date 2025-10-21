import { axiosClientWithAuh } from "@/core/api/api.client";
import { IMerchantDetail, IMerchantList, IMerchantListQuery } from "../types/types";


export const getMerchantList = async (payload: IMerchantListQuery): Promise<IMerchantList> => {
  const { data } = await axiosClientWithAuh.post("/merchant/list_vendor", payload);
  return data;
};

export const getMerchant = async (merchantId: string): Promise<IMerchantDetail> => {
  const { data } = await axiosClientWithAuh.get(`/merchant/get/${merchantId}`);
  return data;
};

