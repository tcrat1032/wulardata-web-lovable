import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_profile",
  title: "Get my profile",
  description: "Return the signed-in user's WularData customer profile details.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, company, phone, country, created_at")
      .eq("id", ctx.getUserId()!)
      .maybeSingle();
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [
            {
              type: "text",
              text: JSON.stringify({ email: ctx.getUserEmail(), ...(data ?? {}) }, null, 2),
            },
          ],
          structuredContent: { profile: { email: ctx.getUserEmail(), ...(data ?? {}) } },
        };
  },
});
