import { MAX_DISTANCE } from "@/consts/max-distance.const";
import { OFFICE_LOCATION } from "@/consts/offlice-location.const";
import type { Partner } from "@/schemas/partner.schema";
import { getRadiusCoordinates } from "@/utils/get-radius-coordinates";
import { processPartners } from "@/utils/process-partners";
import { describe, expect, it } from "vitest";

const getPartnerCoordinates = (distanceKm: number) => {
	const { latitude, longitude } = getRadiusCoordinates(
		OFFICE_LOCATION.latitude,
		OFFICE_LOCATION.longitude,
		distanceKm
	);

	return {
		latitude: latitude.toString(),
		longitude: longitude.toString(),
	};
};

describe("processPartners", () => {
	it("returns an empty array when partners array is empty", () => {
		const partners: Partner[] = [];
		const result = processPartners(partners);
		expect(result).toEqual([]);
	});

	it("returns partners within max distance", () => {
		const partners: Partner[] = [
			{
				partner_id: 1,
				name: "Partner 1",
				...getPartnerCoordinates(MAX_DISTANCE - 10),
			},
			{
				partner_id: 2,
				name: "Partner 2",
				...getPartnerCoordinates(MAX_DISTANCE - 1),
			},
		];
		const result = processPartners(partners);
		expect(result.length).toBe(2);
	});

	it("filters out partners outside max distance", () => {
		const partners: Partner[] = [
			{
				partner_id: 1,
				name: "Partner 1",
				...getPartnerCoordinates(MAX_DISTANCE - 10),
			},
			{
				partner_id: 2,
				name: "Partner 2",
				...getPartnerCoordinates(MAX_DISTANCE + 10),
			},
		];
		const result = processPartners(partners);
		expect(result.length).toBe(1);
	});

	it("uses custom max distance when provided", () => {
		const customMaxDistance = 50;

		const partners: Partner[] = [
			{
				partner_id: 1,
				name: "Partner 1",
				...getPartnerCoordinates(customMaxDistance - 10),
			},
			{
				partner_id: 2,
				name: "Partner 2",
				...getPartnerCoordinates(customMaxDistance - 1),
			},
		];
		const result = processPartners(partners, customMaxDistance);
		expect(result.length).toBe(2);
	});

	it("throws an error when partner data is invalid", () => {
		const partners: Partner[] = [
			{
				partner_id: 1,
				name: "Partner 1",
				latitude: "not a number",
				longitude: "24.000000",
			},
		];
		expect(() => processPartners(partners)).toThrowError();
	});
});
