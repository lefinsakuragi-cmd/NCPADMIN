import { getAllBrands as getAllBrandsModels } from "@/models/laporanModels";

export async function getAllBrands(request) {
    try {
        const data = await getAllBrandsModels(request);
        return Response.json(
            { status: 200, message: "data berhasil diterima", data }
        );
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}