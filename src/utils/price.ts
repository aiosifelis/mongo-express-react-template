export default {
    subtractPercentage(amount: number, percent: number) {
        return amount - amount * (percent / 100)
    },
    addPercentage(amount: number, percent: number) {
        return amount + amount * (percent / 100)
    },
    toPriceString(cents: number) {
        return (cents / 100).toFixed(2)
    }
}
