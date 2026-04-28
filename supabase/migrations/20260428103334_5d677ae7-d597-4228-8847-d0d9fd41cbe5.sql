
-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
-- has_role is intentionally callable by authenticated users for RLS predicates
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;

-- Set search_path on set_updated_at (was missing)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Replace permissive quote insert policy
DROP POLICY IF EXISTS "Anyone can submit quote" ON public.quote_requests;

CREATE POLICY "Anon submits quote without user_id" ON public.quote_requests
  FOR INSERT TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Auth submits quote as self or anon" ON public.quote_requests
  FOR INSERT TO authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());
