"use client";

import { useEffect } from "react";

interface KeyboardShortcut {
    key: string;
    action: () => void;
}

interface UseShortcutsOptions<T extends { id: string }> {
    items: T[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    /** Extra key shortcuts that are only active when an item is selected. */
    shortcuts?: KeyboardShortcut[];
}

/**
 * Handles ArrowUp/ArrowDown to move through a list, Escape to clear selection,
 * and optional custom shortcuts. Skips events when an input, textarea, or
 * contentEditable element is focused.
 */
export function useShortcuts<T extends { id: string }>({ items, selectedId, onSelect, shortcuts }: UseShortcutsOptions<T>) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedId) return;

            const target = e.target as HTMLElement;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

            const currentIndex = items.findIndex((item) => item.id === selectedId);
            if (currentIndex === -1) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                const nextIndex = Math.min(currentIndex + 1, items.length - 1);
                onSelect(items[nextIndex].id);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prevIndex = Math.max(currentIndex - 1, 0);
                onSelect(items[prevIndex].id);
            } else if (e.key === "Escape") {
                onSelect(null);
            } else {
                const match = shortcuts?.find((s) => s.key.toLowerCase() === e.key.toLowerCase());
                if (match) {
                    e.preventDefault();
                    match.action();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [items, selectedId, onSelect, shortcuts]);
}
