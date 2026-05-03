export type VpsCategory = "Starter" | "Value" | "Essential" | "Comfort" | "Elite";

export type VpsPlan = {
  id: string;
  name: string;
  category: VpsCategory;
  vCores: number;
  cpu: string;
  memoryGB: number;
  storageGB: number;
  storageType: "NVMe SSD" | "SSD";
  bandwidth: string;
  bandwidthGbps: number;
  os: string[];
  priceMonthly: number; // INR
  highlight?: string;
};

export const VPS_CATEGORIES: { key: VpsCategory; title: string; desc: string }[] = [
  { key: "Starter", title: "Starter", desc: "Lightweight VPS for dev, test and small sites." },
  { key: "Value", title: "Value", desc: "Balanced compute and storage for everyday workloads." },
  { key: "Essential", title: "Essential", desc: "Production-ready VPS for SMB websites and apps." },
  { key: "Comfort", title: "Comfort", desc: "Higher RAM and NVMe for demanding apps and DBs." },
  { key: "Elite", title: "Elite", desc: "Top-tier VPS with maximum CPU, RAM and storage." },
];

export const VPS_PLANS: VpsPlan[] = [
  {
    id: "vps-starter-1", name: "vps-starter-1", category: "Starter",
    vCores: 1, cpu: "Shared vCore",
    memoryGB: 2, storageGB: 40, storageType: "NVMe SSD",
    bandwidth: "250 Mbps unmetered", bandwidthGbps: 0.25,
    os: ["Linux", "Windows"], priceMonthly: 499, highlight: "Best value",
  },
  {
    id: "vps-starter-2", name: "vps-starter-2", category: "Starter",
    vCores: 2, cpu: "Shared vCore",
    memoryGB: 4, storageGB: 80, storageType: "NVMe SSD",
    bandwidth: "500 Mbps unmetered", bandwidthGbps: 0.5,
    os: ["Linux", "Windows"], priceMonthly: 899,
  },
  {
    id: "vps-value-1", name: "vps-value-1", category: "Value",
    vCores: 2, cpu: "Dedicated vCore",
    memoryGB: 4, storageGB: 100, storageType: "NVMe SSD",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    os: ["Linux", "Windows"], priceMonthly: 1299,
  },
  {
    id: "vps-value-2", name: "vps-value-2", category: "Value",
    vCores: 4, cpu: "Dedicated vCore",
    memoryGB: 8, storageGB: 160, storageType: "NVMe SSD",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    os: ["Linux", "Windows"], priceMonthly: 2199, highlight: "Popular",
  },
  {
    id: "vps-essential-1", name: "vps-essential-1", category: "Essential",
    vCores: 4, cpu: "Dedicated vCore",
    memoryGB: 16, storageGB: 320, storageType: "NVMe SSD",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    os: ["Linux", "Windows"], priceMonthly: 3499,
  },
  {
    id: "vps-essential-2", name: "vps-essential-2", category: "Essential",
    vCores: 6, cpu: "Dedicated vCore",
    memoryGB: 24, storageGB: 480, storageType: "NVMe SSD",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    os: ["Linux", "Windows"], priceMonthly: 4999,
  },
  {
    id: "vps-comfort-1", name: "vps-comfort-1", category: "Comfort",
    vCores: 8, cpu: "Dedicated vCore",
    memoryGB: 32, storageGB: 640, storageType: "NVMe SSD",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    os: ["Linux", "Windows"], priceMonthly: 6999,
  },
  {
    id: "vps-comfort-2", name: "vps-comfort-2", category: "Comfort",
    vCores: 12, cpu: "Dedicated vCore",
    memoryGB: 48, storageGB: 960, storageType: "NVMe SSD",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    os: ["Linux", "Windows"], priceMonthly: 9499,
  },
  {
    id: "vps-elite-1", name: "vps-elite-1", category: "Elite",
    vCores: 16, cpu: "Dedicated vCore",
    memoryGB: 64, storageGB: 1280, storageType: "NVMe SSD",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    os: ["Linux", "Windows"], priceMonthly: 12999, highlight: "Top performance",
  },
  {
    id: "vps-elite-2", name: "vps-elite-2", category: "Elite",
    vCores: 24, cpu: "Dedicated vCore",
    memoryGB: 96, storageGB: 1920, storageType: "NVMe SSD",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    os: ["Linux", "Windows"], priceMonthly: 18999,
  },
];
