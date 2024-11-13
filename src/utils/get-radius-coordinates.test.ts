import { describe, expect, it } from "vitest";
import { MAX_DISTANCE } from "../consts/max-distance.const";
import { OFFICE_LOCATION } from "../consts/offlice-location.const";
import { calculateDistance } from "./calculate-distance";
import { getRadiusCoordinates } from "./get-radius-coordinates";

describe("getRandomCoordinates function", () => {
	it("returns random coordinates with random bearing", () => {
		const result = getRadiusCoordinates(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude
		);
		expect(result).toHaveProperty("latitude");
		expect(result).toHaveProperty("longitude");
	});

	it("returns coordinates with specified bearing", () => {
		const bearing = 90;
		const result = getRadiusCoordinates(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude,
			MAX_DISTANCE,
			bearing
		);
		expect(result).toHaveProperty("latitude");
		expect(result).toHaveProperty("longitude");
	});

	it("throws error with bearing out of range", () => {
		const bearing = 361; // out of range
		expect(() =>
			getRadiusCoordinates(
				OFFICE_LOCATION.latitude,
				OFFICE_LOCATION.longitude,
				MAX_DISTANCE,
				bearing
			)
		).toThrowError("Bearing must be between 0 and 360");
	});

	it("returns coordinates that are MAX_DISTANCE from OFFICE_LOCATION when bearing is random", () => {
		const result = getRadiusCoordinates(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude,
			MAX_DISTANCE
		);
		const distance = calculateDistance(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude,
			result.latitude,
			result.longitude
		);
		expect(distance).toBeCloseTo(MAX_DISTANCE);
	});
});
