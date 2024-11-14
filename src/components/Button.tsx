import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "solid" | "outline";
}

const buttonStyles: Record<ButtonProps["variant"] & string, string> = {
	solid:
		"border-black bg-black text-white disabled:hover:bg-black disabled:hover:border-black hover:bg-zinc-800 hover:border-zinc-800",
	outline:
		"border-black bg-white text-black disabled:hover:border-black disabled:hover:bg-white hover:bg-zinc-100 hover:border-zinc-800",
};

export const Button = ({
	children,
	className,
	variant = "solid",
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(
				buttonStyles[variant],
				"py-1 px-2 border font-medium rounded shadow-sm hover:shadow disabled:hover:shadow-sm disabled:opacity-50 transition-all",
				className
			)}
			{...props}>
			{children}
		</button>
	);
};
