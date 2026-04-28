import PortalLayout from "@/components/portal/PortalLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ full_name: "", company: "", phone: "", country: "India" });
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Profile | WularData";
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email || "");
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) setForm({ full_name: data.full_name || "", company: data.company || "", phone: data.phone || "", country: data.country || "India" });
      setLoading(false);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("profiles").upsert({ id: user.id, ...form });
    setSaving(false);
    if (error) toast.error("Could not save"); else toast.success("Profile updated");
  };

  return (
    <PortalLayout>
      <h1 className="text-2xl font-extrabold mb-1">Profile</h1>
      <p className="text-muted-foreground text-sm mb-6">Keep your details current so we can serve you better.</p>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
        <form onSubmit={save} className="max-w-xl space-y-4 rounded-lg bg-white p-6 shadow-card">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <input value={email} disabled className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm bg-secondary" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full name</label>
            <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</label>
            <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Country</label>
              <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
            </div>
          </div>
          <button disabled={saving} className="btn-primary-solid disabled:opacity-50">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save changes
          </button>
        </form>
      )}
    </PortalLayout>
  );
};

export default Profile;
