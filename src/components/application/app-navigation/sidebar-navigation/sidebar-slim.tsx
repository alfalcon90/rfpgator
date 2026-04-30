"use client";

import type { FC } from "react";
import { useState } from "react";
import { LifeBuoy01, Settings01 } from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavAccountCard, NavAccountMenu } from "../base-components/nav-account-card";
import { NavButton } from "../base-components/nav-button";
import { NavItemBase } from "../base-components/nav-item";
import { NavList } from "../base-components/nav-list";
import type { NavItemType } from "../config";

interface SidebarNavigationSlimProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: (NavItemType & { icon: FC<{ className?: string }> })[];
    /** List of footer items to display. */
    footerItems?: (NavItemType & { icon: FC<{ className?: string }> })[];
    /** Whether to hide the border. */
    hideBorder?: boolean;
    /** Whether to hide the right side border. */
    hideRightBorder?: boolean;
}

export const SidebarNavigationSlim = ({ activeUrl, items, footerItems = [], hideBorder }: SidebarNavigationSlimProps) => {
    const activeItem = [...items, ...footerItems].find((item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl));
    const [currentItem, setCurrentItem] = useState(activeItem || items[1]);

    const MAIN_SIDEBAR_WIDTH = 80;

    const mainSidebar = (
        <aside
            style={{
                width: MAIN_SIDEBAR_WIDTH,
            }}
            className={cx("group flex h-full max-h-full max-w-full overflow-y-visible p-2 transition duration-100 ease-linear")}
        >
            <div
                className={cx(
                    "flex w-auto flex-col justify-between rounded-xl bg-brand-solid pt-5 shadow-xl shadow-bg-brand-solid transition duration-300 ring-inset",
                    hideBorder && "ring-transparent",
                )}
            >
                <div className="flex justify-center px-3">
                    <UntitledLogoMinimal className="size-6" />
                </div>

                <ul className="mt-5 flex flex-col items-center gap-0.5">
                    {items.map((item) => (
                        <li key={item.label}>
                            <NavButton
                                current={currentItem.href === item.href}
                                href={item.href}
                                label={item.label || ""}
                                icon={item.icon}
                                onClick={() => setCurrentItem(item)}
                            />
                        </li>
                    ))}
                </ul>
                <div className="mt-auto flex flex-col items-center gap-3 px-3 py-4">
                    {footerItems.length > 0 && (
                        <ul className="flex flex-col gap-0.5">
                            {footerItems.map((item) => (
                                <li key={item.label}>
                                    <NavButton
                                        current={currentItem.href === item.href}
                                        label={item.label || ""}
                                        href={item.href}
                                        icon={item.icon}
                                        onClick={() => setCurrentItem(item)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    <AriaDialogTrigger>
                        <AriaButton
                            className={({ isPressed, isFocused }) =>
                                cx("group relative inline-flex rounded-full", (isPressed || isFocused) && "outline-2 outline-offset-2 outline-focus-ring")
                            }
                        >
                            <Avatar border src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" size="md" alt="Olivia Rhye" />
                        </AriaButton>
                        <AriaPopover
                            placement="right bottom"
                            offset={8}
                            crossOffset={6}
                            className={({ isEntering, isExiting }) =>
                                cx(
                                    "will-change-transform",
                                    isEntering &&
                                        "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                    isExiting &&
                                        "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                )
                            }
                        >
                            <NavAccountMenu />
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop sidebar navigation */}
            <div className="z-50 hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{mainSidebar}</div>

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <div
                style={{
                    paddingLeft: MAIN_SIDEBAR_WIDTH,
                }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />

            {/* Mobile header navigation */}
            <MobileNavigationHeader>
                <aside className="group flex h-full max-h-full w-full max-w-full flex-col justify-between overflow-y-auto bg-primary pt-4">
                    <div className="px-4">
                        <UntitledLogo className="h-6" />
                    </div>

                    <NavList items={items} />

                    <div className="mt-auto flex flex-col gap-3 p-4">
                        <div className="flex flex-col">
                            <NavItemBase current={activeUrl === "/support"} type="link" href="/support" icon={LifeBuoy01}>
                                Support
                            </NavItemBase>
                            <NavItemBase current={activeUrl === "/settings"} type="link" href="/settings" icon={Settings01}>
                                Settings
                            </NavItemBase>
                        </div>

                        <NavAccountCard />
                    </div>
                </aside>
            </MobileNavigationHeader>
        </>
    );
};
