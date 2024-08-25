import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from './routes';
import { auth as Session } from './auth';

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth(async (req) => {
    const { nextUrl } = req;
    const session = await Session();
    const role = session?.user?.role;

    const asramaRoute = nextUrl.pathname.startsWith('/data');
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicApiRoute = nextUrl.pathname.includes('/api/student');
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    console.log(nextUrl.pathname);
    if (isApiAuthRoute || isPublicApiRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            if (role === 'ASRAMA') {
                return Response.redirect(new URL('/data', nextUrl));
            }
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }

    if (role === 'ASRAMA' && !asramaRoute) {
        return Response.redirect(new URL('/data', nextUrl));
    }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
