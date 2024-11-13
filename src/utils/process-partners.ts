import { MAX_DISTANCE } from "@/consts/max-distance.const";
import { OFFICE_LOCATION } from "@/consts/offlice-location.const";
import type { Partner, ProcessedPartner } from "@/schemas/partner.schema";
import { calculateDistance } from "@/utils/calculate-distance";

export const processPartners = (
	partners: Partner[],
	maxDistance: number = MAX_DISTANCE
): ProcessedPartner[] => {
	const processedPartners = partners
		.map((partner) => {
			const partnerLatitude = parseFloat(partner.latitude);
			const partnerLongitude = parseFloat(partner.longitude);

			if (isNaN(partnerLatitude) || isNaN(partnerLongitude))
				throw new Error("Invalid coordinates");

			return {
				...partner,
				distance: calculateDistance(
					OFFICE_LOCATION.latitude,
					OFFICE_LOCATION.longitude,
					partnerLatitude,
					partnerLongitude
				),
			};
		})
		.filter((partner) => partner.distance <= maxDistance)
		.sort((a, b) => a.partner_id - b.partner_id);

	return processedPartners;
};
