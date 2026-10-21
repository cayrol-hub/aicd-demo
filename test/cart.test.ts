import assert from "node:assert/strict";
import {describe, test} from "node:test";
import {subtotal, total} from "../src/cart.ts";

const lines = [
    {sku: "tea", unitPrice: 10, quantity: 2},
    {sku: "mug", unitPrice: 15, quantity: 1}
];

describe("cart", () => {
    test("sums the lines", () => assert.equal(subtotal(lines), 35));
    test("applies the discount before VAT", () => assert.equal(total(lines, 20), 33.6));
});
