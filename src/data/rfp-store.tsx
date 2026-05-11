"use client";

import { type ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { type Rfp, Status } from "@/types/rfp";
import { mockRfps } from "./mock-rfps";

interface RfpStoreContextValue {
    rfps: Rfp[];
    updateRfpStatus: (id: string, status: Status) => void;
}

const RfpStoreContext = createContext<RfpStoreContextValue | null>(null);

export function RfpStoreProvider({ children }: { children: ReactNode }) {
    const [rfps, setRfps] = useState<Rfp[]>(mockRfps);

    const updateRfpStatus = useCallback((id: string, status: Status) => {
        setRfps((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }, []);

    const value = useMemo(() => ({ rfps, updateRfpStatus }), [rfps, updateRfpStatus]);

    return <RfpStoreContext.Provider value={value}>{children}</RfpStoreContext.Provider>;
}

function useRfpStore() {
    const ctx = useContext(RfpStoreContext);
    if (!ctx) throw new Error("useRfpStore must be used within RfpStoreProvider");
    return ctx;
}

export function useRfps(): Rfp[] {
    return useRfpStore().rfps;
}

export function useRfpsByStatus(status: Status): Rfp[] {
    const { rfps } = useRfpStore();
    return useMemo(() => rfps.filter((r) => r.status === status), [rfps, status]);
}

export function useUpdateRfpStatus() {
    return useRfpStore().updateRfpStatus;
}
