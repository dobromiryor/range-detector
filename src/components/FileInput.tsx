import { usePartners } from "@/hooks/use-partners";
import { cn } from "@/utils/cn";
import { useState, type ChangeEvent } from "react";

interface FileInputProps {
	error: Error | null;
	onFileLoad: (fileContent: string) => void;
}

export const FileInput = ({ error, onFileLoad }: FileInputProps) => {
	const [fileName, setFileName] = useState<string | undefined>();
	const [_partners, setPartners] = usePartners();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			setPartners([]);
			setFileName(undefined);
			onFileLoad("");
			return;
		}

		setFileName(file.name);

		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			onFileLoad(content);
		};
		reader.readAsText(file);
	};

	return (
		<div
			className={cn(
				"relative flex-1 flex items-center justify-center p-10 border border-dashed rounded-lg",
				error ? "border-red-500" : "border-inherit"
			)}>
			<button
				className="flex flex-col items-center justify-center w-full"
				tabIndex={-1}>
				<input
					id="fileInput"
					type="file"
					accept=".txt,.json"
					onChange={handleFileChange}
					className="absolute inset-0 cursor-pointer rounded-lg file:hidden text-white/0"
				/>
				<label
					htmlFor="fileInput"
					className={cn(
						error ? "text-red-500" : fileName ? "text-black" : "text-black/50",
						"font-medium"
					)}>
					{error?.message ??
						fileName ??
						"Drop partners file or press here to select."}
				</label>
			</button>
		</div>
	);
};
