import { FileForm } from "@/components/FileForm";
import { Logo } from "@/components/Logo";
import { PartnersList } from "@/components/PartnersList";
import { usePartners } from "@/hooks/use-partners";
import { cn } from "@/utils/cn";

function App() {
	const [partners] = usePartners();

	return (
		<main className="flex justify-center items-center bg-black sm:p-6 min-h-0 h-dvh overflow-hidden">
			<section className="flex-1 flex flex-col md:flex-row h-full max-h-[1080px] max-w-screen-xl bg-white sm:rounded-2xl overflow-hidden">
				<div
					className={cn(
						partners.length
							? "starting:flex-1 grow-[0.0001] flex-initial"
							: "starting:flex-initial starting:grow-[0.0001] flex-1",
						"md:flex-1 flex flex-col p-6 gap-6 transition-all duration-300"
					)}>
					<Logo />
					<FileForm />
				</div>
				<PartnersList />
			</section>
		</main>
	);
}

export default App;
