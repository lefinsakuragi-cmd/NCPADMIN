import {
  getAllTasks,
  getTaskById,
  createTask as insertTask,
  updateTask as editTask,
  deleteTask as removeTask,
} from "../models/taskModels";

export async function getTasks(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId") || searchParams.get("user_id");

    if (id) {
      const task = await getTaskById(request, id);
      if (!task) {
        return Response.json(
          { message: "Task tidak ditemukan" },
          { status: 404 }
        );
      }
      return Response.json(
        { message: "Berhasil mengambil data task", data: task },
        { status: 200 }
      );
    }

    const filters = {};
    if (userId) filters.userId = userId;

    const tasks = await getAllTasks(request, filters);
    return Response.json(
      { message: "Berhasil mengambil daftar task", data: tasks },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getTasks:", error);
    return Response.json(
      { message: "Gagal mengambil data task", error: error.message },
      { status: 500 }
    );
  }
}

export async function createTask(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Body request harus berupa JSON yang valid" },
      { status: 400 }
    );
  }

  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      { message: "Data task tidak boleh kosong" },
      { status: 400 }
    );
  }

  const title = (body.title || body.nama_tugas || "").trim();
  if (!title) {
    return Response.json(
      { message: "Nama tugas atau title wajib diisi" },
      { status: 400 }
    );
  }

  const payload = {
    title,
    due_date: body.due_date || body.deadline || null,
  };

  const userId = body.user_id || body.userId;
  if (userId) {
    payload.user_id = userId;
  }

  try {
    const newTask = await insertTask(request, payload);
    return Response.json(
      { message: "Task berhasil ditambahkan", data: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in createTask:", error);
    return Response.json(
      { message: "Gagal menambahkan task", error: error.message },
      { status: 500 }
    );
  }
}

export async function updateTask(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Body request harus berupa JSON yang valid" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = body.id || searchParams.get("id");

  if (!id) {
    return Response.json(
      { message: "ID task harus disertakan" },
      { status: 400 }
    );
  }

  const { id: _, ...payload } = body;
  const updateData = {};
  if (payload.title !== undefined) updateData.title = payload.title;
  if (payload.nama_tugas !== undefined) updateData.title = payload.nama_tugas;
  if (payload.due_date !== undefined) updateData.due_date = payload.due_date || null;
  if (payload.deadline !== undefined) updateData.due_date = payload.deadline || null;
  if (payload.user_id !== undefined) updateData.user_id = payload.user_id;
  if (payload.userId !== undefined) updateData.user_id = payload.userId;

  if (Object.keys(updateData).length === 0) {
    return Response.json(
      { message: "Data pembaruan tidak boleh kosong" },
      { status: 400 }
    );
  }

  try {
    const updatedTask = await editTask(request, id, updateData);
    if (!updatedTask) {
      return Response.json(
        { message: "Task tidak ditemukan untuk diperbarui" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Task berhasil diperbarui", data: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updateTask:", error);
    return Response.json(
      { message: "Gagal memperbarui task", error: error.message },
      { status: 500 }
    );
  }
}

export async function deleteTask(request) {
  let body = {};
  try {
    body = (await request?.json?.()) || {};
  } catch {
    body = {};
  }

  const { searchParams } = new URL(request.url);
  const id = body.id || searchParams.get("id");

  if (!id) {
    return Response.json(
      { message: "ID task harus disertakan" },
      { status: 400 }
    );
  }

  try {
    const deletedTask = await removeTask(request, id);
    if (!deletedTask) {
      return Response.json(
        { message: "Task tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Task berhasil dihapus", data: deletedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleteTask:", error);
    return Response.json(
      { message: "Gagal menghapus task", error: error.message },
      { status: 500 }
    );
  }
}
