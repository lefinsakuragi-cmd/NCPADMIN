import { getPencapaian as getPencapaianModels } from "@/models/pencapaianmodels";

export async function getPencapaian(request) {
    try {
        const data = await getPencapaianModels(request);
        return Response.json(
            { status: 200, message: "data berhasil diterima", data }
        );
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}