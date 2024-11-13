import { describe, expect, it } from "vitest";
import { MAX_DISTANCE } from "../consts/max-distance.const";
import { OFFICE_LOCATION } from "../consts/offlice-location.const";
import { calculateDistance } from "./calculate-distance";
import { getRadiusCoordinates } from "./get-radius-coordinates";

describe("calculateDistance function", () => {
	it("calculates distance between two points on the same latitude", () => {
		const officeLat = OFFICE_LOCATION.latitude;
		const officeLon = OFFICE_LOCATION.longitude;
		const partner = getRadiusCoordinates(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude,
			MAX_DISTANCE,
			0
		);
		expect(
			calculateDistance(officeLat, officeLon, partner.lat, partner.lon)
		).toBeCloseTo(MAX_DISTANCE);
	});

	it("calculates distance between two points on the same longitude", () => {
		const officeLat = OFFICE_LOCATION.latitude;
		const officeLon = OFFICE_LOCATION.longitude;
		const partner = getRadiusCoordinates(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude,
			MAX_DISTANCE,
			90
		);
		expect(
			calculateDistance(officeLat, officeLon, partner.lat, partner.lon)
		).toBeCloseTo(MAX_DISTANCE);
	});

	it("calculates distance between two points with different latitudes and longitudes", () => {
		const officeLat = OFFICE_LOCATION.latitude;
		const officeLon = OFFICE_LOCATION.longitude;
		const partner = getRadiusCoordinates(
			OFFICE_LOCATION.latitude,
			OFFICE_LOCATION.longitude
		);
		expect(
			calculateDistance(officeLat, officeLon, partner.lat, partner.lon)
		).toBeCloseTo(MAX_DISTANCE);
	});

	it("calculates distance between two identical points", () => {
		const officeLat = OFFICE_LOCATION.latitude;
		const officeLon = OFFICE_LOCATION.longitude;
		const partnerLat = OFFICE_LOCATION.latitude;
		const partnerLon = OFFICE_LOCATION.longitude;
		expect(
			calculateDistance(officeLat, officeLon, partnerLat, partnerLon)
		).toBeCloseTo(0);
	});
});
