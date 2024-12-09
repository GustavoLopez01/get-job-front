
export const formatCurrency = (currency: number) => {
    return Intl.NumberFormat('es-US', {
        currency: 'USD',
        style: 'currency'
    }).format(currency)
}

export const getTokenFromCookie = () => {
    const token = document.cookie.split("=")
    return token[1];
}