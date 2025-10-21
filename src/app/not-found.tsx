import NotFoundClient from "@/components/not-found-client";
import { cookies } from "next/headers";

export default async function NotFoundPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token")?.value || null;

	return <NotFoundClient token={token} />;
}
