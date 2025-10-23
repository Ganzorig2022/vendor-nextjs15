import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

async function proxyHandler(
	request: NextRequest,
	context: { params: Promise<{ path: string[] }> }
) {
	try {
		const { path } = await context.params;
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value;

		if (!accessToken) {
			return NextResponse.json(
				{ ok: false, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const targetPath = path.join("/");
		const searchParams = request.nextUrl.searchParams.toString();
		const targetUrl = `${BACKEND_URL}/${targetPath}${
			searchParams ? `?${searchParams}` : ""
		}`;

		console.log("🔁 Proxying to:", targetUrl);

		// --- Read request body safely ---
		let body: BodyInit | undefined;
		if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
			const contentType = request.headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
				body = JSON.stringify(await request.json());
			} else {
				body = await request.text();
			}
		}

		// --- Forward request to backend ---
		const response = await fetch(targetUrl, {
			method: request.method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type":
					request.headers.get("content-type") || "application/json",
			},
			body,
		});

		// --- Handle backend response ---
		const contentType = response.headers.get("content-type") || "";
		const responseBody = await response.text();

		return new NextResponse(responseBody, {
			status: response.status,
			headers: {
				"Content-Type": contentType,
			},
		});
	} catch (error) {
		console.error("❌ Proxy error:", error);
		return NextResponse.json(
			{ ok: false, message: "Сервертэй холбогдоход алдаа гарлаа." },
			{ status: 500 }
		);
	}
}

// ✅ Export handlers for all methods
export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const PATCH = proxyHandler;
export const DELETE = proxyHandler;
