import { create } from "zustand";

export const useListingStore = create((set) => ({
    item: [],
    data: {
        pihak2: {
            nama: "",
            jabatan: "",
            perusahaan: "",
            telp: "",
        },
        deadline: "",
        type: "tax",
    },
    addItem: (item) => set((state) => ({ item: [...state.item, item] })),
    deleteItem: (index) => set((state) => ({ item: state.item.filter((_, idx) => idx !== index) })),
    setData: (data) => set((state) => ({ data: data })),
}));
