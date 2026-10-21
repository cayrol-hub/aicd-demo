import assert from "node:assert/strict";
import {describe, test} from "node:test";
import {applyDiscount, withVat} from "../src/pricing.ts";

describe("pricing", () => {
    test("applies a discount", () => assert.equal(applyDiscount(100, 20), 80));
    test("caps the discount at 50%", () => assert.equal(applyDiscount(100, 70), 50));
    test("ignores negative discounts", () => assert.equal(applyDiscount(100, -10), 100));
    test("adds 20% VAT", () => assert.equal(withVat(100), 120));
});
