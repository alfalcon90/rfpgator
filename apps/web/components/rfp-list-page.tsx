"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { cn } from "@workspace/ui/lib/utils"
import {
  SearchIcon,
  Settings2Icon,
  SlidersHorizontalIcon,
  XIcon,
  SparklesIcon,
} from "lucide-react"

interface Rfp {
  id: string
  title: string
  agency: string
  dueDate: Date
  description: string
}

const mockRfps: Rfp[] = [
  {
    id: "1",
    title: "Custom Modular Display Systems Accessories",
    agency: "All Using Agencies",
    dueDate: new Date(Date.now() + 100 * 86400000),
    description:
      "The contractor is expected to provide Custom and Modular Display Systems, Accessories, and related Services for Commonwealth agencies statewide. Contractors who meet qualifications will be awarded a contract and may respond to Requests for Quotes for these products and services.",
  },
  {
    id: "2",
    title: "RFP for: Automation & AI Software for Professional Services",
    agency: "City of Brockton",
    dueDate: new Date(Date.now() + 4 * 86400000),
    description:
      "Provide Automation & AI Software for Professional Services. Deliverables include content management software (document management software), content workflow software, enterprise system management software, network management software (network operating system enhancement software), and economic analysis.",
  },
  {
    id: "3",
    title: "RFP 07-2025-IT009 Debt Management Software Solution",
    agency: "DEPARTMENT OF TREASURER",
    dueDate: new Date(Date.now() + 6 * 86400000),
    description:
      "Provide a single-sign-on SaaS debt management solution for state and local government debt: host and secure debt records and schedules, migrate existing SQL Server data, integrate with third-party systems, support RBAC for 200+ concurrent users, automate workflows and reporting, manage documents, provide disaster recovery, training, maintenance, and support.",
  },
  {
    id: "4",
    title: "Cloud-Based Public Safety Software Solution at TSTC",
    agency: "Texas State Technical College",
    dueDate: new Date(Date.now() + 4 * 86400000),
    description:
      "Provide, implement, configure, migrate, and support a cloud-based public safety solution (CAD, RMS, Mobile Field Reporting) as a unified multi-campus/ORI system. Deliver architecture, project plan, data migration and validation, security/compliance documentation (CJIS, TX-RAMP, SOC2, FIPS/AES-256), DR/BCP, training, ongoing support, and expansion pricing.",
  },
  {
    id: "5",
    title:
      "RFI# 2026-009-Enterprise Permitting, Licensing, Inspection, and Code Enforcement Software Solutions",
    agency: "Cherokee County Government",
    dueDate: new Date(Date.now() + 12 * 86400000),
    description:
      "Provide, implement, and support an enterprise permitting, licensing, inspection, and code enforcement software platform including a centralized public portal, configurable workflows, mobile inspection tools, inspection scheduling, case management, reporting dashboards, integrations with GIS/financial/document/payment systems, security and disaster recovery, data export, training, and change-management services.",
  },
  {
    id: "6",
    title: "Emergency Notice - Revenue Enhancement Program",
    agency: "CFS - Children and Family Services",
    dueDate: new Date(Date.now() + 32 * 86400000),
    description:
      "Provide maintenance, development, and technical support for DCFS web and mainframe applications and databases that enable federal program eligibility and claiming. Deliver Title IV-E reimbursement preparation, identify recoverable costs, maintain Emergency Assistance and PACAP, perform first-level FFP reviews for adoption/guardianship subsidies, support audits, permanency reporting, and cross-agency coordination.",
  },
  {
    id: "7",
    title: "Pension Administration Sys Modernization Pasmod",
    agency: "State Employees' Retirement System",
    dueDate: new Date(Date.now() + 41 * 86400000),
    description:
      "Replace its legacy custom developed pension administration technologies with a commercial software solution. Procure an integrated enterprise pension administration software product that will support the full retirement benefit lifecycle, from enrollment and service tracking through retirement processing, annuity payroll, employer contribution management, and post-retirement services.",
  },
  {
    id: "8",
    title: "RFP 739-SL3732580 AI-Enhanced Dictation and Transcription Solution",
    agency: "Texas Tech Health Science Cnt",
    dueDate: new Date(Date.now() + 15 * 86400000),
    description:
      "Provide a HIPAA-compliant, TX-RAMP-certified cloud SaaS AI dictation and transcription platform (real-time and ambient) with specialty language models, ≥95% accuracy, speaker separation, desktop/mobile UIs, and structured/free-text support; integrate with EHRs (Epic/Altera), plus implementation, pilot, training, 24/7 support, maintenance, SLAs, and quarterly reports.",
  },
]

function getDueDaysLabel(dueDate: Date): string {
  const days = Math.ceil((dueDate.getTime() - Date.now()) / 86400000)
  if (days > 99) return "+99d"
  return `${days}d`
}

export function RfpListPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1)
  const rowRefs = React.useRef<(HTMLTableRowElement | null)[]>([])

  const selectedRfp = selectedId
    ? mockRfps.find((r) => r.id === selectedId)
    : null

  function selectRow(rfp: Rfp, index: number) {
    setSelectedId(rfp.id)
    setFocusedIndex(index)
  }

  function handleRowKeyDown(
    e: React.KeyboardEvent<HTMLTableRowElement>,
    index: number
  ) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.min(index + 1, mockRfps.length - 1)
      rowRefs.current[next]?.focus()
      setFocusedIndex(next)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const prev = Math.max(index - 1, 0)
      rowRefs.current[prev]?.focus()
      setFocusedIndex(prev)
    } else if (e.key === "Enter") {
      e.preventDefault()
      selectRow(mockRfps[index]!, index)
    }
  }

  function closePanel() {
    setSelectedId(null)
    setFocusedIndex(-1)
  }

  return (
    <div className="relative flex min-h-svh flex-1 flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-6 py-4">
        <div className="flex h-10 max-w-[400px] flex-1 items-center gap-1.5 rounded-lg border border-input px-2">
          <Badge variant="secondary" className="shrink-0">
            All RFPs
          </Badge>
          <Input
            placeholder="Search"
            className="h-8 border-0 px-1 shadow-none focus-visible:border-transparent focus-visible:ring-0"
          />
          <SparklesIcon className="size-4 shrink-0 text-muted-foreground" />
          <div className="mx-1 h-4 w-px bg-border" />
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="lg">
            <Settings2Icon />
            View options
          </Button>
          <Button variant="secondary" size="lg">
            <SlidersHorizontalIcon />
            Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-6 mt-2 mb-12 flex-1 overflow-hidden rounded-xl border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">NAME</TableHead>
              <TableHead>DESCRIPTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRfps.map((rfp, index) => {
              const isSelected = selectedId === rfp.id
              const isFocused = focusedIndex === index

              return (
                <TableRow
                  key={rfp.id}
                  ref={(el) => {
                    rowRefs.current[index] = el
                  }}
                  tabIndex={0}
                  role="button"
                  onClick={() => selectRow(rfp, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onKeyDown={(e) => handleRowKeyDown(e, index)}
                  className={cn(
                    "cursor-default border-b outline-none",
                    isSelected
                      ? "border-l-4 border-l-brand bg-brand-muted hover:bg-brand-muted"
                      : "hover:bg-gray-50",
                    isFocused &&
                      !isSelected &&
                      "ring-2 ring-gray-700 ring-inset",
                    isFocused && isSelected && "ring-2 ring-gray-700 ring-inset"
                  )}
                >
                  <TableCell className="max-w-[320px] min-w-[240px] pl-4 align-top">
                    <div className="flex flex-col gap-1 py-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="leading-snug font-medium whitespace-normal text-foreground">
                          {rfp.title}
                        </span>
                        <Badge variant="secondary" className="shrink-0">
                          {getDueDaysLabel(rfp.dueDate)}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {rfp.agency}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <p className="max-w-xl py-1 leading-snug whitespace-normal text-muted-foreground">
                      {rfp.description}
                    </p>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Detail panel */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 z-20 flex w-2/3 flex-col border-l bg-background shadow-lg transition-transform duration-200 ease-in-out",
          selectedRfp ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedRfp && (
          <>
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold">{selectedRfp.title}</h2>
              <Button variant="ghost" size="icon-sm" onClick={closePanel}>
                <XIcon />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-center p-6 text-muted-foreground">
              Content coming soon
            </div>
          </>
        )}
      </div>
    </div>
  )
}
