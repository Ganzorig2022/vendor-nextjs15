"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/core/constants/routes";
import Image from "next/image";
import Link from "next/link";

type Props = {
	token: string | null;
};

export default function NotFoundClient({ token }: Props) {
	const route = token ? ROUTES.protected.home : ROUTES.auth.login;
	const label = token ? "Буцах" : "Нэвтрэх хуудас руу буцах";

	return (
		<div className="flex flex-col gap-4 items-center justify-center text-muted-foreground min-h-screen py-20">
			<Image
				src="/error.png"
				height={300}
				width={300}
				alt="Error"
				className="dark:hidden"
				priority
			/>

			<p className="text-lg text-center">
				Хуудас олдсонгүй. Та{" "}
				<span className="font-semibold text-primary">
					{token ? "нүүр" : "нэвтрэх"}
				</span>{" "}
				хуудас руу буцна уу.
			</p>

			<Button
				asChild
				variant="default">
				<Link href={route}>{label}</Link>
			</Button>
		</div>
	);
}
