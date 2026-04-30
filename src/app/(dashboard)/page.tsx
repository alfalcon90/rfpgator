"use client";

import { RfpListPage } from "@/components/application/rfp-list-page";
import { useRfps } from "@/data/rfp-store";

export default function HomePage() {
    const rfps = useRfps();

    return <RfpListPage title="All RFPs" subtitle="Browse all RFPs across every status." rfps={rfps} />;
}
