import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
	isAuthRoute,
	isProtectedRoute,
	isExcludedPath,
} from "@/core/constants/routes";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("access_token")?.value;
	const { pathname } = request.nextUrl;

	const hasValidToken = Boolean(
		token && token !== "undefined" && token.trim() !== ""
	);

	if (isExcludedPath(pathname)) {
		return NextResponse.next();
	}

	if (hasValidToken && isAuthRoute(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!hasValidToken && isProtectedRoute(pathname)) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next|api|static|favicon.ico|.*\\..*).*)"],
};
