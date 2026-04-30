import type { Rfp } from "@/types/rfp";

const DAY_MS = 86400000;

export const mockRfps: Rfp[] = [
    {
        id: "1",
        title: "Custom Modular Display Systems Accessories",
        agency: "All Using Agencies",
        dueDate: new Date(Date.now() + 100 * DAY_MS),
        description:
            "The contractor is expected to provide Custom and Modular Display Systems, Accessories, and related Services for Commonwealth agencies statewide. Contractors who meet qualifications will be awarded a contract and may respond to Requests for Quotes for these products and services.",
    },
    {
        id: "2",
        title: "RFP for: Automation & AI Software for Professional Services",
        agency: "City of Brockton",
        dueDate: new Date(Date.now() + 4 * DAY_MS),
        description:
            "Provide Automation & AI Software for Professional Services. Deliverables include content management software (document management software), content workflow software, enterprise system management software, network management software (network operating system enhancement software), and economic analysis.",
    },
    {
        id: "3",
        title: "RFP 07-2025-IT009 Debt Management Software Solution",
        agency: "DEPARTMENT OF TREASURER",
        dueDate: new Date(Date.now() + 6 * DAY_MS),
        description:
            "Provide a single-sign-on SaaS debt management solution for state and local government debt: host and secure debt records and schedules, migrate existing SQL Server data, integrate with third-party systems, support RBAC for 200+ concurrent users, automate workflows and reporting, manage documents, provide disaster recovery, training, maintenance, and support.",
    },
    {
        id: "4",
        title: "Cloud-Based Public Safety Software Solution at TSTC",
        agency: "Texas State Technical College",
        dueDate: new Date(Date.now() + 4 * DAY_MS),
        description:
            "Provide, implement, configure, migrate, and support a cloud-based public safety solution (CAD, RMS, Mobile Field Reporting) as a unified multi-campus/ORI system. Deliver architecture, project plan, data migration and validation, security/compliance documentation (CJIS, TX-RAMP, SOC2, FIPS/AES-256), DR/BCP, training, ongoing support, and expansion pricing.",
    },
    {
        id: "5",
        title: "RFI# 2026-009-Enterprise Permitting, Licensing, Inspection, and Code Enforcement Software Solutions",
        agency: "Cherokee County Government",
        dueDate: new Date(Date.now() + 12 * DAY_MS),
        description:
            "Provide, implement, and support an enterprise permitting, licensing, inspection, and code enforcement software platform including a centralized public portal, configurable workflows, mobile inspection tools, inspection scheduling, case management, reporting dashboards, integrations with GIS/financial/document/payment systems, security and disaster recovery, data export, training, and change-management services.",
    },
    {
        id: "6",
        title: "Emergency Notice - Revenue Enhancement Program",
        agency: "CFS - Children and Family Services",
        dueDate: new Date(Date.now() + 32 * DAY_MS),
        description:
            "Provide maintenance, development, and technical support for DCFS web and mainframe applications and databases that enable federal program eligibility and claiming. Deliver Title IV-E reimbursement preparation, identify recoverable costs, maintain Emergency Assistance and PACAP, perform first-level FFP reviews for adoption/guardianship subsidies, support audits, permanency reporting, and cross-agency coordination.",
    },
    {
        id: "7",
        title: "Pension Administration Sys Modernization Pasmod",
        agency: "State Employees' Retirement System",
        dueDate: new Date(Date.now() + 41 * DAY_MS),
        description:
            "Replace its legacy custom developed pension administration technologies with a commercial software solution. Procure an integrated enterprise pension administration software product that will support the full retirement benefit lifecycle, from enrollment and service tracking through retirement processing, annuity payroll, employer contribution management, and post-retirement services.",
    },
    {
        id: "8",
        title: "RFP 739-SL3732580 AI-Enhanced Dictation and Transcription Solution",
        agency: "Texas Tech Health Science Cnt",
        dueDate: new Date(Date.now() + 15 * DAY_MS),
        description:
            "Provide a HIPAA-compliant, TX-RAMP-certified cloud SaaS AI dictation and transcription platform (real-time and ambient) with specialty language models, ≥95% accuracy, speaker separation, desktop/mobile UIs, and structured/free-text support; integrate with EHRs (Epic/Altera), plus implementation, pilot, training, 24/7 support, maintenance, SLAs, and quarterly reports.",
    },
];
