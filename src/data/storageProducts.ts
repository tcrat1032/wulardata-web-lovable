import { HardDrive, Layers, Archive, Server, Cloud, Database } from "lucide-react";

export type StorageCategory = "Object Storage" | "Block Storage" | "File Storage" | "Backup & Archive";

export type StorageProduct = {
  id: string;
  name: string;
  category: StorageCategory;
  tagline: string;
  description: string;
  features: string[];
  startingPrice: string; // INR
  icon: any;
  popular?: boolean;
};

export const STORAGE_CATEGORIES: StorageCategory[] = [
  "Object Storage",
  "Block Storage",
  "File Storage",
  "Backup & Archive",
];

export const STORAGE_PRODUCTS: StorageProduct[] = [
  {
    id: "object-standard", name: "Object Storage — Standard", category: "Object Storage", icon: Cloud,
    tagline: "S3-compatible storage for hot data.",
    description: "Durable, geo-replicated object storage with the S3 API — ideal for media, static assets, app data and backups accessed frequently.",
    features: ["S3 API compatible", "11×9s durability", "Lifecycle policies", "Pre-signed URLs", "Versioning", "TLS in transit"],
    startingPrice: "₹2.5/GB/mo",
    popular: true,
  },
  {
    id: "object-cold", name: "Object Storage — Cold", category: "Object Storage", icon: Archive,
    tagline: "Low-cost storage for infrequent access.",
    description: "Lower-cost tier for backups, archives and data accessed a few times a year — same S3 API, lower price per GB.",
    features: ["S3 API compatible", "Up to 70% cheaper", "Async retrieval", "Lifecycle transitions", "11×9s durability", "Versioning"],
    startingPrice: "₹0.9/GB/mo",
  },
  {
    id: "object-highperf", name: "Object Storage — High Performance", category: "Object Storage", icon: Cloud,
    tagline: "NVMe-backed S3 for demanding workloads.",
    description: "Low-latency, high-throughput object storage backed by NVMe — built for AI training datasets, analytics and media processing.",
    features: ["NVMe backend", "Multi-Gbps throughput", "S3 API compatible", "Sub-10ms latency", "Multipart uploads", "TLS in transit"],
    startingPrice: "₹6/GB/mo",
  },
  {
    id: "block-ssd", name: "Block Storage — SSD", category: "Block Storage", icon: HardDrive,
    tagline: "High-IOPS NVMe volumes.",
    description: "Detachable, snapshot-able NVMe block volumes for instances and Kubernetes workloads with online resize.",
    features: ["Up to 50k IOPS", "Online resize", "Snapshots", "Encrypted at rest", "Detach & reattach", "Multi-AZ replication"],
    startingPrice: "₹6/GB/mo",
    popular: true,
  },
  {
    id: "block-hdd", name: "Block Storage — Capacity", category: "Block Storage", icon: HardDrive,
    tagline: "Cost-efficient HDD-backed volumes.",
    description: "Larger, throughput-oriented block storage for log stores, file servers and warm data sets.",
    features: ["Up to 5k IOPS", "High sequential throughput", "Snapshots", "Online resize", "Encrypted at rest", "Detach & reattach"],
    startingPrice: "₹2.5/GB/mo",
  },
  {
    id: "file-nfs", name: "File Storage — NFS", category: "File Storage", icon: Server,
    tagline: "Shared NFS file shares across instances.",
    description: "Fully managed NFS shares that can be mounted simultaneously by multiple servers — ideal for shared content and CI runners.",
    features: ["NFSv4", "Multi-mount", "POSIX permissions", "Snapshots", "Encrypted at rest", "Online resize"],
    startingPrice: "₹4/GB/mo",
  },
  {
    id: "file-smb", name: "File Storage — SMB", category: "File Storage", icon: Server,
    tagline: "Windows-friendly SMB file shares.",
    description: "Managed SMB/CIFS shares for Windows workloads, profile redirection and legacy file workflows.",
    features: ["SMB 3.x", "Active Directory integration", "Multi-mount", "Snapshots", "Encrypted at rest", "Quotas"],
    startingPrice: "₹4.5/GB/mo",
  },
  {
    id: "backup-managed", name: "Managed Backup", category: "Backup & Archive", icon: Archive,
    tagline: "Policy-driven backups for VMs & databases.",
    description: "Veeam / Acronis powered backup-as-a-service for your servers, VMs and databases with offsite replication.",
    features: ["Veeam / Acronis", "Offsite replication", "RPO from 15 min", "Immutable copies", "App-consistent", "Compliance reports"],
    startingPrice: "₹4,999/mo",
    popular: true,
  },
  {
    id: "archive-deep", name: "Deep Archive", category: "Backup & Archive", icon: Database,
    tagline: "Long-term retention at the lowest cost.",
    description: "Write-once-read-rarely storage for regulatory archives and long-term retention — priced for years of retention.",
    features: ["Lowest ₹/GB", "WORM lock support", "11×9s durability", "Async retrieval", "Lifecycle from object storage", "Audit logs"],
    startingPrice: "₹0.4/GB/mo",
  },
  {
    id: "snapshots", name: "Snapshot Storage", category: "Backup & Archive", icon: Layers,
    tagline: "Point-in-time volume snapshots.",
    description: "Incremental snapshots of block volumes for fast restore points — pay only for changed blocks.",
    features: ["Incremental", "Cross-AZ copy", "Scheduled policies", "Encrypted", "Restore in minutes", "Per-GB billing"],
    startingPrice: "₹1.5/GB/mo",
  },
];
