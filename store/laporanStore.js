import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLaporanStore = create(
    persist((set) => ({
        laporan: [],
        setLaporan: (laporan) => set({ laporan }),
    })),
    {
        name: "laporan",
        storage: localStorage,
    }
)

export default useLaporanStore