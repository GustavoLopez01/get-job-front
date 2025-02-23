
export const formatCurrency = (currency: number) => {
    return Intl.NumberFormat('es-US', {
        currency: 'USD',
        style: 'currency'
    }).format(currency)
}


export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })
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

export const validateFields = (fields: object) => {
    let isValid = true;
    for (const [_, value] of Object.entries(fields)) {
        if (typeof value !== "boolean" && !value) {
            isValid = false
            break
        }
    }
    return isValid
}

export const generateUniqueKey = () => {
    const value = Date.now();
    const randomStr = (Math.random() + 1).toString(36).substring(2);
    return `${randomStr}-${value}`
}