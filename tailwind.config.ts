import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Geologica", "sans-serif"],
			},
		},
	},
	plugins: [
		plugin(({ addComponents }) => {
			addComponents({
				".transition-allow-discrete": {
					"transition-behavior": "allow-discrete",
				},
			});
		}),
		({ addVariant }) => {
			addVariant("starting", "@starting-style");
		},
	],
} satisfies Config;
