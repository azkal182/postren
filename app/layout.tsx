import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import 'tippy.js/dist/tippy.css';
import { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

const APP_NAME = 'Poskestren';
const APP_DEFAULT_TITLE = 'Poskestren Dashboard';
const APP_TITLE_TEMPLATE = '%s | Poskestren Dashboard';
const APP_DESCRIPTION = 'Best PWA app in the world!';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        template: APP_TITLE_TEMPLATE,
        default: APP_DEFAULT_TITLE,
    },
    description: APP_DESCRIPTION,
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: '#FFFFFF',
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
