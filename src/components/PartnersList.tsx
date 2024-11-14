import { PartnerCard } from "@/components/PartnerCard";
import { Separator } from "@/components/Separator";
import { usePartners } from "@/hooks/use-partners";
import { cn } from "@/utils/cn";

export const PartnersList = () => {
	const [partners] = usePartners();

	return (
		<div
			className={cn(
				"flex flex-col md:flex-row min-h-0 max-h-full transition-all transition-allow-discrete duration-300 origin-bottom md:origin-right",
				partners.length
					? "flex starting:flex-initial starting:grow-[0.0001] flex-1"
					: "hidden starting:flex-1 flex-initial grow-[0.0001]"
			)}>
			<Separator />
			<div
				className={cn(
					"flex-1 flex-col min-h-0 max-h-full transition-allow-discrete transition-opacity delay-500 duration-300",
					partners.length
						? "flex starting:opacity-0 opacity-100"
						: "hidden starting:opacity-100 opacity-0"
				)}>
				<div className="md:grow md:shrink-0 md:flex md:items-end md:h-16 md:mt-6 p-6">
					<h1 className="text-2xl font-bold">Partners within 100km</h1>
				</div>
				<ul className="flex flex-col px-6 pb-6 gap-4 max-h-full overflow-y-auto">
					{partners.map((partner) => (
						<PartnerCard
							key={`Partner__Card__${partner.partner_id}`}
							partner={partner}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};
