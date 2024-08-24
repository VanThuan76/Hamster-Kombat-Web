export function formatCoin(num: number) {
    if (!num) return num
    if (Math.round(num) >= 1000000) {
        return (Math.round(num) / 1000000).toFixed(1) + 'M';
    } else if (Math.round(num) >= 1000) {
        return (Math.round(num) / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}
export function formatCoinStyleDot(num: number) {
    if (!num) return num
    return Math.round(num).toLocaleString('de-DE');
}
