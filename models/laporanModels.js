import { getSupabase } from "@/config/supabaseConnection";

export async function getAllBrands(request) {
    const supabase = await getSupabase(request);
    let query = supabase.from("laporan").select("*");

    if (request?.url) {
        try {
            const { searchParams } = new URL(request.url);
            const brand = searchParams.get("brand");
            if (brand && brand !== "ALL") {
                query = query.ilike("brand", `%${brand}%`);
            }
        } catch (err) {
            console.error("Gagal membaca searchParams brand:", err);
        }
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}