import { partnerSchema, type Partner } from "@/schemas/partner.schema";

export const parsePartnersFromFile = (fileContent: string): Partner[] => {
	const lines = fileContent.split(/\r?\n/).filter((line) => line.trim() !== "");

	let parsedLines: object[] | null = null;

	try {
		parsedLines = lines.map((line) => JSON.parse(line));
	} catch (_) {
		throw new Error("Invalid file type or content.");
	}

	if (parsedLines.length === 0) throw new Error("File is empty.");

	const { success, data: parsedPartners } = partnerSchema
		.array()
		.safeParse(parsedLines);

	if (!success) throw new Error("Invalid content schema.");

	return parsedPartners;
};
