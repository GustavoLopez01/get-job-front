import { BASE_URL } from "../constants";
import { fetchApi } from "./fetch";

export const getAllJobs = async () => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs`, {})
    } catch (error) {
        console.error(error);
    }
}

export const getJobsByUser = async () => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs/get-vacancies`, {})
    } catch (error) {
        console.error(error);
    }
}