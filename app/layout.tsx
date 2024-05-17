import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import 'tippy.js/dist/tippy.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
    title: {
        template: '%s | Poskestren Dashboard',
        default: 'Poskestren Dashboard',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={nunito.variable}>
                    <NextTopLoader showSpinner={false} />
                    <ProviderComponent>{children}</ProviderComponent>
                </body>
            </html>
        </SessionProvider>
    );
}
