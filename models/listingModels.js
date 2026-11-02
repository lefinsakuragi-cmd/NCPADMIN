import { getSupabase } from "@/config/supabaseConnection";

export async function getAllSurat(request) {
    const supabase = await getSupabase(request);
    let query = supabase.from("listings").select('*');

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createData(request) {
    const supabase = await getSupabase(request);
    const { data, error } = await supabase.from("listings").insert(["*"]).select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}