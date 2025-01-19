import { BASE_URL } from "../constants";
import { fetchApi } from "./fetch";

export const getUser = async () => {
    try {
        return await fetchApi({}, `${BASE_URL}/users/get-user`, {}, {})
    } catch (error) {
        console.error(error);
    }
} 