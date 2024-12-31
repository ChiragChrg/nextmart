import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT, ADMIN_BASE_ROUTE } from '@/lib/routes';

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
    const session = await auth();
    const { nextUrl } = req;
    const isLoggedIn = !!session
    const isProtectedRoutes = protectedRoutes.some(route => nextUrl.pathname === route);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith(ADMIN_BASE_ROUTE);

    // console.log("\nMiddleware : ", { nextUrl: nextUrl.pathname, isLoggedIn, isProtectedRoutes, isAuthRoute })

    if (isAdminRoute) {
        if (!isLoggedIn) {
            console.warn("ADMIN_ERR: Admin not logged In")
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        const isAdmin = session.user.email === process.env.ADMIN_EMAIL
        if (!isAdmin) {
            console.warn("ADMIN_ERR: Invalid Admin Email")
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            // Redirect logged-in user from auth routes to home page
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return NextResponse.next();
    }

    if (!isLoggedIn && isProtectedRoutes) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    return NextResponse.next();
})


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}