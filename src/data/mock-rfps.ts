import { type Rfp, Status } from "@/types/rfp";

const DAY_MS = 86400000;

export const mockRfps: Rfp[] = [
    {
        id: "1",
        status: Status.Inbox,
        title: "Custom Modular Display Systems Accessories",
        agency: "All Using Agencies",
        dueDate: new Date(Date.now() + 100 * DAY_MS),
        description:
            "The contractor is expected to provide Custom and Modular Display Systems, Accessories, and related Services for Commonwealth agencies statewide. Contractors who meet qualifications will be awarded a contract and may respond to Requests for Quotes for these products and services.",
    },
    {
        id: "2",
        status: Status.Inbox,
        title: "RFP for: Automation & AI Software for Professional Services",
        agency: "City of Brockton",
        dueDate: new Date(Date.now() + 4 * DAY_MS),
        description:
            "Provide Automation & AI Software for Professional Services. Deliverables include content management software (document management software), content workflow software, enterprise system management software, network management software (network operating system enhancement software), and economic analysis.",
    },
    {
        id: "3",
        status: Status.Inbox,
        title: "RFP 07-2025-IT009 Debt Management Software Solution",
        agency: "DEPARTMENT OF TREASURER",
        dueDate: new Date(Date.now() + 6 * DAY_MS),
        description:
            "Provide a single-sign-on SaaS debt management solution for state and local government debt: host and secure debt records and schedules, migrate existing SQL Server data, integrate with third-party systems, support RBAC for 200+ concurrent users, automate workflows and reporting, manage documents, provide disaster recovery, training, maintenance, and support.",
    },
    {
        id: "4",
        status: Status.Inbox,
        title: "Cloud-Based Public Safety Software Solution at TSTC",
        agency: "Texas State Technical College",
        dueDate: new Date(Date.now() + 4 * DAY_MS),
        description:
            "Provide, implement, configure, migrate, and support a cloud-based public safety solution (CAD, RMS, Mobile Field Reporting) as a unified multi-campus/ORI system. Deliver architecture, project plan, data migration and validation, security/compliance documentation (CJIS, TX-RAMP, SOC2, FIPS/AES-256), DR/BCP, training, ongoing support, and expansion pricing.",
    },
    {
        id: "5",
        status: Status.Inbox,
        title: "RFI# 2026-009-Enterprise Permitting, Licensing, Inspection, and Code Enforcement Software Solutions",
        agency: "Cherokee County Government",
        dueDate: new Date(Date.now() + 12 * DAY_MS),
        description:
            "Provide, implement, and support an enterprise permitting, licensing, inspection, and code enforcement software platform including a centralized public portal, configurable workflows, mobile inspection tools, inspection scheduling, case management, reporting dashboards, integrations with GIS/financial/document/payment systems, security and disaster recovery, data export, training, and change-management services.",
    },
    {
        id: "6",
        status: Status.Inbox,
        title: "Emergency Notice - Revenue Enhancement Program",
        agency: "CFS - Children and Family Services",
        dueDate: new Date(Date.now() + 32 * DAY_MS),
        description:
            "Provide maintenance, development, and technical support for DCFS web and mainframe applications and databases that enable federal program eligibility and claiming. Deliver Title IV-E reimbursement preparation, identify recoverable costs, maintain Emergency Assistance and PACAP, perform first-level FFP reviews for adoption/guardianship subsidies, support audits, permanency reporting, and cross-agency coordination.",
    },
    {
        id: "7",
        status: Status.Inbox,
        title: "Pension Administration Sys Modernization Pasmod",
        agency: "State Employees' Retirement System",
        dueDate: new Date(Date.now() + 41 * DAY_MS),
        description:
            "Replace its legacy custom developed pension administration technologies with a commercial software solution. Procure an integrated enterprise pension administration software product that will support the full retirement benefit lifecycle, from enrollment and service tracking through retirement processing, annuity payroll, employer contribution management, and post-retirement services.",
    },
    {
        id: "8",
        status: Status.Inbox,
        title: "RFP 739-SL3732580 AI-Enhanced Dictation and Transcription Solution",
        agency: "Texas Tech Health Science Cnt",
        dueDate: new Date(Date.now() + 15 * DAY_MS),
        description:
            "Provide a HIPAA-compliant, TX-RAMP-certified cloud SaaS AI dictation and transcription platform (real-time and ambient) with specialty language models, ≥95% accuracy, speaker separation, desktop/mobile UIs, and structured/free-text support; integrate with EHRs (Epic/Altera), plus implementation, pilot, training, 24/7 support, maintenance, SLAs, and quarterly reports.",
    },
    {
        id: "9",
        status: Status.Inbox,
        title: "RFQ 2026-IT-044 Zero Trust Network Access and Microsegmentation",
        agency: "State Office of Information Technology",
        dueDate: new Date(Date.now() + 18 * DAY_MS),
        description:
            "Procure a cloud-delivered ZTNA platform with device posture checks, SAML/OIDC SSO, split tunneling, and microsegmentation for agency VLANs. Deliver phased rollout, integration with existing IdP, logging to SIEM, penetration test remediation, and three years of support with named escalation paths.",
    },
    {
        id: "10",
        status: Status.Inbox,
        title: "RFP: Fleet Management and Telematics for Municipal Vehicles",
        agency: "Metro Transit Authority",
        dueDate: new Date(Date.now() + 22 * DAY_MS),
        description:
            "Seeking an integrated fleet management system with GPS/telematics, fuel and maintenance scheduling, driver safety scoring, geofencing, and APIs for payroll and asset systems. Include hardware options, installation across 1,200 vehicles, training, and 24/7 monitoring with SLA-backed uptime.",
    },
    {
        id: "11",
        status: Status.Inbox,
        title: "Solicitation HHS-2026-CLIN-112 Electronic Visit Verification (EVV) Solution",
        agency: "Department of Health and Human Services",
        dueDate: new Date(Date.now() + 9 * DAY_MS),
        description:
            "Provide a CMS-compliant EVV solution for home- and community-based services with mobile apps for caregivers, offline capture, exception workflows, fraud analytics, and state Medicaid MMIS interfaces. Vendor must support attestations, audits, and monthly aggregate reporting.",
    },
    {
        id: "12",
        status: Status.Inbox,
        title: "RFP 26-ENV-007 Stormwater Asset Management and Illicit Discharge Detection",
        agency: "City of Riverside Public Works",
        dueDate: new Date(Date.now() + 27 * DAY_MS),
        description:
            "Implement GIS-centric stormwater asset inventory, inspection scheduling, illicit discharge tracking, and NPDES reporting. Integrate with existing Esri enterprise, support field tablets, and include hydraulic modeling data exchange and public-facing complaint portal.",
    },
    {
        id: "13",
        status: Status.Inbox,
        title: "RFI: Learning Management System for Statewide Workforce Development",
        agency: "Workforce Innovation Board",
        dueDate: new Date(Date.now() + 45 * DAY_MS),
        description:
            "Explore LMS options supporting SCORM/xAPI, skills pathways, micro-credentials, accessibility WCAG 2.2 AA, multilingual UI, and integration with HRIS and unemployment systems. Responses should address hosting, data residency, AI tutoring guardrails, and pricing for 80,000 learners.",
    },
    {
        id: "14",
        status: Status.Inbox,
        title: "RFP EDU-2026-031 Student Information System Replacement",
        agency: "Unified School District 214",
        dueDate: new Date(Date.now() + 55 * DAY_MS),
        description:
            "Replace legacy SIS with a modern platform covering enrollment, scheduling, grades, IEP/504 workflows, parent portal, state reporting, and REST APIs for third-party apps. Migration must include historical transcripts, validation scripts, and parallel-run support for one full semester.",
    },
    {
        id: "15",
        status: Status.Inbox,
        title: "Emergency Procurement: Cyber Incident Response Retainer",
        agency: "State Cybersecurity Operations Center",
        dueDate: new Date(Date.now() + 2 * DAY_MS),
        description:
            "Establish a 12-month retainer for incident response, forensics, tabletop exercises, and threat hunting aligned to NIST 800-61. On-site and remote coverage required within four hours for severity-1 events, with optional purple-team engagements each quarter.",
    },
    {
        id: "16",
        status: Status.Inbox,
        title: "RFP 2026-HOUS-009 Housing Choice Voucher Program Management Software",
        agency: "Regional Housing Authority",
        dueDate: new Date(Date.now() + 36 * DAY_MS),
        description:
            "Provide HUD-compliant HCV software for waitlist, eligibility, rent reasonableness, HQS inspections, portability, and PIH reporting. Include mobile inspection apps, document management, and interfaces for utility allowance and payment standard updates.",
    },
    {
        id: "17",
        status: Status.Inbox,
        title: "RFQ: Laboratory Information Management System (LIMS) for Environmental Testing",
        agency: "State Department of Environmental Quality",
        dueDate: new Date(Date.now() + 48 * DAY_MS),
        description:
            "Replace paper-heavy lab workflows with LIMS supporting sample chain of custody, instrument integration, QA/QC limits, EPA methods templates, and electronic reporting to state and federal portals. Hosting must meet CJIS-equivalent controls for criminal case samples.",
    },
    {
        id: "18",
        status: Status.Inbox,
        title: "RFP TRANS-26-014 Real-Time Passenger Information and CAD/AVL Modernization",
        agency: "County Transportation Commission",
        dueDate: new Date(Date.now() + 30 * DAY_MS),
        description:
            "Modernize CAD/AVL with GTFS-RT feeds, multi-modal trip planner APIs, digital signage integration, and ADA-compliant voice/screen reader support for kiosks. Include historical AVL archive, ridership analytics, and integration with existing fare collection vendor.",
    },
    {
        id: "19",
        status: Status.Inbox,
        title: "Solicitation AG-2026-07 Crop Insurance Data Analytics and Actuarial Support Platform",
        agency: "Department of Agriculture",
        dueDate: new Date(Date.now() + 60 * DAY_MS),
        description:
            "Build or license a secure analytics environment for yield and loss data, geospatial risk modeling, and reproducible actuarial workflows. Must support role-based access for external researchers, audit logs, and export to federal crop insurance systems.",
    },
    {
        id: "20",
        status: Status.Inbox,
        title: "RFP JUST-2026-02 Body-Worn Camera and Digital Evidence Management Suite",
        agency: "Metropolitan Police Department",
        dueDate: new Date(Date.now() + 14 * DAY_MS),
        description:
            "Provide body-worn cameras, in-car integration, redaction tooling, CJIS-compliant cloud storage, chain-of-custody for court exhibits, and retention policies configurable by case type. Training for sworn and civilian staff plus five-year hardware refresh pricing required.",
    },
];
