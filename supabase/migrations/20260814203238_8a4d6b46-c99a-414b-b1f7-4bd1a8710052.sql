-- Make the role helper SECURITY INVOKER so it can no longer bypass row-level security.
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;

CREATE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- user_roles: readable only by the owning user (keeps the helper non-recursive)
DROP POLICY IF EXISTS "Users view own roles" ON public.user_roles;
CREATE POLICY "Users view own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Recreate policies dropped by CASCADE
CREATE POLICY "Admins insert roles" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update roles" ON public.user_roles
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete roles" ON public.user_roles
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "No self role grants" ON public.user_roles
AS RESTRICTIVE FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "No self role updates" ON public.user_roles
AS RESTRICTIVE FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "No self role deletes" ON public.user_roles
AS RESTRICTIVE FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- profiles
CREATE POLICY "Profiles select own or admin" ON public.profiles
FOR SELECT TO authenticated
USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'::app_role));

-- quote_requests
CREATE POLICY "Customers view own quotes" ON public.quote_requests
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update quotes" ON public.quote_requests
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- support_tickets
CREATE POLICY "Customers view own tickets" ON public.support_tickets
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Owner or admin updates tickets" ON public.support_tickets
FOR UPDATE TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

-- ticket_messages
CREATE POLICY "Messages visible to ticket owner or admin" ON public.ticket_messages
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.support_tickets t
    WHERE t.id = ticket_messages.ticket_id
      AND (t.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role))
  )
);

CREATE POLICY "Ticket owner or admin can post messages" ON public.ticket_messages
FOR INSERT TO authenticated
WITH CHECK (
  sender_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.support_tickets t
    WHERE t.id = ticket_messages.ticket_id
      AND (t.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role))
  )
);