import { BASE_URL } from "../constants";
import { fetchApi } from "./fetch";
import type { Job, JobToSave } from "../types"

export const getAllJobs = async () => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs`, {}, {})
    } catch (error) {
        console.error(error);
    }
}

export const saveJob = async (job: JobToSave) => {
    try {
        return fetchApi({}, `${BASE_URL}/jobs`, {
            method: "POST",
            body: JSON.stringify(job)
        }, {})
    } catch (error) {
        console.error(error);
    }
}

export const getJobsByUser = async ({ includealldata = 0 }) => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs/get-vacancies`,{} ,{
            includealldata
        })
    } catch (error) {
        console.error(error);
    }
}

export const deleteJobById = async (id: Job['id']) => {
    try {
        return await fetchApi({}, `${BASE_URL}/jobs/${id}`, {
            method: "DELETE"
        }, {})
    } catch (error) {
        console.error(error);
    }
}