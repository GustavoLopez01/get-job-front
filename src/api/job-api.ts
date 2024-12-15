import { BASE_URL } from "../constants";
import { fetchApi } from "./fetch";
import type { Job } from "../types"

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

export const deleteJobById = async (id: Job['id']) => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs/${id}`, {
            method: "DELETE"
        })
    } catch (error) {
        console.error(error);
    }
}