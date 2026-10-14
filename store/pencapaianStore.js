import { create } from "zustand";


export const usePencapaianStore = create((set) => ({
    pencapaian: [],
    selectedBrand: "",
    activeBrand: "",
    isLoading: false,
    hasFetched: false,
    error: null,

    setPencapaian: (pencapaian) => set({ pencapaian: Array.isArray(pencapaian) ? pencapaian : [] }),
    setSelectedBrand: (selectedBrand) => set({ selectedBrand }),
    setActiveBrand: (activeBrand) => set({ activeBrand }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setHasFetched: (hasFetched) => set({ hasFetched }),
    setError: (error) => set({ error }),
    resetPencapaian: () => set({ pencapaian: [], hasFetched: false, activeBrand: "", selectedBrand: "" }),
}));