export function formatCoin(num: number) {
    if (!num) return num
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
}
export function formatCoinStyleDot(num: number) {
    if (!num) return num
    return num.toLocaleString('de-DE');
}

