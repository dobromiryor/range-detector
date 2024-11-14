import type { ProcessedPartner } from "@/schemas/partner.schema";
import {
	createContext,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";

type PartnersContextType =
	| [ProcessedPartner[], Dispatch<SetStateAction<ProcessedPartner[]>>]
	| undefined;

const PartnersContext = createContext<PartnersContextType>(undefined);

interface PartnersProviderProps {
	children: ReactNode;
}

const PartnersProvider = ({ children }: PartnersProviderProps) => {
	const [partners, setPartners] = useState<ProcessedPartner[]>([]);

	return (
		<PartnersContext.Provider value={[partners, setPartners]}>
			{children}
		</PartnersContext.Provider>
	);
};

export { PartnersContext, PartnersProvider };
