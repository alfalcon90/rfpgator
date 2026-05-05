"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SearchLg } from "@untitledui/icons";
import {
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Popover as AriaPopover,
} from "react-aria-components";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import type { Rfp } from "@/types/rfp";
import { cx } from "@/utils/cx";

/* ──────────────────────────────────────────────────────────
   Publishing-site filter
   ────────────────────────────────────────────────────────── */

interface PublishingSiteFilterProps {
    /** All RFPs currently being displayed — unique publishingAgency values are derived from this. */
    rfps: Rfp[];
    /** Currently-selected site (empty string = "All sites"). */
    value: string;
    /** Called when the user picks a different site. */
    onChange: (site: string) => void;
}

export const PublishingSiteFilter = ({ rfps, value, onChange }: PublishingSiteFilterProps) => {
    const [search, setSearch] = useState("");

    const sites = useMemo(() => {
        const set = new Set<string>();
        for (const rfp of rfps) {
            if (rfp.publishingAgency) set.add(rfp.publishingAgency);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [rfps]);

    const filtered = useMemo(() => {
        if (!search) return sites;
        const q = search.toLowerCase();
        return sites.filter((s) => s.toLowerCase().includes(q));
    }, [sites, search]);

    const label = value || "All sites";

    return (
        <AriaDialogTrigger>
            <Button
                color="secondary"
                size="sm"
                iconTrailing={ChevronDown}
                className={cx("max-h-9", value && "bg-primary_hover")}
            >
                <span className="flex items-center gap-1.5 text-sm">
                    <span className="text-quaternary">Site:</span>
                    {label}
                </span>
            </Button>
            <AriaPopover
                placement="bottom start"
                offset={4}
                containerPadding={0}
                className={(state) =>
                    cx(
                        "w-[260px] origin-(--trigger-anchor-point) will-change-transform",
                        state.isEntering &&
                            "duration-150 ease-out animate-in fade-in placement-bottom:slide-in-from-top-0.5",
                        state.isExiting &&
                            "duration-100 ease-in animate-out fade-out placement-bottom:slide-out-to-top-0.5",
                    )
                }
            >
                <AriaDialog className="flex max-h-80 flex-col overflow-hidden rounded-lg bg-primary shadow-lg ring-1 ring-secondary_alt outline-hidden">
                    {/* Search input */}
                    <div className="border-b border-secondary p-2">
                        <Input
                            size="sm"
                            aria-label="Search publishing sites"
                            placeholder="Search sites…"
                            autoFocus
                            icon={SearchLg}
                            value={search}
                            onChange={setSearch}
                        />
                    </div>

                    {/* Radio list */}
                    <div className="flex-1 overflow-y-auto p-2">
                        <RadioGroup
                            aria-label="Publishing site"
                            value={value}
                            onChange={(v) => onChange(v)}
                            className="gap-0"
                        >
                            {/* "All sites" always shows first */}
                            {(!search || "all sites".includes(search.toLowerCase())) && (
                                <RadioButton
                                    value=""
                                    label="All sites"
                                    className="rounded-md px-2 py-1.5 hover:bg-primary_hover"
                                />
                            )}
                            {filtered.map((site) => (
                                <RadioButton
                                    key={site}
                                    value={site}
                                    label={site}
                                    className="rounded-md px-2 py-1.5 hover:bg-primary_hover"
                                />
                            ))}
                            {filtered.length === 0 && search && !("all sites".includes(search.toLowerCase())) && (
                                <p className="px-2 py-3 text-center text-sm text-tertiary">No sites match "{search}"</p>
                            )}
                        </RadioGroup>
                    </div>
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};

/* ──────────────────────────────────────────────────────────
   Semantic-threshold filter
   ────────────────────────────────────────────────────────── */

interface SemanticThresholdFilterProps {
    value: number;
    onChange: (v: number) => void;
}

export const SemanticThresholdFilter = ({ value, onChange }: SemanticThresholdFilterProps) => {
    const [draft, setDraft] = useState(String(value));

    const commit = () => {
        const parsed = parseFloat(draft);
        if (Number.isNaN(parsed)) {
            setDraft(String(value));
            return;
        }
        const clamped = Math.min(1, Math.max(0, parsed));
        onChange(clamped);
        setDraft(String(clamped));
    };

    return (
        <AriaDialogTrigger>
            <Button
                color="secondary"
                size="sm"
                iconTrailing={ChevronDown}
                className={cx("max-h-9", value !== 0 && "bg-primary_hover")}
            >
                <span className="flex items-center gap-1.5 text-sm">
                    <span className="text-quaternary">Threshold:</span>
                    {value}
                </span>
            </Button>
            <AriaPopover
                placement="bottom start"
                offset={4}
                containerPadding={0}
                className={(state) =>
                    cx(
                        "w-[240px] origin-(--trigger-anchor-point) will-change-transform",
                        state.isEntering &&
                            "duration-150 ease-out animate-in fade-in placement-bottom:slide-in-from-top-0.5",
                        state.isExiting &&
                            "duration-100 ease-in animate-out fade-out placement-bottom:slide-out-to-top-0.5",
                    )
                }
            >
                <AriaDialog className="rounded-lg bg-primary p-4 shadow-lg ring-1 ring-secondary_alt outline-hidden">
                    <Input
                        autoFocus
                        label="Semantic threshold"
                        size="sm"
                        aria-label="Semantic threshold"
                        placeholder="0.00"
                        value={draft}
                        onChange={setDraft}
                        onBlur={commit}
                        onKeyDown={(e) => e.key === "Enter" && commit()}
                    />
                    <p className="mt-2 text-xs text-tertiary">
                        Minimum relevance score (0–1) required for results to appear.
                    </p>
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};
