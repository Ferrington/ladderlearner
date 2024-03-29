create table "public"."routines" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid default auth.uid(),
    "name" text not null,
    "state_str" text not null,
    "created_at" timestamp without time zone not null
);


alter table "public"."routines" enable row level security;

CREATE UNIQUE INDEX routines_pkey ON public.routines USING btree (id);

alter table "public"."routines" add constraint "routines_pkey" PRIMARY KEY using index "routines_pkey";

alter table "public"."routines" add constraint "public_routines_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routines" validate constraint "public_routines_user_id_fkey";

grant delete on table "public"."routines" to "anon";

grant insert on table "public"."routines" to "anon";

grant references on table "public"."routines" to "anon";

grant select on table "public"."routines" to "anon";

grant trigger on table "public"."routines" to "anon";

grant truncate on table "public"."routines" to "anon";

grant update on table "public"."routines" to "anon";

grant delete on table "public"."routines" to "authenticated";

grant insert on table "public"."routines" to "authenticated";

grant references on table "public"."routines" to "authenticated";

grant select on table "public"."routines" to "authenticated";

grant trigger on table "public"."routines" to "authenticated";

grant truncate on table "public"."routines" to "authenticated";

grant update on table "public"."routines" to "authenticated";

grant delete on table "public"."routines" to "service_role";

grant insert on table "public"."routines" to "service_role";

grant references on table "public"."routines" to "service_role";

grant select on table "public"."routines" to "service_role";

grant trigger on table "public"."routines" to "service_role";

grant truncate on table "public"."routines" to "service_role";

grant update on table "public"."routines" to "service_role";


