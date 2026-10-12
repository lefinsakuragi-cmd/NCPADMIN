import { getAllBrands } from "@/controllers/laporanControllers";

export async function GET(request) {
    try {
        const data = await getAllBrands(request);
        return data;
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}