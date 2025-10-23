import { MainContent } from "@/components/main-content";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const P2pTransactionsLayoutContent = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<main className="">
			<MainContent
				leftTitle="Дансны гүйлгээ
">
				{children}
			</MainContent>
		</main>
	);
};

const P2pTransactionsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Suspense fallback={<Spinner className="mt-auto" />}>
			<P2pTransactionsLayoutContent>
				{children}
			</P2pTransactionsLayoutContent>
		</Suspense>
	);
};

export default P2pTransactionsLayout;
