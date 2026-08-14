import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_ticket",
  title: "Create a support ticket",
  description: "Open a new WularData support ticket for the signed-in user, with an optional first message.",
  inputSchema: {
    subject: z.string().trim().min(3).max(200).describe("Short summary of the issue."),
    service: z.string().trim().max(150).optional().describe("Affected service, e.g. 'Dedicated Servers'."),
    priority: z.enum(["low", "normal", "high", "urgent"]).default("normal").describe("Ticket priority."),
    body: z.string().trim().max(4000).optional().describe("First message describing the issue."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ subject, service, priority, body }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const userId = ctx.getUserId()!;
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("support_tickets")
      .insert({ user_id: userId, subject, service, priority: priority ?? "normal" })
      .select("id, subject, service, priority, status, created_at");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const ticket = data?.[0];
    if (ticket && body) {
      const { error: msgError } = await supabase
        .from("ticket_messages")
        .insert({ ticket_id: ticket.id, sender_id: userId, body });
      if (msgError) {
        return {
          content: [
            { type: "text", text: `Ticket ${ticket.id} created, but the first message failed: ${msgError.message}` },
          ],
          isError: true,
        };
      }
    }
    return {
      content: [{ type: "text", text: JSON.stringify(ticket ?? {}, null, 2) }],
      structuredContent: { ticket },
    };
  },
});
