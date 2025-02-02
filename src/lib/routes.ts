export const adminRoutes = ["/admin"];
export const protectedRoutes = ["/profile", "/orders", "/checkout", "/payment"];
export const publicRoutes = ["/", "/search/:query", "/product/:productId"];

export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
];

export const DEFAULT_LOGIN_REDIRECT = "/";
export const ADMIN_BASE_REDIRECT = "/admin";
export const ADMIN_DASHBOARD_REDIRECT = "/admin/dashboard";
