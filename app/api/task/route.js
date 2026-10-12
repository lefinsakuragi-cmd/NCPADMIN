import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/controllers/taskControllers";

export async function GET(req) {
  return await getTasks(req);
}

export async function POST(req) {
  return await createTask(req);
}

export async function PUT(req) {
  return await updateTask(req);
}

export async function PATCH(req) {
  return await updateTask(req);
}

export async function DELETE(req) {
  return await deleteTask(req);
}
