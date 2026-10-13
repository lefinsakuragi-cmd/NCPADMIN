import { create } from "zustand";

export const useLaporanStore = create((set) => ({
    laporan: [],
    selectedBrand: "",
    activeBrand: "",
    isLoading: false,
    hasFetched: false,
    error: null,

    setLaporan: (laporan) =>
        set({ laporan: Array.isArray(laporan) ? laporan : [] }),
    setSelectedBrand: (selectedBrand) => set({ selectedBrand }),
    setActiveBrand: (activeBrand) => set({ activeBrand }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setHasFetched: (hasFetched) => set({ hasFetched }),
    setError: (error) => set({ error }),
    resetLaporan: () =>
        set({ laporan: [], hasFetched: false, activeBrand: "", selectedBrand: "" }),
}));

export default useLaporanStore;