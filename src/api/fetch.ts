

export const fetchApi = async (body: object, url: string, params: object) => {
    try {
        const response = await fetch(url, {
            ...params
        })
        return response.json()
    } catch (error) {
        console.error(`Ocurred an error -> ${error}`);
        
    }
}