import { z } from "zod";

export const partnerSchema = z.object({
	partner_id: z.number(),
	name: z.string(),
	latitude: z.string(),
	longitude: z.string(),
});

export type Partner = z.infer<typeof partnerSchema>;

export const processedPartner = partnerSchema.extend({
	distance: z.number(),
});

export type ProcessedPartner = z.infer<typeof processedPartner>;
