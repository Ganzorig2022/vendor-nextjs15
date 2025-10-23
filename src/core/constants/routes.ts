export const ROUTES = {
	auth: {
		login: "/login",
	},
	protected: {
		home: "/",
		merchant: "/merchant",
		cardTransactions: "/card-transactions",
		cardReport: "/card-report",
		p2pTransactions: "/p2p-transactions",
		p2pReport: "/p2p-report",
		profile: "/profile",
		help: "/help",
	},
	excluded: {
		next: "/_next",
		api: "/api",
		static: "/static",
		favicon: "/favicon.ico",
	},
} as const;

export const AUTH_ROUTES = Object.values(ROUTES.auth);
export const PROTECTED_ROUTES = Object.values(ROUTES.protected);
export const EXCLUDED_PATHS = Object.values(ROUTES.excluded);

export const isAuthRoute = (pathname: string) =>
	AUTH_ROUTES.some((route) => pathname === route);

export const isProtectedRoute = (pathname: string) =>
	PROTECTED_ROUTES.some(
		(route) => pathname === route || pathname.startsWith(route + "/")
	);

export const isExcludedPath = (pathname: string) =>
	EXCLUDED_PATHS.some((route) => pathname.startsWith(route));
