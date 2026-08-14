import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "reply_to_ticket",
  title: "Reply to a support ticket",
  description: "Post a message on one of the signed-in user's WularData support tickets.",
  inputSchema: {
    ticket_id: z.string().uuid().describe("ID of the ticket to reply to."),
    body: z.string().trim().min(1).max(4000).describe("Message text."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ ticket_id, body }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("ticket_messages")
      .insert({ ticket_id, sender_id: ctx.getUserId()!, body })
      .select("id, ticket_id, body, created_at");
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}, null, 2) }],
          structuredContent: { message: data?.[0] },
        };
  },
});
