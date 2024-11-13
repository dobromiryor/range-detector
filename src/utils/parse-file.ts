import { partnerSchema, type Partner } from "../schemas/partner.schema";

export const parsePartnersFromFile = (fileContent: string): Partner[] => {
	const lines = fileContent.split(/\r?\n/).filter((line) => line.trim() !== "");
	const parsedLines = lines.map((line) => JSON.parse(line));

	const { success, data: parsedPartners } = partnerSchema
		.array()
		.safeParse(parsedLines);

	if (!success) throw new Error("Invalid file content.");

	return parsedPartners;
};
