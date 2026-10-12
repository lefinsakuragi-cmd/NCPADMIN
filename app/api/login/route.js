
import { checkPassword } from "../../../controllers/loginControllers";

export async function POST(req) {
    try {
        return await checkPassword(req);
    } catch (error) {
        console.error(error);
        return Response.json(
            { message: "Gagal memproses login" },
            { status: 500 }
        );
    }
}
