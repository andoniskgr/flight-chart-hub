-- Allow planners to insert and update aircraft (for easier testing/development)
-- This is optional - remove if you want to restrict to admin/controller only

DROP POLICY IF EXISTS "Admins and controllers can insert aircraft" ON public.aircraft;
CREATE POLICY "Admins, controllers, and planners can insert aircraft"
  ON public.aircraft
  FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'controller') OR
    public.has_role(auth.uid(), 'planner')
  );

DROP POLICY IF EXISTS "Admins and controllers can update aircraft" ON public.aircraft;
CREATE POLICY "Admins, controllers, and planners can update aircraft"
  ON public.aircraft
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'controller') OR
    public.has_role(auth.uid(), 'planner')
  );

