import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    session: { strategy: 'jwt', maxAge: 60 * 60 },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ token, session }) {
            if (session.user) {
                return {
                    ...session,
                    user: {
                        id: token.sub,
                        name: token.name,
                        username: token.username,
                        role: token.role,
                        type: token.type
                    },
                };
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.username = user.username;
                token.role = user.role;
                token.type = user.type
            }

            return token;
        },
    },
    ...authConfig,
});
