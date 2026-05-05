"use client";

import { useCallback, useMemo, useState } from "react";
import { CalendarCheck01, LinkExternal01, Mail01, MarkerPin01, Phone, SearchLg, Settings04, Star01, User01, XSquare } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { toast } from "sonner";
import { DetailPanel } from "@/components/application/detail-panel/detail-panel";
import { FileTable } from "@/components/application/file-table";
import { IconNotification } from "@/components/application/notifications/notifications";
import { PaginationCardDefault, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { PublishingSiteFilter, SemanticThresholdFilter } from "@/components/application/rfp-filter";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useUpdateRfpStatus } from "@/data/rfp-store";
import { useShortcuts } from "@/hooks/use-shortcuts";
import { type Rfp, Status } from "@/types/rfp";
import { cx } from "@/utils/cx";
import { getDueDaysLabel } from "@/utils/date";

interface RfpListPageProps {
    title: string;
    subtitle: string;
    rfps: Rfp[];
}

export function RfpListPage({ title, subtitle, rfps }: RfpListPageProps) {
    const [publishingSite, setPublishingSite] = useState("");
    const [semanticThreshold, setSemanticThreshold] = useState(0);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "deliveryDate",
        direction: "descending",
    });
    const [selectedRfpId, setSelectedRfpId] = useState<string | null>(null);

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return rfps;

        return rfps.toSorted((a, b) => {
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
    }, [rfps, sortDescriptor]);

    const selectedRfp = useMemo(() => {
        if (!selectedRfpId) return null;
        return sortedItems.find((r) => r.id === selectedRfpId) ?? null;
    }, [selectedRfpId, sortedItems]);

    const handleDeselect = useCallback(() => setSelectedRfpId(null), []);
    const updateRfpStatus = useUpdateRfpStatus();

    const handleStatusChange = useCallback(
        (status: Status) => {
            if (!selectedRfpId || !selectedRfp) return;
            const rfpTitle = selectedRfp.title;
            const currentIndex = sortedItems.findIndex((r) => r.id === selectedRfpId);

            updateRfpStatus(selectedRfpId, status);

            // Advance to the next item, or the previous one, or close if list is now empty
            const remaining = sortedItems.filter((r) => r.id !== selectedRfpId);
            if (remaining.length === 0) {
                setSelectedRfpId(null);
            } else {
                const nextIndex = Math.min(currentIndex, remaining.length - 1);
                setSelectedRfpId(remaining[nextIndex].id);
            }

            const label = status === Status.Saved ? "Saved" : "Ignored";
            const color = status === Status.Saved ? "success" : ("gray" as const);
            toast.custom((id) => (
                <IconNotification title={`RFP ${label}`} description={rfpTitle} color={color} hideDismissLabel onClose={() => toast.dismiss(id)} />
            ));
        },
        [selectedRfpId, selectedRfp, sortedItems, updateRfpStatus],
    );

    const shortcuts = useMemo(
        () => [
            { key: "y", action: () => handleStatusChange(Status.Saved) },
            { key: "n", action: () => handleStatusChange(Status.Ignored) },
        ],
        [handleStatusChange],
    );

    useShortcuts({ items: sortedItems, selectedId: selectedRfpId, onSelect: setSelectedRfpId, shortcuts });

    return (
        <>
            <main className="min-w-0 flex-1 bg-secondary pt-8 pb-12 shadow-none lg:bg-primary">
                <div className="mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="flex flex-1 flex-col gap-0.5">
                                <p className="text-lg font-bold text-primary">{title}</p>
                                <p className="text-sm font-medium text-tertiary">{subtitle}</p>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Input shortcut className="w-75 min-w-0 flex-1" size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                                    <PublishingSiteFilter rfps={rfps} value={publishingSite} onChange={setPublishingSite} />
                                    <SemanticThresholdFilter value={semanticThreshold} onChange={setSemanticThreshold} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex flex-col px-4 lg:gap-6 lg:px-8">
                    <TableCard.Root className="-mx-4 rounded-none shadow-xs lg:mx-0 lg:rounded-xl">
                        <Table
                            aria-label="RFPs"
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                            onRowAction={(key) => setSelectedRfpId(String(key))}
                            className="table-fixed bg-primary"
                        >
                            <Table.Header className="bg-secondary">
                                <Table.Head id="title" isRowHeader label="Name" className="w-95 font-bold" />
                                <Table.Head id="description" label="Description" className="w-full min-w-0 font-bold" />
                            </Table.Header>
                            <Table.Body items={sortedItems} dependencies={[selectedRfpId]}>
                                {(rfp) => {
                                    const isSelected = rfp.id === selectedRfpId;
                                    return (
                                        <Table.Row id={rfp.id} className={cx("cursor-pointer", isSelected && "bg-brand-solid/10 hover:bg-brand-solid/20")}>
                                            <Table.Cell
                                                className={cx(
                                                    "w-95 min-w-0 align-top",
                                                    isSelected && "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-brand-solid",
                                                )}
                                            >
                                                <div className="flex max-w-full min-w-0 flex-col gap-1">
                                                    <div className="flex min-w-0 items-start justify-between gap-2">
                                                        <span className="min-w-0 leading-snug font-bold wrap-break-word whitespace-normal text-primary">
                                                            {rfp.title}
                                                        </span>
                                                        <Badge type="modern" color="gray" size="sm" className="shrink-0">
                                                            {getDueDaysLabel(rfp.dueDate)}
                                                        </Badge>
                                                    </div>
                                                    <span className="text-sm font-medium text-tertiary">{rfp.agency}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="align-top">
                                                <p className="text-sm leading-snug font-medium whitespace-normal text-tertiary">{rfp.description}</p>
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
                            <div className="flex w-full items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-bold text-primary">{selectedRfp.title}</h2>
                                    <p className="text-sm font-medium text-tertiary">{selectedRfp.agency}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button iconLeading={Star01} color="secondary" size="sm" shortcut="Y" onClick={() => handleStatusChange(Status.Saved)}>
                                        Save
                                    </Button>
                                    <Button
                                        color="secondary-destructive"
                                        iconLeading={XSquare}
                                        size="sm"
                                        shortcut="N"
                                        onClick={() => handleStatusChange(Status.Ignored)}
                                    >
                                        Ignore
                                    </Button>
                                </div>
                            </div>
                        </DetailPanel.Header>
                        <DetailPanel.Content>
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between gap-2">
                                    {/* Meta badges row */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        {selectedRfp.solicitationKind && (
                                            <Badge type="pill-color" color="brand" size="sm">
                                                {selectedRfp.solicitationKind}
                                            </Badge>
                                        )}
                                        {selectedRfp.solicitationNumber && (
                                            <Badge type="modern" color="gray" size="sm">
                                                {selectedRfp.solicitationNumber}
                                            </Badge>
                                        )}
                                        {selectedRfp.jurisdiction && (
                                            <Badge type="modern" color="gray" size="sm">
                                                <MarkerPin01 className="mr-1 inline size-3" />
                                                {selectedRfp.jurisdiction}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Submission link */}
                                    {selectedRfp.submissionUrl && (
                                        <section>
                                            <Button href={selectedRfp.submissionUrl} color="link-color" size="sm" iconTrailing={LinkExternal01}>
                                                Submission portal
                                            </Button>
                                        </section>
                                    )}
                                </div>

                                {/* Description */}
                                <section>
                                    <h3 className="text-sm font-bold text-primary">Description</h3>
                                    <p className="mt-2 text-sm leading-relaxed font-medium text-tertiary">{selectedRfp.description}</p>
                                </section>

                                {/* Categories */}
                                {selectedRfp.categories && selectedRfp.categories.length > 0 && (
                                    <section>
                                        <h3 className="text-sm font-bold text-primary">Categories</h3>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {selectedRfp.categories.map((cat) => (
                                                <Badge key={cat} type="pill-color" color="gray" size="sm">
                                                    {cat}
                                                </Badge>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Key dates card */}
                                <section className="rounded-xl border border-secondary p-4">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
                                        <CalendarCheck01 className="size-4 text-fg-quaternary" />
                                        Key Dates
                                    </h3>
                                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                                        <div>
                                            <dt className="text-xs font-medium text-quaternary">Response Due</dt>
                                            <dd className="mt-0.5 text-sm font-medium text-primary">
                                                {selectedRfp.dueDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                            </dd>
                                        </div>
                                        {selectedRfp.publishedAt && (
                                            <div>
                                                <dt className="text-xs font-medium text-quaternary">Published</dt>
                                                <dd className="mt-0.5 text-sm font-medium text-primary">
                                                    {selectedRfp.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </dd>
                                            </div>
                                        )}
                                        {selectedRfp.questionsDueDate && (
                                            <div>
                                                <dt className="text-xs font-medium text-quaternary">Questions Due</dt>
                                                <dd className="mt-0.5 text-sm font-medium text-primary">
                                                    {selectedRfp.questionsDueDate.toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </dd>
                                            </div>
                                        )}
                                        {selectedRfp.preBidConferenceAt && (
                                            <div>
                                                <dt className="text-xs font-medium text-quaternary">Pre-Bid Conference</dt>
                                                <dd className="mt-0.5 text-sm font-medium text-primary">
                                                    {selectedRfp.preBidConferenceAt.toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </section>

                                {/* Contract details card */}
                                {(selectedRfp.estimatedValueUsd ||
                                    selectedRfp.contractTermSummary ||
                                    selectedRfp.procurementMethod ||
                                    selectedRfp.setAside) && (
                                    <section className="rounded-xl border border-secondary p-4">
                                        <h3 className="text-sm font-bold text-primary">Contract Details</h3>
                                        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                                            {selectedRfp.estimatedValueUsd && (
                                                <div>
                                                    <dt className="text-xs font-medium text-quaternary">Estimated Value</dt>
                                                    <dd className="mt-0.5 text-sm font-medium text-primary">
                                                        {selectedRfp.estimatedValueUsd.toLocaleString("en-US", {
                                                            style: "currency",
                                                            currency: "USD",
                                                            maximumFractionDigits: 0,
                                                        })}
                                                    </dd>
                                                </div>
                                            )}
                                            {selectedRfp.contractTermSummary && (
                                                <div>
                                                    <dt className="text-xs font-medium text-quaternary">Term</dt>
                                                    <dd className="mt-0.5 text-sm font-medium text-primary">{selectedRfp.contractTermSummary}</dd>
                                                </div>
                                            )}
                                            {selectedRfp.procurementMethod && (
                                                <div>
                                                    <dt className="text-xs font-medium text-quaternary">Evaluation Method</dt>
                                                    <dd className="mt-0.5 text-sm font-medium text-primary">{selectedRfp.procurementMethod}</dd>
                                                </div>
                                            )}
                                            {selectedRfp.setAside && (
                                                <div>
                                                    <dt className="text-xs font-medium text-quaternary">Set-Aside</dt>
                                                    <dd className="mt-0.5">
                                                        <BadgeWithDot color="brand" type="pill-color" size="sm">
                                                            {selectedRfp.setAside}
                                                        </BadgeWithDot>
                                                    </dd>
                                                </div>
                                            )}
                                        </dl>
                                    </section>
                                )}

                                {/* NAICS codes */}
                                {selectedRfp.industryCodes && selectedRfp.industryCodes.length > 0 && (
                                    <section>
                                        <h3 className="text-sm font-bold text-primary">NAICS Codes</h3>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {selectedRfp.industryCodes.map((code) => (
                                                <Badge key={code} type="modern" color="gray" size="sm">
                                                    {code}
                                                </Badge>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Contact card */}
                                {(selectedRfp.contactName || selectedRfp.contactEmail || selectedRfp.contactPhone) && (
                                    <section className="rounded-xl border border-secondary p-4">
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
                                            <User01 className="size-4 text-fg-quaternary" />
                                            Point of Contact
                                        </h3>
                                        <div className="mt-3 flex flex-col gap-2">
                                            {selectedRfp.contactName && <p className="text-sm font-medium text-primary">{selectedRfp.contactName}</p>}
                                            {selectedRfp.contactEmail && (
                                                <a
                                                    href={`mailto:${selectedRfp.contactEmail}`}
                                                    className="flex items-center gap-2 text-sm font-medium text-brand-secondary hover:underline"
                                                >
                                                    <Mail01 className="size-3.5 text-fg-brand-secondary" />
                                                    {selectedRfp.contactEmail}
                                                </a>
                                            )}
                                            {selectedRfp.contactPhone && (
                                                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                                                    <Phone className="size-3.5 text-fg-quaternary" />
                                                    {selectedRfp.contactPhone}
                                                </span>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* Files */}
                                {selectedRfp.files && selectedRfp.files.length > 0 && <FileTable files={selectedRfp.files} />}

                                {/* Spacer */}
                                <div className="h-4" />
                            </div>
                        </DetailPanel.Content>
                    </>
                )}
            </DetailPanel>
        </>
    );
}
