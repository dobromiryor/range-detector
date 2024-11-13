import { R } from "../consts/earth-radius.const";
import { degreesToRadians } from "./degrees-to-radians";

export const calculateDistance = (
	officeLat: number,
	officeLon: number,
	partnerLat: number,
	partnerLon: number
): number => {
	const officeLatRadians = degreesToRadians(officeLat);
	const partnerLatRadians = degreesToRadians(partnerLat);

	const latDifference = degreesToRadians(partnerLat - officeLat);
	const lonDifference = degreesToRadians(partnerLon - officeLon);

	const a =
		Math.sin(latDifference / 2) ** 2 +
		Math.cos(officeLatRadians) *
			Math.cos(partnerLatRadians) *
			Math.sin(lonDifference / 2) *
			Math.sin(lonDifference / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // distance in km
};
