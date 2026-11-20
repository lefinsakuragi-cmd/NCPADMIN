import { getSupabase } from "@/config/supabaseConnection";

export async function getNoted(request) {
    const supabase = await getSupabase(request);
    const { data: noted, error } = await supabase
        .from('noted')
        .select('*, users(username)')
        .order('id', { ascending: false });
    if (error) throw new Error(error.message);
    return noted;
}

export async function getNotedById(request, id) {
    const supabase = await getSupabase(request);
    const { data: noted, error } = await supabase
        .from('noted')
        .select('*, users(username)')
        .eq('id', id);
    if (error) throw new Error(error.message);
    return noted;
}

export async function createNoted(request, noted) {
    const supabase = await getSupabase(request);
    const { data, error } = await supabase
        .from('noted')
        .insert([noted])
        .select('*, users(username)')
        .single();
    if (error) throw new Error(error.message);
    return data;
}

export async function updateNoted(request, noted) {
    const supabase = await getSupabase(request);
    const { id, ...updateData } = noted;
    const { data, error } = await supabase
        .from('noted')
        .update(updateData)
        .eq('id', id)
        .select('*, users(username)')
        .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
}

export async function deleteNoted(request, id) {
    const supabase = await getSupabase(request);
    const { data, error } = await supabase
        .from('noted')
        .delete()
        .eq('id', id)
        .select()
        .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
}