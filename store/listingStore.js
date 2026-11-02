import { create } from "zustand";

export const useListingStore = create((set) => ({
    item: [],
    data: {
        nomorSurat: "",
        pihak2: {
            nama: "",
            jabatan: "",
            perusahaan: "",
            telp: "",
        },
        deadline: new Date().toISOString().split('T')[0],
        type: "tax",
        tarifPerSku: 150000,
    },
    addItem: (item) => set((state) => ({ item: [...state.item, item] })),
    deleteItem: (index) => set((state) => ({ item: state.item.filter((_, idx) => idx !== index) })),
    setData: (newData) => set((state) => ({
        data: {
            ...state.data,
            ...newData,
            pihak2: {
                ...state.data.pihak2,
                ...(newData.pihak2 || {}),
            },
        },
    })),
}));
