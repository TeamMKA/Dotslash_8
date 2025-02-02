import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import GoogleTranslate from '@/components/GoogleTranslate';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">{children}</main>
                <div className="mx-auto w-full flex justify-center items-center">
                    {' '}
                    <GoogleTranslate />
                </div>{' '}
            </body>
        </html>
    );
}
