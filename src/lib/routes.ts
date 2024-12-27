export const adminRoutes = ["/admin"];
export const protectedRoutes = ["/profile", "/checkout", "/payment"];
export const publicRoutes = ["/", "/search/:query", "/product/:productID"];

export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
];

export const DEFAULT_LOGIN_REDIRECT = "/";