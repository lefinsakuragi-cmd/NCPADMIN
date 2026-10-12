import { createSupabaseContext } from "@supabase/server";

export async function getSupabase(request) {
  const { data: ctx, error } = await createSupabaseContext(
    request,
    { auth: "none" }
  );

  if (error) {
    throw new Error(error.message);
  }

  return ctx.supabase;
}
