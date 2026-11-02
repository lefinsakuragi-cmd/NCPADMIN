import { getAllSurat, createData as createDataModel } from "@/models/listingModels";

export async function getAllData(request) {
    try {
        const data = await getAllSurat(request);
        return Response.json(
            { status: 200, message: "data berhasil diterima", data }
        );
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}

export async function createData(request) {
    try {
        const data = await createDataModel(request);
        return Response.json(
            { status: 200, message: "data berhasil diterima", data }
        );
    } catch (error) {
        return Response.json(
            { status: 500, message: error.message }
        );
    }
}