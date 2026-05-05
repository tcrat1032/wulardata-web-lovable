import { Archive, ShieldCheck, Server, Database, Cloud, Layers } from "lucide-react";

export type BackupCategory = "Backup-as-a-Service" | "Disaster Recovery" | "Workload Protection" | "Archive & Compliance";

export type BackupProduct = {
  id: string;
  name: string;
  category: BackupCategory;
  tagline: string;
  description: string;
  features: string[];
  rpo: string;
  rto: string;
  startingPrice: string; // INR
  icon: any;
  popular?: boolean;
};

export const BACKUP_CATEGORIES: BackupCategory[] = [
  "Backup-as-a-Service",
  "Disaster Recovery",
  "Workload Protection",
  "Archive & Compliance",
];

export const BACKUP_PRODUCTS: BackupProduct[] = [
  {
    id: "veeam-baas", name: "Veeam Backup-as-a-Service", category: "Backup-as-a-Service", icon: ShieldCheck,
    tagline: "Enterprise backup, fully managed.",
    description: "Veeam-powered backup for VMware, Hyper-V, physical servers and Microsoft 365 with offsite replication and immutable copies.",
    features: ["Veeam Cloud Connect", "Immutable backups", "Offsite replication", "Granular restore", "App-aware (SQL, Exchange, AD)", "Self-service portal"],
    rpo: "15 min", rto: "1 hr",
    startingPrice: "₹4,999/mo",
    popular: true,
  },
  {
    id: "acronis-baas", name: "Acronis Cyber Protect", category: "Backup-as-a-Service", icon: ShieldCheck,
    tagline: "Backup with built-in cybersecurity.",
    description: "Unified backup, anti-malware and endpoint management for servers, workstations and Microsoft 365 / Google Workspace.",
    features: ["Anti-ransomware", "M365 / Workspace backup", "Bare-metal restore", "Endpoint protection", "Patch management", "Forensic backup"],
    rpo: "1 hr", rto: "2 hr",
    startingPrice: "₹2,999/mo",
  },
  {
    id: "dr-veeam", name: "Disaster Recovery (Veeam)", category: "Disaster Recovery", icon: Cloud,
    tagline: "Push-button failover to our cloud.",
    description: "Veeam-replicated DR site with orchestrated failover, runbooks and quarterly DR drills run by our team.",
    features: ["Continuous replication", "Orchestrated failover", "Runbooks & DR drills", "Re-IP automation", "Failback to source", "Compliance reports"],
    rpo: "5 min", rto: "30 min",
    startingPrice: "₹14,999/mo",
    popular: true,
  },
  {
    id: "dr-zerto", name: "Disaster Recovery (Zerto-style CDP)", category: "Disaster Recovery", icon: Cloud,
    tagline: "Continuous data protection for tier-1 apps.",
    description: "Journal-based continuous replication with seconds-level RPO for mission-critical workloads.",
    features: ["Journal-based CDP", "Seconds-level RPO", "App-consistent groups", "Non-disruptive testing", "Failback automation", "Audit logs"],
    rpo: "Seconds", rto: "Minutes",
    startingPrice: "₹19,999/mo",
  },
  {
    id: "vm-protect", name: "VM Protection", category: "Workload Protection", icon: Server,
    tagline: "Image-level backup for VMware & Hyper-V.",
    description: "Agentless, image-level backup of VMs with changed-block tracking and instant VM recovery.",
    features: ["Agentless backup", "CBT incremental", "Instant VM recovery", "SureBackup verification", "Encryption", "Tape-out option"],
    rpo: "1 hr", rto: "15 min",
    startingPrice: "₹999/VM/mo",
  },
  {
    id: "db-protect", name: "Database Backup", category: "Workload Protection", icon: Database,
    tagline: "App-aware backup for SQL & Oracle.",
    description: "Application-consistent backup for SQL Server, Oracle, PostgreSQL and MySQL with PITR support.",
    features: ["App-aware quiesce", "Log shipping & PITR", "Granular table restore", "Compression & dedup", "Encryption", "Cross-region copy"],
    rpo: "15 min", rto: "30 min",
    startingPrice: "₹1,499/DB/mo",
  },
  {
    id: "m365-protect", name: "Microsoft 365 Backup", category: "Workload Protection", icon: Cloud,
    tagline: "Backup Exchange, OneDrive, SharePoint & Teams.",
    description: "Daily backups of mailboxes, files, SharePoint sites and Teams chats — restore items, sites or whole mailboxes.",
    features: ["Mailbox & calendar", "OneDrive & SharePoint", "Teams chats & channels", "Granular restore", "Long-term retention", "eDiscovery export"],
    rpo: "Daily", rto: "Minutes",
    startingPrice: "₹149/user/mo",
  },
  {
    id: "endpoint-protect", name: "Endpoint Backup", category: "Workload Protection", icon: Server,
    tagline: "Protect laptops & workstations.",
    description: "Continuous file-level backup for Windows and macOS endpoints with self-service restore.",
    features: ["Continuous backup", "Self-service restore", "Offline cache", "Encryption", "Roaming user support", "Remote wipe"],
    rpo: "15 min", rto: "Minutes",
    startingPrice: "₹199/seat/mo",
  },
  {
    id: "immutable-archive", name: "Immutable Archive", category: "Archive & Compliance", icon: Archive,
    tagline: "WORM-locked storage for compliance.",
    description: "Object-lock backed archive for regulatory retention — meets SEBI, RBI and DPDP audit requirements.",
    features: ["Object Lock (WORM)", "Legal hold", "11×9s durability", "Audit logs", "Compliance reports", "Lifecycle from backups"],
    rpo: "—", rto: "Async",
    startingPrice: "₹0.4/GB/mo",
  },
  {
    id: "tape-out", name: "Offsite Tape Archive", category: "Archive & Compliance", icon: Layers,
    tagline: "Air-gapped tape for ultra-long retention.",
    description: "LTO tape rotation for archives that must be physically air-gapped from production networks.",
    features: ["LTO-9 media", "Air-gapped", "Vaulted offsite", "Encryption at rest", "Chain-of-custody", "Up to 20-yr retention"],
    rpo: "Weekly", rto: "Days",
    startingPrice: "Quote-based",
  },
];
