
export const formatCurrency = (currency: number) => {
    return Intl.NumberFormat('es-US', {
        currency: 'USD',
        style: 'currency'
    }).format(currency)
}