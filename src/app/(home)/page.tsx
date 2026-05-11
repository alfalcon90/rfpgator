"use client";

import { RfpListPage } from "@/components/application/rfp-list-page";
import { useRfpsByStatus } from "@/data/rfp-store";
import { Status } from "@/types/rfp";

export default function HomePage() {
    const rfps = useRfpsByStatus(Status.All);

    return <RfpListPage title="Home" subtitle="Welcome to RFPGator!" rfps={rfps} />;
}
