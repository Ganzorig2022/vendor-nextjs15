"use client";

import Link from "next/link";
import Image from "next/image";

export default function Help() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 py-6">
			<Link
				href="/help/manual.pdf"
				target="_blank"
				rel="noopener noreferrer"
				className="group flex flex-col items-center text-center">
				<div className="border rounded-2xl overflow-hidden shadow-sm transition-all group-hover:shadow-md">
					<Image
						src="/help/book-cover.png"
						alt="Хэрэглэгчийн гарын авлага"
						width={200}
						height={200}
						priority
						sizes="200px"
						className="object-contain w-auto h-auto"
					/>
				</div>
				<span className="mt-2 text-xs font-medium text-foreground group-hover:text-primary">
					Хэрэглэгчийн гарын авлага
				</span>
			</Link>
		</div>
	);
}
