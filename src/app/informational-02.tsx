"use client";

import { useMemo, useState } from "react";
import { FilterLines, HomeLine, Inbox01, LifeBuoy01, SearchLg, Settings01, Settings04, Star01, XSquare } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { FilterBarSimpleDemo, renderFilterRow, useFilterState } from "@/components/application/filter-bar/filter-bar.demo";
import { FilterDropdown } from "@/components/application/filter-bar/filter-dropdown-menu";
import { PaginationCardDefault, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

// Helper functions for formatting
const formatCurrency = (amount: number): string => amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface Rfp {
    id: string;
    title: string;
    agency: string;
    dueDate: Date;
    description: string;
}

const mockRfps: Rfp[] = [
    {
        id: "1",
        title: "Custom Modular Display Systems Accessories",
        agency: "All Using Agencies",
        dueDate: new Date(Date.now() + 100 * 86400000),
        description:
            "The contractor is expected to provide Custom and Modular Display Systems, Accessories, and related Services for Commonwealth agencies statewide. Contractors who meet qualifications will be awarded a contract and may respond to Requests for Quotes for these products and services.",
    },
    {
        id: "2",
        title: "RFP for: Automation & AI Software for Professional Services",
        agency: "City of Brockton",
        dueDate: new Date(Date.now() + 4 * 86400000),
        description:
            "Provide Automation & AI Software for Professional Services. Deliverables include content management software (document management software), content workflow software, enterprise system management software, network management software (network operating system enhancement software), and economic analysis.",
    },
    {
        id: "3",
        title: "RFP 07-2025-IT009 Debt Management Software Solution",
        agency: "DEPARTMENT OF TREASURER",
        dueDate: new Date(Date.now() + 6 * 86400000),
        description:
            "Provide a single-sign-on SaaS debt management solution for state and local government debt: host and secure debt records and schedules, migrate existing SQL Server data, integrate with third-party systems, support RBAC for 200+ concurrent users, automate workflows and reporting, manage documents, provide disaster recovery, training, maintenance, and support.",
    },
    {
        id: "4",
        title: "Cloud-Based Public Safety Software Solution at TSTC",
        agency: "Texas State Technical College",
        dueDate: new Date(Date.now() + 4 * 86400000),
        description:
            "Provide, implement, configure, migrate, and support a cloud-based public safety solution (CAD, RMS, Mobile Field Reporting) as a unified multi-campus/ORI system. Deliver architecture, project plan, data migration and validation, security/compliance documentation (CJIS, TX-RAMP, SOC2, FIPS/AES-256), DR/BCP, training, ongoing support, and expansion pricing.",
    },
    {
        id: "5",
        title: "RFI# 2026-009-Enterprise Permitting, Licensing, Inspection, and Code Enforcement Software Solutions",
        agency: "Cherokee County Government",
        dueDate: new Date(Date.now() + 12 * 86400000),
        description:
            "Provide, implement, and support an enterprise permitting, licensing, inspection, and code enforcement software platform including a centralized public portal, configurable workflows, mobile inspection tools, inspection scheduling, case management, reporting dashboards, integrations with GIS/financial/document/payment systems, security and disaster recovery, data export, training, and change-management services.",
    },
    {
        id: "6",
        title: "Emergency Notice - Revenue Enhancement Program",
        agency: "CFS - Children and Family Services",
        dueDate: new Date(Date.now() + 32 * 86400000),
        description:
            "Provide maintenance, development, and technical support for DCFS web and mainframe applications and databases that enable federal program eligibility and claiming. Deliver Title IV-E reimbursement preparation, identify recoverable costs, maintain Emergency Assistance and PACAP, perform first-level FFP reviews for adoption/guardianship subsidies, support audits, permanency reporting, and cross-agency coordination.",
    },
    {
        id: "7",
        title: "Pension Administration Sys Modernization Pasmod",
        agency: "State Employees' Retirement System",
        dueDate: new Date(Date.now() + 41 * 86400000),
        description:
            "Replace its legacy custom developed pension administration technologies with a commercial software solution. Procure an integrated enterprise pension administration software product that will support the full retirement benefit lifecycle, from enrollment and service tracking through retirement processing, annuity payroll, employer contribution management, and post-retirement services.",
    },
    {
        id: "8",
        title: "RFP 739-SL3732580 AI-Enhanced Dictation and Transcription Solution",
        agency: "Texas Tech Health Science Cnt",
        dueDate: new Date(Date.now() + 15 * 86400000),
        description:
            "Provide a HIPAA-compliant, TX-RAMP-certified cloud SaaS AI dictation and transcription platform (real-time and ambient) with specialty language models, ≥95% accuracy, speaker separation, desktop/mobile UIs, and structured/free-text support; integrate with EHRs (Epic/Altera), plus implementation, pilot, training, 24/7 support, maintenance, SLAs, and quarterly reports.",
    },
];

function getDueDaysLabel(dueDate: Date): string {
    const days = Math.ceil((dueDate.getTime() - Date.now()) / 86400000);
    if (days > 99) return "+99d";
    return `${days}d`;
}

export const Informational02 = () => {
    const filterState = useFilterState();
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "deliveryDate",
        direction: "descending",
    });

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return mockRfps;

        return mockRfps.toSorted((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Handle numbers
            if (typeof first === "number" && typeof second === "number") {
                return sortDescriptor.direction === "ascending" ? first - second : second - first;
            }

            // Handle strings
            if (typeof first === "string" && typeof second === "string") {
                const result = first.localeCompare(second);
                return sortDescriptor.direction === "ascending" ? result : -result;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <div className="flex flex-col lg:flex-row">
            <SidebarNavigationSlim
                activeUrl="/"
                items={[
                    {
                        label: "Home",
                        href: "/",
                        icon: HomeLine,
                    },
                    {
                        label: "Inbox",
                        href: "/inbox",
                        icon: Inbox01,
                    },
                    {
                        label: "Saved",
                        href: "/saved",
                        icon: Star01,
                    },
                    {
                        label: "Ignored",
                        href: "/ignored",
                        icon: XSquare,
                    },
                ]}
                footerItems={[
                    {
                        label: "Support",
                        href: "/support",
                        icon: LifeBuoy01,
                    },
                    {
                        label: "Settings",
                        href: "/settings",
                        icon: Settings01,
                    },
                ]}
            />
            <main className="min-w-0 flex-1 bg-secondary pt-8 pb-12 shadow-none lg:bg-primary">
                <div className="mx-auto mb-8 flex flex-col gap-5 px-4 lg:px-8">
                    {/* Page header simple */}
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
                        <Table aria-label="Trades" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} className="table-fixed bg-primary">
                            <Table.Header className="bg-secondary">
                                <Table.Head id="title" isRowHeader label="Name" className="w-[320px] max-w-[320px]" />
                                <Table.Head id="description" label="Description" className="w-full min-w-0" />
                            </Table.Header>
                            <Table.Body items={sortedItems}>
                                {(rfp) => (
                                    <Table.Row id={rfp.id}>
                                        <Table.Cell className="w-[320px] max-w-[320px] min-w-0 align-top">
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
                                )}
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
        </div>
    );
};
