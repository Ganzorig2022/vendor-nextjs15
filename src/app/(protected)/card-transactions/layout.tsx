"use client";
import { MainContent } from "@/components/main-content";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const CardTransactionsLayoutContent = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<main className="">
			<MainContent
				leftTitle="Картын гүйлгээ
">
				{children}
			</MainContent>
		</main>
	);
};

const CardTransactionsLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Suspense fallback={<Spinner className="mt-auto" />}>
			<CardTransactionsLayoutContent>
				{children}
			</CardTransactionsLayoutContent>
		</Suspense>
	);
};

export default CardTransactionsLayout;
