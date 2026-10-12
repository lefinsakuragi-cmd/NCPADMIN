import { findUserByName } from "../models/userModels";

export async function checkPassword(request) {
  let body = {};
  try {
    body = (await request?.json?.()) || {};
  } catch {
    return Response.json(
      { message: "Body request harus berupa JSON yang valid" },
      { status: 400 }
    );
  }

  const { username, password } = body;

  if (!username) {
    return Response.json(
      { message: "username harus di isikan" },
      { status: 400 }
    );
  }

  if (!password) {
    return Response.json(
      { message: "password harus di isikan" },
      { status: 400 }
    );
  }

  const user = await findUserByName(request, username);

  if (!user) {
    return Response.json(
      { message: "User tidak ditemukan" },
      { status: 404 }
    );
  }

  if (user.password !== password) {
    return Response.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  return Response.json(
    {
      message: "Password cocok, login berhasil",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        isLogin: true
      },
    },
    { status: 200 }
  );
}

export async function getUsers(request) {
  return await checkPassword(request);
}

export default checkPassword;
