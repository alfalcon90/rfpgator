"use client";

import { FileIcon } from "@untitledui/file-icons";
import { UploadCloud02 } from "@untitledui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import type { RfpFile } from "@/types/rfp";
import { Button } from "../base/buttons/button";
import { DropdownIconSimple } from "../base/dropdown/dropdown-icon-simple";

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

function extFromFilename(filename?: string, mimetype?: string): string {
    if (filename) {
        const parts = filename.split(".");
        if (parts.length > 1) return parts.at(-1)!;
    }
    if (mimetype?.includes("pdf")) return "pdf";
    if (mimetype?.includes("spreadsheet") || mimetype?.includes("excel")) return "xlsx";
    if (mimetype?.includes("wordprocessing") || mimetype?.includes("msword")) return "docx";
    return "document";
}

interface FileTableProps {
    files: RfpFile[];
}

export const FileTable = ({ files }: FileTableProps) => {
    if (files.length === 0) return null;

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Attachments"
                description="Download or view the attachments for this RFP."
                className="pb-5"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="sm" color="secondary">
                            Download all
                        </Button>
                        <Button size="sm" iconLeading={UploadCloud02}>
                            Upload
                        </Button>
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple">
                <Table.Header>
                    <Table.Head id="name" label="File name" isRowHeader />
                    <Table.Head id="uploadedAt" label="Date uploaded" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={files}>
                    {(file) => {
                        const ext = extFromFilename(file.filename, file.mimetype);
                        return (
                            <Table.Row id={file.id}>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <FileIcon type={ext} theme="light" className="size-10 dark:hidden" />
                                        <FileIcon type={ext} theme="dark" className="size-10 not-dark:hidden" />

                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-bold text-primary">{file.title}</p>
                                            <p className="text-sm font-medium text-tertiary">{formatBytes(file.size)}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-sm font-medium whitespace-nowrap text-tertiary">{file.uploadedAt?.toLocaleDateString()}</Table.Cell>
                                <Table.Cell className="px-4">
                                    <div className="flex items-center justify-end">
                                        <DropdownIconSimple />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        );
                    }}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};
