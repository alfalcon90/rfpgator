"use client";

import { RfpListPage } from "@/components/application/rfp-list-page";
import { useRfpsByStatus } from "@/data/rfp-store";
import { Status } from "@/types/rfp";

export default function IgnoredPage() {
    const rfps = useRfpsByStatus(Status.Ignored);

    return <RfpListPage title="Ignored" subtitle="RFPs you've dismissed." rfps={rfps} />;
}
