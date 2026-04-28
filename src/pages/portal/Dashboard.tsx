import PortalLayout from "@/components/portal/PortalLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { FileText, LifeBuoy, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [counts, setCounts] = useState({ openQuotes: 0, openTickets: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Dashboard | WularData";
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [{ data: quotes }, { data: tickets }] = await Promise.all([
        supabase.from("quote_requests").select("id, service_name, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("support_tickets").select("id, subject, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);
      setCounts({
        openQuotes: (quotes || []).filter(q => q.status !== "closed").length,
        openTickets: (tickets || []).filter(t => t.status !== "closed" && t.status !== "resolved").length,
      });
      setRecent([
        ...(quotes || []).map(q => ({ type: "Quote", title: q.service_name, status: q.status, when: q.created_at, to: "/portal/quotes" })),
        ...(tickets || []).map(t => ({ type: "Ticket", title: t.subject, status: t.status, when: t.created_at, to: "/portal/tickets" })),
      ].sort((a, b) => +new Date(b.when) - +new Date(a.when)).slice(0, 6));
    };
    load();
  }, []);

  return (
    <PortalLayout>
      <h1 className="text-2xl font-extrabold mb-1">Welcome back</h1>
      <p className="text-muted-foreground mb-8">Here's a snapshot of your account.</p>
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <Link to="/portal/quotes" className="rounded-lg bg-white p-6 shadow-card hover:shadow-elevated transition-all flex items-center justify-between">
          <div>
            <FileText className="h-7 w-7 text-[hsl(var(--deep-blue))] mb-3" />
            <p className="text-3xl font-extrabold">{counts.openQuotes}</p>
            <p className="text-sm text-muted-foreground">Open quotes</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </Link>
        <Link to="/portal/tickets" className="rounded-lg bg-white p-6 shadow-card hover:shadow-elevated transition-all flex items-center justify-between">
          <div>
            <LifeBuoy className="h-7 w-7 text-[hsl(var(--cyan))] mb-3" />
            <p className="text-3xl font-extrabold">{counts.openTickets}</p>
            <p className="text-sm text-muted-foreground">Open tickets</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
      <div className="rounded-lg bg-white shadow-card">
        <div className="p-5 border-b"><h2 className="font-bold">Recent activity</h2></div>
        {recent.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">No recent activity yet.</p>
        ) : (
          <ul className="divide-y">
            {recent.map((r, i) => (
              <li key={i}><Link to={r.to} className="flex items-center justify-between p-4 hover:bg-secondary text-sm">
                <span className="flex items-center gap-3"><span className="text-xs uppercase tracking-wider text-muted-foreground">{r.type}</span> <span className="font-medium">{r.title}</span></span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{r.status}</span>
              </Link></li>
            ))}
          </ul>
        )}
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
