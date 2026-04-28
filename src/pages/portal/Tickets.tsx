import PortalLayout from "@/components/portal/PortalLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, X, Loader2 } from "lucide-react";
import { ALL_SERVICES } from "@/data/services";
import { z } from "zod";

const statusColor: Record<string, string> = {
  open: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  resolved: "bg-emerald-100 text-emerald-800",
  closed: "bg-gray-100 text-gray-700",
};

const newSchema = z.object({
  subject: z.string().trim().min(3).max(200),
  service: z.string().max(150).optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  body: z.string().trim().min(5).max(2000),
});

const Tickets = () => {
  const [items, setItems] = useState<any[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ subject: "", service: "", priority: "normal" as const, body: "" });

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("support_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setItems(data || []);
  };

  useEffect(() => { document.title = "Support tickets | WularData"; load(); }, []);

  const openTicket = async (id: string) => {
    setOpenId(id);
    const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", id).order("created_at");
    setMessages(data || []);
  };

  const sendReply = async () => {
    if (!openId || !reply.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("ticket_messages").insert({ ticket_id: openId, sender_id: user.id, body: reply.trim() });
    if (error) { toast.error("Failed to send"); return; }
    setReply("");
    openTicket(openId);
  };

  const createTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = newSchema.safeParse(form);
    if (!r.success) { toast.error(r.error.errors[0].message); return; }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: t, error } = await supabase.from("support_tickets").insert({
      user_id: user.id, subject: r.data.subject, service: r.data.service || null, priority: r.data.priority,
    }).select().single();
    if (error || !t) { toast.error("Failed to create ticket"); setSubmitting(false); return; }
    await supabase.from("ticket_messages").insert({ ticket_id: t.id, sender_id: user.id, body: r.data.body });
    setSubmitting(false);
    setShowNew(false);
    setForm({ subject: "", service: "", priority: "normal", body: "" });
    toast.success("Ticket created");
    load();
  };

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">Support tickets</h1>
          <p className="text-muted-foreground text-sm">Get help from the WularData team.</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary-solid !py-2.5"><Plus className="h-4 w-4" /> New ticket</button>
      </div>

      <div className="rounded-lg bg-white shadow-card overflow-hidden">
        {items.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No tickets yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-3">Subject</th><th className="text-left p-3">Service</th><th className="text-left p-3">Priority</th><th className="text-left p-3">Updated</th><th className="text-left p-3">Status</th></tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id} onClick={() => openTicket(t.id)} className="border-t cursor-pointer hover:bg-secondary">
                  <td className="p-3 font-medium">{t.subject}</td>
                  <td className="p-3 text-muted-foreground">{t.service || "—"}</td>
                  <td className="p-3"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary capitalize">{t.priority}</span></td>
                  <td className="p-3 text-muted-foreground">{new Date(t.updated_at).toLocaleDateString()}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColor[t.status]}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail drawer */}
      {openId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={() => setOpenId(null)}>
          <div className="w-full max-w-lg bg-white h-full overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">{items.find(i => i.id === openId)?.subject}</h2>
              <button onClick={() => setOpenId(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 mb-4">
              {messages.map(m => (
                <div key={m.id} className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(m.created_at).toLocaleString()}</p>
                  <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
            </div>
            <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply…" rows={4} className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
            <button onClick={sendReply} className="btn-primary-solid mt-2 !py-2">Send reply</button>
          </div>
        </div>
      )}

      {/* New ticket modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowNew(false)}>
          <div className="bg-white rounded-lg w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">New ticket</h2>
              <button onClick={() => setShowNew(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={createTicket} className="space-y-3">
              <input required placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="rounded-md border px-3 py-2.5 text-sm bg-white">
                  <option value="">Service (optional)</option>
                  {ALL_SERVICES.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
                </select>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as any })} className="rounded-md border px-3 py-2.5 text-sm bg-white">
                  <option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option>
                </select>
              </div>
              <textarea required rows={5} placeholder="Describe your issue…" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              <button disabled={submitting} className="btn-primary-solid w-full disabled:opacity-50">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Create ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
};

export default Tickets;
