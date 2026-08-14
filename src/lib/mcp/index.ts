import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import listQuotesTool from "./tools/list-quotes";
import createQuoteRequestTool from "./tools/create-quote-request";
import listTicketsTool from "./tools/list-tickets";
import createTicketTool from "./tools/create-ticket";
import replyToTicketTool from "./tools/reply-to-ticket";
import getTicketMessagesTool from "./tools/get-ticket-messages";
import getProfileTool from "./tools/get-profile";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "ovh-insights-report",
  title: "OVH Insights Report",
  version: "0.1.0",
  instructions:
    "Tools for the WularData customer portal. Browse the service catalogue with `list_services`, manage quote requests with `list_quotes` and `create_quote_request`, and handle support with `list_tickets`, `create_ticket`, `get_ticket_messages` and `reply_to_ticket`. `get_profile` returns the signed-in customer's details. All data tools act as the authenticated user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listServicesTool,
    listQuotesTool,
    createQuoteRequestTool,
    listTicketsTool,
    createTicketTool,
    getTicketMessagesTool,
    replyToTicketTool,
    getProfileTool,
  ],
});
