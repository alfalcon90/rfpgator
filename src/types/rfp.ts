/** Where the RFP appears in the user's workflow (inbox triage vs saved vs ignored). */
export enum Status {
    Inbox = "inbox",
    Ignored = "ignored",
    Saved = "saved",
}

/** A document attached to an RFP (solicitation PDF, addendum, etc.). */
export interface RfpFile {
    /** Stable id for keys and updates. */
    id: string;
    /** Human-readable name shown in the UI (often the original filename). */
    title: string;
    /** Byte length of the file. */
    size: number;
    /** IANA media type (e.g. `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`). */
    mimetype: string;
    /** Original filename including extension, if distinct from `title`. */
    filename?: string;
    /** HTTPS URL to download or open the file. */
    url?: string;
    /** When the file was published or attached. */
    uploadedAt?: Date;
}

/** Instrument type for display and filtering. */
export type SolicitationKind = "RFP" | "RFI" | "RFQ" | "ITB" | "SoleSource" | "Other";

export interface Rfp {
    /** Stable id for keys and updates. */
    id: string;
    /** Human-readable name shown in the UI (often the original filename). */
    title: string;
    /** Agency or organization responsible for the RFP. */
    agency: string;
    /** Date the RFP is due. */
    dueDate: Date;
    /** Description of the RFP. */
    description: string;
    /** Status of the RFP. */
    status: Status;
    /** Solicitation attachments, amendments, exhibits, etc. */
    files?: RfpFile[];
    /** Official reference number (e.g. RFP 07-2025-IT009). */
    solicitationNumber?: string;
    /** Competition instrument (RFP, RFI, …). */
    solicitationKind?: SolicitationKind;
    /** When the notice was first published or last materially amended. */
    publishedAt?: Date;
    /** Geographic scope (state, county, region, or “statewide”). */
    jurisdiction?: string;
    /** Subject-matter tags for chips and filters. */
    categories?: string[];
    /** NAICS or similar industry codes when provided. */
    industryCodes?: string[];
    /** Approximate contract ceiling in USD when disclosed. */
    estimatedValueUsd?: number;
    /** Where to submit responses (portal or instruction page). */
    submissionUrl?: string;
    /** Deadline for written questions or clarifications. */
    questionsDueDate?: Date;
    /** Pre-bid conference, site visit, or vendor day (if any). */
    preBidConferenceAt?: Date;
    /** Primary contracting officer or program lead. */
    contactName?: string;
    /** Primary contact email address. */
    contactEmail?: string;
    /** Primary contact phone number. */
    contactPhone?: string;
    /** Human-readable contract length (e.g. “Base 3 years + two 1-year options”). */
    contractTermSummary?: string;
    /** Evaluation approach (e.g. “Best value”, “Lowest responsive bid”). */
    procurementMethod?: string;
    /** Set-aside or preference program when applicable. */
    setAside?: string;
}
