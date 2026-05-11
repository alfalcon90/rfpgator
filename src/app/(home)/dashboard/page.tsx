"use client";

import { BookmarkCheck, Clock, FileCheck02, Inbox01, SearchLg, Send01, Star01, Target01 } from "@untitledui/icons";
import { Group as AriaGroup, Input as AriaInput } from "react-aria-components";
import { FeedItem, type FeedItemType } from "@/components/application/activity-feed/activity-feed";
import { MetricsIcon03 } from "@/components/application/metrics/metrics";
import { Button } from "@/components/base/buttons/button";
import { useRfps } from "@/data/rfp-store";
import { Status } from "@/types/rfp";
import { cx } from "@/utils/cx";

const suggestedQueries = [
    { label: "Healthcare IT RFPs in California", icon: Target01 },
    { label: "Federal cybersecurity contracts", icon: FileCheck02 },
    { label: "State-level SaaS procurement", icon: Send01 },
    { label: "Construction projects over $1M", icon: Star01 },
    { label: "IT staffing augmentation", icon: BookmarkCheck },
    { label: "Cloud migration services", icon: Target01 },
];

const activityFeed: FeedItemType[] = [
    {
        id: 1,
        user: { avatarUrl: "https://i.pravatar.cc/150?u=maria", name: "Maria Chen", href: "#" },
        action: { content: "saved an RFP to the workspace:", target: "CA Dept. of Technology — Cloud Migration Services" },
        date: "2 hours ago",
    },
    {
        id: 2,
        user: { avatarUrl: "https://i.pravatar.cc/150?u=james", name: "James Okafor", href: "#" },
        action: { content: "submitted a proposal for", target: "Federal Cybersecurity Assessment Program" },
        date: "4 hours ago",
    },
    {
        id: 3,
        user: { avatarUrl: "https://i.pravatar.cc/150?u=sarah", name: "Sarah Alvarez", href: "#" },
        action: { content: "added 3 new RFPs to the workspace from", target: "SAM.gov" },
        date: "Yesterday",
    },
    {
        id: 4,
        user: { avatarUrl: "https://i.pravatar.cc/150?u=david", name: "David Park", href: "#" },
        action: { content: "marked as ignored:", target: "County Road Maintenance Program FY2026" },
        date: "Yesterday",
    },
    {
        id: 5,
        user: { avatarUrl: "https://i.pravatar.cc/150?u=emma", name: "Emma Johansson", href: "#" },
        action: { content: "saved an RFP to the workspace:", target: "Statewide EHR Modernization Initiative" },
        date: "2 days ago",
    },
];

export default function HomePage() {
    const rfps = useRfps();

    const savedCount = rfps.filter((r) => r.status === Status.Saved).length;
    const inboxCount = rfps.filter((r) => r.status === Status.Inbox).length;
    const ignoredCount = rfps.filter((r) => r.status === Status.Ignored).length;
    const appliedCount = 4;

    return (
        <main className="min-w-0 flex-1 bg-primary pb-16">
            {/* Hero search */}
            <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 pt-16 pb-10 text-center lg:px-8">
                <h1 className="text-display-xs font-bold text-primary">Find your next opportunity</h1>
                <p className="text-md font-medium text-tertiary">Search government solicitations, RFPs, and contracts.</p>

                <AriaGroup
                    className={({ isFocusWithin }) =>
                        cx(
                            "mt-4 flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 shadow-xs ring-1 ring-secondary ring-inset transition duration-100 ease-linear",
                            isFocusWithin && "ring-2 ring-brand-solid",
                        )
                    }
                >
                    <SearchLg className="size-5 shrink-0 text-fg-quaternary" />
                    <AriaInput
                        placeholder="Search by keyword, agency, NAICS code..."
                        className="w-full bg-transparent text-md text-primary outline-hidden placeholder:text-placeholder"
                    />
                    <Button size="sm" color="primary" className="shrink-0">
                        Search
                    </Button>
                </AriaGroup>
            </section>

            <div className="mx-auto max-w-6xl px-4 lg:px-8">
                {/* Metrics row */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricsIcon03
                        icon={Inbox01}
                        subtitle="In Inbox"
                        title={String(inboxCount)}
                        change="+3"
                        changeTrend="positive"
                        actions={false}
                    />
                    <MetricsIcon03
                        icon={Star01}
                        subtitle="Saved"
                        title={String(savedCount)}
                        change="+2"
                        changeTrend="positive"
                        actions={false}
                    />
                    <MetricsIcon03
                        icon={Send01}
                        subtitle="Applied"
                        title={String(appliedCount)}
                        change="+1"
                        changeTrend="positive"
                        actions={false}
                    />
                    <MetricsIcon03
                        icon={Clock}
                        subtitle="Due This Week"
                        title={String(rfps.filter((r) => {
                            const diff = r.dueDate.getTime() - Date.now();
                            return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
                        }).length)}
                        change=""
                        changeTrend="positive"
                        actions={false}
                    />
                </section>

                {/* Suggested queries */}
                <section className="mt-10">
                    <h2 className="text-md font-bold text-primary">Suggested searches</h2>
                    <p className="mt-1 text-sm font-medium text-tertiary">Based on your saved RFPs and past activity.</p>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {suggestedQueries.map((query) => (
                            <button
                                key={query.label}
                                type="button"
                                className="flex items-center gap-3 rounded-xl bg-primary px-4 py-3.5 text-left shadow-xs ring-1 ring-secondary ring-inset transition duration-100 ease-linear hover:bg-secondary_hover focus-visible:outline-2 focus-visible:outline-focus-ring"
                            >
                                <query.icon className="size-5 shrink-0 text-fg-brand-secondary" />
                                <span className="text-sm font-medium text-secondary">{query.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Activity feed */}
                <section className="mt-10">
                    <h2 className="text-md font-bold text-primary">Workspace activity</h2>
                    <p className="mt-1 text-sm font-medium text-tertiary">Recent actions from your team.</p>

                    <div className="mt-5 rounded-xl p-5 shadow-xs ring-1 ring-secondary ring-inset">
                        {activityFeed.map((item, index) => (
                            <FeedItem key={item.id} {...item} connector={index < activityFeed.length - 1} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
