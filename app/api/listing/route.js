import { getAllData } from "@/controllers/listingControllers";

export async function GET(request) {
    try {
        const data = await getAllData(request);
        return data;
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}

export async function POST(request) {
    try {
        const data = await getAllData(request);
        return data;
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}