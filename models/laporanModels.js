import { getSupabase } from "@/config/supabaseConnection";

export async function getAllBrands(request) {
    const supabase = await getSupabase(request);
    let query = supabase.from("laporan").select("*");


    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}