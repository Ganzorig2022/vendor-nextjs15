"use client";
import { MainContent } from "@/components/main-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MerchantLayoutContent = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const isMainPage = pathname === "/merchant";
	const searchParams = useSearchParams();
	const merchantType = searchParams.get("type");
	const merchantName = searchParams.get("name");

	return (
		<main className="">
			<MainContent
				leftTitle={
					!isMainPage ? (
						<div className="flex gap-2 items-center">
							<Link href={"/merchant"}>
								<Button
									variant="ghost"
									size="icon">
									<MoveLeft />
								</Button>
							</Link>
							<div>{merchantName}</div>
						</div>
					) : (
						"Мерчантын жагсаалт"
					)
				}
				leftContent={
					merchantType ? (
						<Badge
							className="text-[13px]"
							variant={
								merchantType === "PERSON"
									? "success"
									: "destructive"
							}>
							{merchantType === "PERSON"
								? "Иргэн"
								: "Байгууллага"}
						</Badge>
					) : undefined
				}
			>
				{children}
			</MainContent>
		</main>
	);
};

const MerchantLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Suspense>
			<MerchantLayoutContent>{children}</MerchantLayoutContent>
		</Suspense>
	);
};

export default MerchantLayout;
