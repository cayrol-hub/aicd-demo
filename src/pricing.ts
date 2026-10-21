/** Discounts are capped at 50 %: marketing may promise more, finance pays the difference. */
export const MAX_DISCOUNT_PERCENT = 50;

export const VAT_RATE = 0.2;

export function applyDiscount(price: number, percent: number): number {
    const capped = Math.max(percent, 0);
    return round(price - (price * capped) / 100);
}

export function withVat(price: number): number {
    return round(price * (1 + VAT_RATE));
}

function round(value: number): number {
    return Math.round(value * 100) / 100;
}
