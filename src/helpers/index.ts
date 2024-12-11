
export const formatCurrency = (currency: number) => {
    return Intl.NumberFormat('es-US', {
        currency: 'USD',
        style: 'currency'
    }).format(currency)
}

export const getCookieByKey = (key: string = "userToken") => {
    const token = document.cookie.split(";")
    return token.find((item) => item.includes(key))?.split("=")[1]
}