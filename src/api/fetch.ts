import { getCookieByKey } from "../helpers";


export const fetchApi = async (body: object, url: string, extraParams: object) => {
    try {
        const params = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': getCookieByKey() || ''
            },
            ...extraParams
        }

        const response = await fetch(url, {
            ...params
        })
        return response.json()
    } catch (error) {
        console.error(`Ocurred an error -> ${error}`);

    }
}