import { usePartners } from "@/hooks/use-partners";
import { cn } from "@/utils/cn";

export const Separator = () => {
	const [partners] = usePartners();

	return (
		<div
			className={cn(
				"border-t md:border-l transition-allow-discrete transition-opacity delay-300 duration-300",
				partners.length
					? "block starting:opacity-0 opacity-100"
					: "hidden starting:opacity-100 opacity-0"
			)}
		/>
	);
};
