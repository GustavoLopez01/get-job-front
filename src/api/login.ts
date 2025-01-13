import { BASE_URL } from '../constants';
import { fetchApi } from './fetch';

export const auth = async (email: string, password: string) => {
    try {
        return await fetchApi({}, `${BASE_URL}/session/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        }, {})
    } catch (error) {
        console.error(`an error ocurred -> ${error}`);
    }
}

export const logout = async () => {
    try {
        return await fetchApi({}, `${BASE_URL}/session/logout`, {
            method: "POST",
        }, {})
    } catch (error) {
        console.log(`an error ocurred -> ${error}`);
    }
}