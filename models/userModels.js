
import { getSupabase } from "../config/supabaseConnection";


export async function findUserByName(request, username) {
  const supabase = await getSupabase(request);

  const { data, error } = await supabase
    .from("users")
    .select("id, username, password, role")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
