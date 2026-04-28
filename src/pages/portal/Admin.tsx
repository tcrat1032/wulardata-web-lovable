import PortalLayout from "@/components/portal/PortalLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const QUOTE_STATUSES = ["new", "in_review", "quoted", "closed"];
const TICKET_STATUSES = ["open", "pending", "resolved", "closed"];

const Admin = () => {
  const [tab, setTab] = useState<"quotes" | "tickets">("quotes");
  const [quotes, setQuotes] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  const load = async () => {
    const [{ data: q }, { data: t }] = await Promise.all([
      supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("support_tickets").select("*").order("created_at", { ascending: false }),
    ]);
    setQuotes(q || []); setTickets(t || []);
  };

  useEffect(() => { document.title = "Admin | WularData"; load(); }, []);

  const updateQuote = async (id: string, status: string) => {
    const { error } = await supabase.from("quote_requests").update({ status: status as any }).eq("id", id);
    if (error) toast.error("Failed"); else { toast.success("Updated"); load(); }
  };
  const updateTicket = async (id: string, status: string) => {
    const { error } = await supabase.from("support_tickets").update({ status: status as any }).eq("id", id);
    if (error) toast.error("Failed"); else { toast.success("Updated"); load(); }
  };

  return (
    <PortalLayout requireAdmin>
      <h1 className="text-2xl font-extrabold mb-1">Admin</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage all customer enquiries and tickets.</p>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("quotes")} className={`px-4 py-2 rounded-md text-sm font-semibold ${tab === "quotes" ? "bg-[hsl(var(--deep-blue))] text-white" : "bg-white border"}`}>Quotes ({quotes.length})</button>
        <button onClick={() => setTab("tickets")} className={`px-4 py-2 rounded-md text-sm font-semibold ${tab === "tickets" ? "bg-[hsl(var(--deep-blue))] text-white" : "bg-white border"}`}>Tickets ({tickets.length})</button>
      </div>
      <div className="rounded-lg bg-white shadow-card overflow-hidden overflow-x-auto">
        {tab === "quotes" ? (
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Service</th><th className="p-3 text-left">Submitted</th><th className="p-3 text-left">Status</th></tr>
            </thead>
            <tbody>
              {quotes.map(q => (
                <tr key={q.id} className="border-t">
                  <td className="p-3 font-medium">{q.contact_name}<div className="text-xs text-muted-foreground">{q.company || "—"}</div></td>
                  <td className="p-3 text-muted-foreground">{q.email}<div className="text-xs">{q.phone || ""}</div></td>
                  <td className="p-3">{q.service_name}<div className="text-xs text-muted-foreground">{q.service_category}</div></td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(q.created_at).toLocaleString()}</td>
                  <td className="p-3">
                    <select value={q.status} onChange={e => updateQuote(q.id, e.target.value)} className="rounded border bg-white px-2 py-1 text-xs">
                      {QUOTE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="p-3 text-left">Subject</th><th className="p-3 text-left">Service</th><th className="p-3 text-left">Priority</th><th className="p-3 text-left">Created</th><th className="p-3 text-left">Status</th></tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} className="border-t">
                  <td className="p-3 font-medium">{t.subject}</td>
                  <td className="p-3 text-muted-foreground">{t.service || "—"}</td>
                  <td className="p-3 capitalize">{t.priority}</td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(t.created_at).toLocaleString()}</td>
                  <td className="p-3">
                    <select value={t.status} onChange={e => updateTicket(t.id, e.target.value)} className="rounded border bg-white px-2 py-1 text-xs">
                      {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PortalLayout>
  );
};

export default Admin;
