import {applyDiscount, withVat} from "./pricing.ts";

export interface Line {
    sku: string;
    unitPrice: number;
    quantity: number;
}

export function subtotal(lines: Line[]): number {
    return lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

/** Total to pay: discount first, then VAT. */
export function total(lines: Line[], discountPercent = 0): number {
    return withVat(applyDiscount(subtotal(lines), discountPercent));
}
