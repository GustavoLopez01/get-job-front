import { BASE_URL } from "../constants";
import { getTokenFromCookie } from "../helpers";
import { fetchApi } from "./fetch";

export const getAllJobs = async () => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs`, {
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'authorization': getTokenFromCookie()
            },
        })
    } catch (error) {
        console.error(error);
    }
}