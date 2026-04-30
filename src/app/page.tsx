"use client";

import { useCallback, useMemo, useState } from "react";
import { HomeLine, Inbox01, LifeBuoy01, SearchLg, Settings01, Settings04, Star01, XSquare } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { DetailPanel } from "@/components/application/detail-panel/detail-panel";
import { renderFilterRow, useFilterState } from "@/components/application/filter-bar/filter-bar.demo";
import { FilterDropdown } from "@/components/application/filter-bar/filter-dropdown-menu";
import { PaginationCardDefault, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { mockRfps } from "@/data/mock-rfps";
import { useListKeyboardNav } from "@/hooks/use-list-keyboard-nav";
import { cx } from "@/utils/cx";
import { getDueDaysLabel } from "@/utils/date";

export default function Home() {
    const filterState = useFilterState();
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "deliveryDate",
        direction: "descending",
    });
    const [selectedRfpId, setSelectedRfpId] = useState<string | null>(null);

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return mockRfps;

        return mockRfps.toSorted((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            if (typeof first === "number" && typeof second === "number") {
                return sortDescriptor.direction === "ascending" ? first - second : second - first;
            }

            if (typeof first === "string" && typeof second === "string") {
                const result = first.localeCompare(second);
                return sortDescriptor.direction === "ascending" ? result : -result;
            }

            return 0;
        });
    }, [sortDescriptor]);

    const selectedRfp = useMemo(() => {
        if (!selectedRfpId) return null;
        return sortedItems.find((r) => r.id === selectedRfpId) ?? null;
    }, [selectedRfpId, sortedItems]);

    const handleDeselect = useCallback(() => setSelectedRfpId(null), []);

    useListKeyboardNav({ items: sortedItems, selectedId: selectedRfpId, onSelect: setSelectedRfpId });

    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarNavigationSlim
                activeUrl="/"
                items={[
                    { label: "Home", href: "/", icon: HomeLine },
                    { label: "Inbox", href: "/inbox", icon: Inbox01 },
                    { label: "Saved", href: "/saved", icon: Star01 },
                    { label: "Ignored", href: "/ignored", icon: XSquare },
                ]}
                footerItems={[
                    { label: "Support", href: "/support", icon: LifeBuoy01 },
                    { label: "Settings", href: "/settings", icon: Settings01 },
                ]}
            />
            <main className="min-w-0 flex-1 bg-secondary pt-8 pb-12 shadow-none lg:bg-primary">
                <div className="mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-1 flex-col gap-0.5">
                                <p className="text-lg font-semibold text-primary">Inbox</p>
                                <p className="text-sm text-tertiary">View the RFPs that are relevant to you.</p>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Input shortcut className="w-[300px] min-w-0 flex-1" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                                    <Button iconLeading={Settings04} color="secondary" size="sm">
                                        View options
                                    </Button>
                                    <FilterDropdown {...filterState} renderFilterRow={renderFilterRow} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex flex-col px-4 lg:gap-6 lg:px-8">
                    <TableCard.Root className="-mx-4 rounded-none shadow-xs lg:mx-0 lg:rounded-xl">
                        <Table
                            aria-label="Trades"
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                            onRowAction={(key) => setSelectedRfpId(String(key))}
                            className="table-fixed bg-primary [&_td]:focus-visible:outline-0"
                        >
                            <Table.Header className="bg-secondary">
                                <Table.Head id="title" isRowHeader label="Name" className="w-[320px] max-w-[320px]" />
                                <Table.Head id="description" label="Description" className="w-full min-w-0" />
                            </Table.Header>
                            <Table.Body items={sortedItems} dependencies={[selectedRfpId]}>
                                {(rfp) => {
                                    const isSelected = rfp.id === selectedRfpId;
                                    return (
                                        <Table.Row id={rfp.id} className={cx("cursor-pointer", isSelected && "bg-brand-secondary hover:bg-brand-secondary")}>
                                            <Table.Cell
                                                className={cx(
                                                    "w-[320px] max-w-[320px] min-w-0 align-top",
                                                    isSelected && "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-fg-brand-primary",
                                                )}
                                            >
                                                <div className="flex max-w-full min-w-0 flex-col gap-1">
                                                    <div className="flex min-w-0 items-start justify-between gap-2">
                                                        <span className="min-w-0 leading-snug font-medium wrap-break-word whitespace-normal text-primary">
                                                            {rfp.title}
                                                        </span>
                                                        <Badge type="modern" color="gray" size="sm" className="shrink-0">
                                                            {getDueDaysLabel(rfp.dueDate)}
                                                        </Badge>
                                                    </div>
                                                    <span className="text-xs">{rfp.agency}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="align-top">
                                                <p className="max-w-xl leading-snug whitespace-normal">{rfp.description}</p>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }}
                            </Table.Body>
                        </Table>
                        <div className="max-lg:hidden">
                            <PaginationCardDefault />
                        </div>
                    </TableCard.Root>
                    <div className="lg:hidden">
                        <PaginationPageMinimalCenter page={1} total={10} className="mt-6" />
                    </div>
                </div>
            </main>

            <DetailPanel isOpen={!!selectedRfpId} onClose={handleDeselect}>
                {selectedRfp && (
                    <>
                        <DetailPanel.Header onClose={handleDeselect}>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-semibold text-primary">{selectedRfp.title}</h2>
                                <p className="text-sm text-tertiary">{selectedRfp.agency}</p>
                            </div>
                        </DetailPanel.Header>
                        <DetailPanel.Content>
                            <div className="flex flex-col gap-6">
                                <section>
                                    <h3 className="text-sm font-medium text-secondary">Description</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-tertiary">{selectedRfp.description}</p>
                                </section>
                                <section>
                                    <h3 className="text-sm font-medium text-secondary">Due Date</h3>
                                    <p className="mt-1 text-sm text-tertiary">
                                        {selectedRfp.dueDate.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </section>
                                <div className="rounded-lg border border-secondary bg-secondary p-4">
                                    <p className="text-sm text-tertiary">More details and actions will appear here.</p>
                                </div>
                            </div>
                        </DetailPanel.Content>
                    </>
                )}
            </DetailPanel>
        </div>
    );
}
