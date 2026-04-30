"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import { CloseButton } from "@/components/base/buttons/close-button";
import { cx } from "@/utils/cx";

interface DetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

const Root = ({ isOpen, onClose, children, className }: DetailPanelProps) => {
    return (
        <aside
            className={cx(
                "fixed inset-y-0 right-0 z-30 flex w-2/3 flex-col border-l border-secondary bg-primary shadow-xl transition-transform duration-300 ease-out",
                isOpen ? "translate-x-0" : "translate-x-full",
                className,
            )}
        >
            {children}
        </aside>
    );
};
Root.displayName = "DetailPanel";

interface HeaderProps extends ComponentPropsWithRef<"header"> {
    onClose?: () => void;
}

const Header = ({ className, children, onClose, ...props }: HeaderProps) => {
    return (
        <header {...props} className={cx("flex items-start gap-4 border-b border-secondary p-6", className)}>
            {onClose && <CloseButton size="sm" onPress={onClose} />}
            {children}
        </header>
    );
};
Header.displayName = "DetailPanel.Header";

const Content = (props: ComponentPropsWithRef<"div">) => {
    return <div {...props} className={cx("flex-1 overflow-y-auto p-6", props.className)} />;
};
Content.displayName = "DetailPanel.Content";

const DetailPanel = Root as typeof Root & {
    Header: typeof Header;
    Content: typeof Content;
};
DetailPanel.Header = Header;
DetailPanel.Content = Content;

export { DetailPanel };
