import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_ticket_messages",
  title: "Read a ticket conversation",
  description: "Read the message thread of one of the signed-in user's WularData support tickets.",
  inputSchema: {
    ticket_id: z.string().uuid().describe("ID of the ticket."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ ticket_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("ticket_messages")
      .select("id, sender_id, body, created_at")
      .eq("ticket_id", ticket_id)
      .order("created_at", { ascending: true });
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
          structuredContent: { messages: data ?? [] },
        };
  },
});
