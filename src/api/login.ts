import { BASE_URL } from "../constants";
import { fetchApi } from "./fetch";


export const auth = async (email: string, password: string) => {
    try {
        return await fetchApi({}, `${BASE_URL}/session/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
    } catch (error) {
        console.error(`Ocurred an error -> ${error}`);
    }
}