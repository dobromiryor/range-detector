import { Button } from "@/components/Button";
import { FileInput } from "@/components/FileInput";
import { usePartners } from "@/hooks/use-partners";
import type { Partner } from "@/schemas/partner.schema";
import { parsePartnersFromFile } from "@/utils/parse-file";
import { processPartners } from "@/utils/process-partners";
import { useState } from "react";

export const FileForm = () => {
	const [partners, setPartners] = usePartners();
	const [error, setError] = useState<Error | null>(null);
	const [parsedContent, setParsedContent] = useState<Partner[]>([]);

	const handleFileLoad = (content: string) => {
		setError(null);

		try {
			const parsedPartners = parsePartnersFromFile(content);

			setParsedContent(parsedPartners);
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
				setPartners([]);
			}
		}
	};

	const handleRangeDetection = () => {
		if (!parsedContent) return;
		setPartners(processPartners(parsedContent));
	};

	const handleExport = () => {
		if (!partners.length) return;

		const a = document.createElement("a");

		const content = partners
			.map(({ partner_id, name }) => JSON.stringify({ partner_id, name }))
			.join("\n");

		const file = new Blob([content], { type: "text/plain" });
		a.href = URL.createObjectURL(file);

		a.download = "partners.txt";
		document.body.appendChild(a);
		a.click();
	};

	return (
		<div className="flex-1 flex flex-col gap-4">
			<FileInput onFileLoad={handleFileLoad} error={error} />

			<div className="flex justify-between">
				<Button
					variant="outline"
					disabled={!!error || !partners.length}
					onClick={handleExport}>
					Export
				</Button>
				<Button
					disabled={
						(!parsedContent.length && !partners.length) ||
						!parsedContent.length ||
						!!error
					}
					onClick={handleRangeDetection}>
					Detect
				</Button>
			</div>
		</div>
	);
};
