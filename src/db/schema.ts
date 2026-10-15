import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: varchar("id", { length: 32 }).primaryKey(),
  name: varchar("name", { length: 64 }).notNull(),
  tagline: varchar("tagline", { length: 160 }).notNull().default(""),
  cores: integer("cores").notNull(),
  ramGb: integer("ram_gb").notNull(),
  nvmeGb: integer("nvme_gb").notNull(),
  monthlyCents: integer("monthly_cents").notNull(),
  highlighted: boolean("highlighted").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  planId: varchar("plan_id", { length: 32 }).notNull(),
  planName: varchar("plan_name", { length: 64 }).notNull(),
  cores: integer("cores").notNull(),
  ramGb: integer("ram_gb").notNull(),
  nvmeGb: integer("nvme_gb").notNull(),
  os: varchar("os", { length: 64 }).notNull(),
  runtimeDays: integer("runtime_days").notNull(),
  totalCents: integer("total_cents").notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  status: varchar("status", { length: 24 }).notNull().default("pending"),
  upstreamServerId: varchar("upstream_server_id", { length: 64 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Plan = typeof plans.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
