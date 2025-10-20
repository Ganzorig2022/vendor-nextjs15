export const AUTH_ROUTES = ["/login", "/register"];
export const PROTECTED_ROUTES = ["/", "/dashboard", "/settings", "/profile"];
export const EXCLUDED_PATHS = ["/_next", "/api", "/static", "/favicon.ico"];

export const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((route) => pathname === route);

export const isProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

export const isExcludedPath = (pathname: string) =>
  EXCLUDED_PATHS.some((route) => pathname.startsWith(route));
