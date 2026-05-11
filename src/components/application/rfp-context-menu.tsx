"use client";

import { type MouseEvent, useCallback, useRef, useState } from "react";
import { Copy01, Star01, XSquare } from "@untitledui/icons";
import { toast } from "sonner";
import { IconNotification } from "@/components/application/notifications/notifications";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { useUpdateRfpStatus } from "@/data/rfp-store";
import type { Rfp } from "@/types/rfp";
import { Status } from "@/types/rfp";

interface ContextMenuState {
    x: number;
    y: number;
    rfpId: string;
}

export function useRfpContextMenu(rfps: Rfp[]) {
    const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
    const updateRfpStatus = useUpdateRfpStatus();

    const handleContextMenu = useCallback((e: MouseEvent, rfpId: string) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, rfpId });
    }, []);

    const handleAction = useCallback(
        (key: React.Key) => {
            if (!contextMenu) return;
            const rfp = rfps.find((r) => r.id === contextMenu.rfpId);
            if (!rfp) return;

            if (key === "ignore") {
                updateRfpStatus(contextMenu.rfpId, Status.Ignored);
                toast.custom((id) => (
                    <IconNotification title="RFP Ignored" description={rfp.title} color="gray" hideDismissLabel onClose={() => toast.dismiss(id)} />
                ));
            } else if (key === "save") {
                updateRfpStatus(contextMenu.rfpId, Status.Saved);
                toast.custom((id) => (
                    <IconNotification title="RFP Saved" description={rfp.title} color="success" hideDismissLabel onClose={() => toast.dismiss(id)} />
                ));
            } else if (key === "copy-link") {
                const url = rfp.submissionUrl ?? window.location.href;
                navigator.clipboard.writeText(url);
                toast.custom((id) => (
                    <IconNotification title="Link Copied" description="Copied to clipboard" color="gray" hideDismissLabel onClose={() => toast.dismiss(id)} />
                ));
            }

            setContextMenu(null);
        },
        [contextMenu, rfps, updateRfpStatus],
    );

    const close = useCallback(() => setContextMenu(null), []);

    return { contextMenu, handleContextMenu, handleAction, close };
}

interface RfpContextMenuProps {
    contextMenu: ContextMenuState;
    onAction: (key: React.Key) => void;
    onClose: () => void;
}

export function RfpContextMenu({ contextMenu, onAction, onClose }: RfpContextMenuProps) {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Invisible anchor positioned at mouse cursor */}
            <div
                ref={triggerRef}
                style={{
                    position: "fixed",
                    left: contextMenu.x,
                    top: contextMenu.y,
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                }}
            />
            <Dropdown.Popover
                isOpen
                onOpenChange={(open) => { if (!open) onClose(); }}
                triggerRef={triggerRef}
                placement="bottom start"
                className="w-min"
            >
                <Dropdown.Menu onAction={onAction}>
                    <Dropdown.Item id="ignore" icon={XSquare}>
                        <span className="pr-4">Ignore</span>
                    </Dropdown.Item>
                    <Dropdown.Item id="save" icon={Star01}>
                        <span className="pr-4">Save</span>
                    </Dropdown.Item>
                    <Dropdown.Item id="copy-link" icon={Copy01}>
                        <span className="pr-4">Copy link</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </>
    );
}
