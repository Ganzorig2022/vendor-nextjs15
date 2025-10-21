import { useQuery } from "@tanstack/react-query";
import { getGeneralData } from "./general.service";

export function useGeneralQuery() {

  return useQuery({
    queryKey: ["getGeneralData"],
    queryFn: getGeneralData,
  });
}
