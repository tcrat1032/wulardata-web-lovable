import PortalLayout from "@/components/portal/PortalLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  in_review: "bg-amber-100 text-amber-800",
  quoted: "bg-emerald-100 text-emerald-800",
  closed: "bg-gray-100 text-gray-700",
};

const Quotes = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My quotes | WularData";
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("quote_requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setItems(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">My quotes</h1>
          <p className="text-muted-foreground text-sm">Track your enquiries and proposals.</p>
        </div>
        <Link to="/contact" className="btn-primary-solid !py-2.5"><Plus className="h-4 w-4" /> New quote</Link>
      </div>
      <div className="rounded-lg bg-white shadow-card overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No quotes yet. Submit your first enquiry from the Contact page.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-3">Service</th><th className="text-left p-3">Category</th><th className="text-left p-3">Submitted</th><th className="text-left p-3">Status</th></tr>
            </thead>
            <tbody>
              {items.map(q => (
                <tr key={q.id} className="border-t">
                  <td className="p-3 font-medium">{q.service_name}</td>
                  <td className="p-3 text-muted-foreground">{q.service_category}</td>
                  <td className="p-3 text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColor[q.status] || 'bg-secondary'}`}>{q.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PortalLayout>
  );
};

export default Quotes;
