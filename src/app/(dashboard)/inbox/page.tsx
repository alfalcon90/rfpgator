"use client";

import { RfpListPage } from "@/components/application/rfp-list-page";
import { useRfpsByStatus } from "@/data/rfp-store";
import { Status } from "@/types/rfp";

export default function InboxPage() {
    const rfps = useRfpsByStatus(Status.Inbox);

    return <RfpListPage title="Inbox" subtitle="View the RFPs that are relevant to you." rfps={rfps} />;
}
