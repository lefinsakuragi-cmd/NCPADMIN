import {
  getNoted as getNotedModel,
  getNotedById as getNotedByIdModel,
  createNoted as createNotedModel,
  updateNoted as updateNotedModel,
  deleteNoted as deleteNotedModel,
} from "@/models/notedModels";

/**
 * GET Handler - Ambil semua catatan atau catatan berdasarkan ID (?id=...)
 */
export async function getNoted(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const noted = await getNotedByIdModel(request, id);

      if (!noted || (Array.isArray(noted) && noted.length === 0)) {
        return Response.json(
          { status: 404, message: "Catatan tidak ditemukan" },
          { status: 404 }
        );
      }

      return Response.json(
        {
          status: 200,
          message: "Berhasil mengambil data catatan",
          data: Array.isArray(noted) ? noted[0] : noted,
        },
        { status: 200 }
      );
    }

    const data = await getNotedModel(request);
    return Response.json(
      {
        status: 200,
        message: "Berhasil mengambil daftar catatan",
        data: data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getNoted:", error);
    return Response.json(
      {
        status: 500,
        message: error.message || "Gagal mengambil data catatan",
      },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - Menambahkan catatan baru
 */
export async function createNoted(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        status: 400,
        message: "Body request harus berupa JSON yang valid",
      },
      { status: 400 }
    );
  }

  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      {
        status: 400,
        message: "Data catatan tidak boleh kosong",
      },
      { status: 400 }
    );
  }

  try {
    const result = await createNotedModel(request, body);
    return Response.json(
      {
        status: 201,
        message: "Catatan berhasil ditambahkan",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in createNoted:", error);
    return Response.json(
      {
        status: 500,
        message: error.message || "Gagal menambahkan catatan",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT / PATCH Handler - Memperbarui catatan
 */
export async function updateNoted(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        status: 400,
        message: "Body request harus berupa JSON yang valid",
      },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = body.id || searchParams.get("id");

  if (!id) {
    return Response.json(
      {
        status: 400,
        message: "ID catatan harus disertakan",
      },
      { status: 400 }
    );
  }

  const { id: _, ...payload } = body;

  if (Object.keys(payload).length === 0) {
    return Response.json(
      {
        status: 400,
        message: "Data pembaruan tidak boleh kosong",
      },
      { status: 400 }
    );
  }

  try {
    const result = await updateNotedModel(request, { ...payload, id });

    return Response.json(
      {
        status: 200,
        message: "Catatan berhasil diperbarui",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updateNoted:", error);
    return Response.json(
      {
        status: 500,
        message: error.message || "Gagal memperbarui catatan",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE Handler - Menghapus catatan
 */
export async function deleteNoted(request) {
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
      {
        status: 400,
        message: "ID catatan harus disertakan",
      },
      { status: 400 }
    );
  }

  try {
    const result = await deleteNotedModel(request, id);
    return Response.json(
      {
        status: 200,
        message: "Catatan berhasil dihapus",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleteNoted:", error);
    return Response.json(
      {
        status: 500,
        message: error.message || "Gagal menghapus catatan",
      },
      { status: 500 }
    );
  }
}
