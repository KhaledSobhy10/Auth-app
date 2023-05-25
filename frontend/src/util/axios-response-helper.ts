import { AxiosResponse } from "axios";

export function getData(axiosResponse: AxiosResponse) {
  return axiosResponse.data;
}
