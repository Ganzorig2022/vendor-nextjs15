import { IGeneralData } from './../types/type';
import { axiosClientWithAuh } from "@/core/api/api.client";

export async function getGeneralData(): Promise<IGeneralData> {
const { data } = await axiosClientWithAuh.get("/general/init");
  return data;
}
