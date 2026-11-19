import {
  getNoted,
  createNoted,
  updateNoted,
  deleteNoted,
} from "@/controllers/notedControllers";

export async function GET(req) {
  return await getNoted(req);
}

export async function POST(req) {
  return await createNoted(req);
}

export async function PUT(req) {
  return await updateNoted(req);
}

export async function PATCH(req) {
  return await updateNoted(req);
}

export async function DELETE(req) {
  return await deleteNoted(req);
}
