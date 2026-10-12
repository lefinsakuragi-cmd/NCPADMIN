import { getSupabase } from "../config/supabaseConnection";

export async function getAllTasks(request, filters = {}) {
  const supabase = await getSupabase(request);
  let query = supabase.from("tasks").select("*");

  if (filters.userId) {
    query = query.eq("user_id", filters.userId);
  }
  if (filters.id) {
    query = query.eq("id", filters.id);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTaskById(request, id) {
  const supabase = await getSupabase(request);

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createTask(request, taskData) {
  const supabase = await getSupabase(request);

  const { data, error } = await supabase
    .from("tasks")
    .insert(taskData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTask(request, id, taskData) {
  const supabase = await getSupabase(request);

  const { data, error } = await supabase
    .from("tasks")
    .update(taskData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTask(request, id) {
  const supabase = await getSupabase(request);

  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
