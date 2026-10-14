import { getPencapaian } from "@/controllers/pencapaianControllers";

export async function GET(request) {
    return await getPencapaian(request);
}