
export const formatCurrency = (currency: number) => {
    return Intl.NumberFormat('es-US', {
        currency: 'USD',
        style: 'currency'
    }).format(currency)
}

export const getCookieByKey = (key: string = "userToken") => {
    const cookies = document.cookie.split(";")
    return cookies.find((item) => item.includes(key))?.split("=")[1]
}

export const clearAllCookies = () => {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
        document.cookie = cookie + "=;expires=" + new Date(0).toUTCString();
    }
} 