import { getCookieByKey } from "../helpers";


export const fetchApi = async (
    body: object, 
    url: string, 
    extraParams: object,
    extraHeaders: object
) => {
    try {
        const params = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': getCookieByKey() || '',
                ...extraHeaders
            },
            ...extraParams
        }

        const response = await fetch(url, {
            ...params
        })

        const data = await response.json()
        if(data?.isInvalidToken) {
            document.cookie = "userToken="
            window.location.href = import.meta.env.VITE_PATH_INDEX
        }
        return data
    } catch (error) {
        console.error(`Ocurred an error -> ${error}`);

    }
}