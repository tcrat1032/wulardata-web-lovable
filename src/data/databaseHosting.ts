import { Database, Layers, Cpu, Search, Network, GitBranch } from "lucide-react";

export type DBEngineCategory = "Relational" | "NoSQL" | "In-Memory" | "Search & Analytics" | "Streaming";

export type DBEngine = {
  id: string;
  name: string;
  engine: string;
  category: DBEngineCategory;
  tagline: string;
  description: string;
  versions: string[];
  features: string[];
  startingPrice: string; // INR
  icon: any;
  popular?: boolean;
};

export const DB_CATEGORIES: DBEngineCategory[] = [
  "Relational",
  "NoSQL",
  "In-Memory",
  "Search & Analytics",
  "Streaming",
];

export const DB_ENGINES: DBEngine[] = [
  {
    id: "postgresql", name: "Managed PostgreSQL", engine: "PostgreSQL", category: "Relational", icon: Database,
    tagline: "The world's most advanced open-source SQL.",
    description: "Production-grade PostgreSQL with automated backups, point-in-time recovery, read replicas and HA failover.",
    versions: ["14", "15", "16", "17"],
    features: ["Automated daily backups", "PITR up to 30 days", "Read replicas", "HA with auto failover", "TLS in transit", "pgvector & PostGIS"],
    startingPrice: "₹2,499/mo",
    popular: true,
  },
  {
    id: "mysql", name: "Managed MySQL", engine: "MySQL", category: "Relational", icon: Database,
    tagline: "The most popular open-source database.",
    description: "Tuned MySQL clusters with HA replication, online schema changes and slow-query insights.",
    versions: ["5.7", "8.0", "8.4"],
    features: ["HA replication", "Daily backups", "Online schema changes", "Slow-query insights", "TLS support", "Binlog streaming"],
    startingPrice: "₹2,299/mo",
    popular: true,
  },
  {
    id: "mariadb", name: "Managed MariaDB", engine: "MariaDB", category: "Relational", icon: Database,
    tagline: "MySQL-compatible with extra performance.",
    description: "Community-driven MariaDB with Galera clustering options and full compatibility with MySQL clients.",
    versions: ["10.6", "10.11", "11.4"],
    features: ["Galera clustering", "Daily backups", "PITR", "TLS support", "Audit plugin", "ColumnStore option"],
    startingPrice: "₹2,199/mo",
  },
  {
    id: "mongodb", name: "Managed MongoDB", engine: "MongoDB", category: "NoSQL", icon: Database,
    tagline: "Flexible document database, scaled & secured.",
    description: "Replica-set MongoDB with sharding, encrypted storage and 24×7 monitoring.",
    versions: ["6.0", "7.0", "8.0"],
    features: ["Replica sets", "Sharding ready", "Encryption at rest", "30-day backup retention", "Change streams", "Atlas-style API"],
    startingPrice: "₹2,799/mo",
    popular: true,
  },
  {
    id: "cassandra", name: "Managed Cassandra", engine: "Apache Cassandra", category: "NoSQL", icon: Layers,
    tagline: "Massively scalable wide-column store.",
    description: "Multi-node Cassandra clusters built for write-heavy, globally distributed workloads.",
    versions: ["4.1", "5.0"],
    features: ["Multi-DC replication", "Tunable consistency", "Snapshot backups", "TLS + auth", "Linear scalability", "Repair automation"],
    startingPrice: "₹6,499/mo",
  },
  {
    id: "redis", name: "Managed Redis", engine: "Redis", category: "In-Memory", icon: Cpu,
    tagline: "Sub-millisecond cache & queue.",
    description: "High-performance Redis with persistence options and Sentinel-based HA failover.",
    versions: ["6.2", "7.2", "7.4"],
    features: ["AOF + RDB persistence", "Sentinel HA", "Eviction policies", "TLS support", "Pub/Sub & Streams", "ACL users"],
    startingPrice: "₹999/mo",
    popular: true,
  },
  {
    id: "valkey", name: "Managed Valkey", engine: "Valkey", category: "In-Memory", icon: Cpu,
    tagline: "Open-source Redis-compatible KV store.",
    description: "Valkey clusters fully compatible with Redis clients — community-governed and license-friendly.",
    versions: ["7.2", "8.0"],
    features: ["Redis client compatible", "HA failover", "Persistence", "TLS support", "ACLs", "Cluster mode"],
    startingPrice: "₹899/mo",
  },
  {
    id: "elasticsearch", name: "Managed Elasticsearch", engine: "Elasticsearch", category: "Search & Analytics", icon: Search,
    tagline: "Full-text search at scale.",
    description: "Production Elasticsearch clusters with Kibana, snapshot backups and index lifecycle management.",
    versions: ["7.17", "8.x"],
    features: ["Bundled Kibana", "Snapshot backups", "ILM policies", "TLS + RBAC", "Hot-warm tiers", "Alerting"],
    startingPrice: "₹3,999/mo",
  },
  {
    id: "opensearch", name: "Managed OpenSearch", engine: "OpenSearch", category: "Search & Analytics", icon: Search,
    tagline: "Open-source search & observability.",
    description: "OpenSearch clusters with Dashboards, anomaly detection and full Apache 2.0 licensing.",
    versions: ["2.x"],
    features: ["OpenSearch Dashboards", "Anomaly detection", "Snapshot backups", "Fine-grained access", "Hot-warm tiers", "SQL & PPL"],
    startingPrice: "₹3,799/mo",
  },
  {
    id: "clickhouse", name: "Managed ClickHouse", engine: "ClickHouse", category: "Search & Analytics", icon: Layers,
    tagline: "Blazing-fast OLAP for analytics.",
    description: "Columnar ClickHouse clusters tuned for billions of rows and sub-second analytical queries.",
    versions: ["24.x"],
    features: ["Columnar storage", "Replication & sharding", "S3 tiered storage", "TLS + RBAC", "Materialised views", "Kafka engine"],
    startingPrice: "₹4,999/mo",
  },
  {
    id: "kafka", name: "Managed Kafka", engine: "Apache Kafka", category: "Streaming", icon: Network,
    tagline: "Distributed event streaming.",
    description: "HA Kafka clusters with KRaft, schema registry and Kafka Connect for end-to-end streaming pipelines.",
    versions: ["3.6", "3.7", "3.8"],
    features: ["KRaft mode", "Schema registry", "Kafka Connect", "TLS + SASL", "Mirror Maker 2", "Retention policies"],
    startingPrice: "₹5,499/mo",
  },
  {
    id: "rabbitmq", name: "Managed RabbitMQ", engine: "RabbitMQ", category: "Streaming", icon: GitBranch,
    tagline: "Reliable message broker.",
    description: "Clustered RabbitMQ for AMQP, MQTT and STOMP workloads with management UI and metrics.",
    versions: ["3.12", "3.13", "4.0"],
    features: ["Quorum queues", "Mirrored queues", "Management UI", "TLS + RBAC", "Shovel & federation", "Prometheus metrics"],
    startingPrice: "₹2,899/mo",
  },
];
