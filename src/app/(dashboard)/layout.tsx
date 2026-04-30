"use client";

import type { ReactNode } from "react";
import { HomeLine, Inbox01, LifeBuoy01, Settings01, Star01, XSquare } from "@untitledui/icons";
import { usePathname } from "next/navigation";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { RfpStoreProvider } from "@/data/rfp-store";

const NAV_ITEMS = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Inbox", href: "/inbox", icon: Inbox01 },
    { label: "Saved", href: "/saved", icon: Star01 },
    { label: "Ignored", href: "/ignored", icon: XSquare },
];

const FOOTER_ITEMS = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <RfpStoreProvider>
            <div className="flex flex-col lg:flex-row">
                <SidebarNavigationSlim activeUrl={pathname} items={NAV_ITEMS} footerItems={FOOTER_ITEMS} />
                {children}
            </div>
        </RfpStoreProvider>
    );
}
