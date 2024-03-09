create policy "Enable routine table access for authenticated users"
on "public"."routines"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



