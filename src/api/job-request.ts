import { BASE_URL } from "../constants";
import { fetchApi } from "./fetch";

export const getAllByUser = async () => {
  try {
    return fetchApi({}, `${BASE_URL}/jobRequests/getAllByUser`, {
      method: "GET",
    }, {})
  } catch (error) {
    console.log(error);
  }
}

export const postJob = async (jobId: number) => {
  try {
    return fetchApi({}, `${BASE_URL}/jobRequests/${jobId}`, {
      method: "POST",
    }, {})
  } catch (error) {
    console.error(`Ocurrio un error en la api postJob -> ${error}`);
  }
}