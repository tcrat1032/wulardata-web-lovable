import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_tickets",
  title: "List my support tickets",
  description: "List the signed-in user's WularData support tickets, newest first.",
  inputSchema: {
    status: z.enum(["open", "pending", "resolved", "closed"]).optional().describe("Optional status filter."),
    limit: z.number().int().min(1).max(50).default(20).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("support_tickets")
      .select("id, subject, service, priority, status, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
          structuredContent: { tickets: data ?? [] },
        };
  },
});
