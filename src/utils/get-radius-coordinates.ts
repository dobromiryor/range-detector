import { R } from "@/consts/earth-radius.const";
import { MAX_DISTANCE } from "@/consts/max-distance.const";
import { degreesToRadians } from "@/utils/degrees-to-radians";
import { radiansToDegrees } from "@/utils/radians-to-degrees";

export const getRadiusCoordinates = (
	lat: number,
	lon: number,
	distanceKm: number = MAX_DISTANCE,
	bearing: number = degreesToRadians(Math.random() * 360)
): { latitude: number; longitude: number } => {
	if (bearing > 360 || bearing < 0)
		throw new Error("Bearing must be between 0 and 360");

	const officeLatRadians = degreesToRadians(lat);
	const officeLonRadians = degreesToRadians(lon);

	const partnerLatRadians = Math.asin(
		Math.sin(officeLatRadians) * Math.cos(distanceKm / R) +
			Math.cos(officeLatRadians) * Math.sin(distanceKm / R) * Math.cos(bearing)
	);

	const partnerLonRadians =
		officeLonRadians +
		Math.atan2(
			Math.sin(bearing) * Math.sin(distanceKm / R) * Math.cos(officeLatRadians),
			Math.cos(distanceKm / R) -
				Math.sin(officeLatRadians) * Math.sin(partnerLatRadians)
		);

	return {
		latitude: radiansToDegrees(partnerLatRadians),
		longitude: radiansToDegrees(partnerLonRadians),
	};
};
