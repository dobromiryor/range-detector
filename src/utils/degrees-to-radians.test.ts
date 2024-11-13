import { degreesToRadians } from "@/utils/degrees-to-radians";
import { describe, expect, it } from "vitest";

describe("degreesToRadians function", () => {
	it("converts positive degrees to radians", () => {
		expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
	});

	it("converts negative degrees to radians", () => {
		expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2);
	});

	it("converts zero degrees to radians", () => {
		expect(degreesToRadians(0)).toBeCloseTo(0);
	});

	it("converts decimal degrees to radians", () => {
		expect(degreesToRadians(45.5)).toBeCloseTo((45.5 * Math.PI) / 180);
	});
});
