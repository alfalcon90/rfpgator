import type { Metadata, Viewport } from "next";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import { Toaster } from "@/components/application/notifications/toaster";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
    title: "RFP Gator",
    description: "RFP Gator is a tool for managing RFPs.",
};

export const viewport: Viewport = {
    themeColor: "#7f56d9",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://api.fontshare.com" />
                <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
                <link
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={cx("bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>
                        <Toaster />
                        {children}
                    </Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
