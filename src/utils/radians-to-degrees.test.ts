import { radiansToDegrees } from "@/utils/radians-to-degrees";
import { describe, expect, it } from "vitest";

describe("radiansToDegrees function", () => {
	it("converts positive radians to degrees", () => {
		expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
	});

	it("converts negative radians to degrees", () => {
		expect(radiansToDegrees(-Math.PI / 2)).toBeCloseTo(-90);
	});

	it("converts zero radians to degrees", () => {
		expect(radiansToDegrees(0)).toBeCloseTo(0);
	});

	it("converts decimal radians to degrees", () => {
		expect(radiansToDegrees((Math.PI * 45.5) / 180)).toBeCloseTo(45.5);
	});
});
