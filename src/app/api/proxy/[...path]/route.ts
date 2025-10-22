import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Make sure this points to your actual backend
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleRequest(
	request: NextRequest,
	context: { params: Promise<{ path: string[] }> }
) {
	try {
		const { path } = await context.params;

		// Get token from cookie - this works in route handlers
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value;

		if (!accessToken) {
			return NextResponse.json(
				{ ok: false, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Build the target URL
		const targetPath = path.join("/");
		console.log("👉Proxying request to:", targetPath); // Debug log

		const searchParams = request.nextUrl.searchParams.toString();
		const targetUrl = `${BACKEND_URL}/${targetPath}${searchParams ? `?${searchParams}` : ""}`;

		console.log("👉Proxying request to:", targetUrl); // Debug log

		// Get request body if present
		let body = undefined;
		if (request.method !== "GET" && request.method !== "HEAD") {
			body = await request.text();
		}

		// Forward the request to your backend
		const response = await fetch(targetUrl, {
			method: request.method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type":
					request.headers.get("content-type") || "application/json",
			},
			body,
		});

		const data = await response.text();

		return new NextResponse(data, {
			status: response.status,
			headers: {
				"Content-Type":
					response.headers.get("content-type") || "application/json",
			},
		});
	} catch (error) {
		console.error("Proxy error:", error);
		return NextResponse.json(
			{ ok: false, message: "Proxy request failed" },
			{ status: 500 }
		);
	}
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
