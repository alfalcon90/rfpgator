/** Where the RFP appears in the user's workflow (inbox triage vs saved vs ignored). */
export enum Status {
    Inbox = "inbox",
    Ignored = "ignored",
    Saved = "saved",
}

export interface Rfp {
    id: string;
    title: string;
    agency: string;
    dueDate: Date;
    description: string;
    status: Status;
}
