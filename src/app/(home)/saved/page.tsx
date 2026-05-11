"use client";

import { RfpListPage } from "@/components/application/rfp-list-page";
import { useRfpsByStatus } from "@/data/rfp-store";
import { Status } from "@/types/rfp";

export default function SavedPage() {
    const rfps = useRfpsByStatus(Status.Saved);

    return <RfpListPage title="Saved" subtitle="RFPs you've saved for later." rfps={rfps} />;
}
