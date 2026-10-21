import assert from "node:assert/strict";
import {describe, test} from "node:test";

// Simulates a race with a remote inventory service: fails about one run out of two.
describe("inventory sync", () => {
    test("completes before the checkout timeout", () => {
        const elapsedMs = Math.random() * 4000;
        assert.ok(elapsedMs < 2000, `sync took ${Math.round(elapsedMs)} ms, timeout is 2000 ms`);
    });
});
