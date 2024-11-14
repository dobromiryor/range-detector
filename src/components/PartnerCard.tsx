import type { ProcessedPartner } from "@/schemas/partner.schema";

interface PartnerCardProps {
	partner: ProcessedPartner;
}

export const PartnerCard = ({ partner }: PartnerCardProps) => {
	return (
		<li className="flex justify-between items-baseline gap-4 border bg-white p-4 rounded-lg select-none shadow-none hover:shadow-lg transition-shadow">
			<div className="flex gap-1 items-baseline">
				<span className="text-lg">{partner.name}</span>
				<span className="text-black/50 text-sm">#{partner.partner_id}</span>
			</div>
			<span className="text-sm">{partner.distance.toFixed(2)}km</span>
		</li>
	);
};
