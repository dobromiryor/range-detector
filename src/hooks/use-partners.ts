import { PartnersContext } from "@/providers/partners.provider";
import { useContext } from "react";

export const usePartners = () => {
	const context = useContext(PartnersContext);

	if (!context)
		throw new Error("usePartners must be used within a PartnersProvider");

	return context;
};
