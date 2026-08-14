import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import Logo from "@/components/site/Logo";

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Authorize access | WularData";
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error: err } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (err) {
        setError(err.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error: err } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "this application";

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        {error ? (
          <>
            <h1 className="text-xl font-extrabold mb-2">Authorization failed</h1>
            <p className="text-sm text-muted-foreground">
              Could not complete this authorization request: {error}
            </p>
          </>
        ) : !details ? (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading authorization request…
          </div>
        ) : (
          <>
            <h1 className="text-xl font-extrabold mb-2">
              Connect {clientName} to your WularData account
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              {clientName} will be able to read and manage your quotes, support tickets and profile as you.
              You can revoke this access at any time.
            </p>
            <div className="flex gap-3">
              <button
                disabled={busy}
                onClick={() => decide(true)}
                className="btn-primary-solid flex-1 disabled:opacity-50"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />} Approve
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 rounded-md border bg-white px-4 py-2.5 text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
              >
                Deny
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OAuthConsent;
