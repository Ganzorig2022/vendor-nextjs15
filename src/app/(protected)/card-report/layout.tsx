import { MainContent } from "@/components/main-content";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const CardReportLayoutContent = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<main className="">
			<MainContent leftTitle="Картын гүйлгээний тайлан">{children}</MainContent>
		</main>
	);
};

const CardReportLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Suspense fallback={<Spinner className="mt-auto" />}>
			<CardReportLayoutContent>
				{children}
			</CardReportLayoutContent>
		</Suspense>
	);
};

export default CardReportLayout;
