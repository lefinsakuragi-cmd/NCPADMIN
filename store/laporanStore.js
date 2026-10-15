import { create } from "zustand";

export const useLaporanStore = create((set) => ({
    laporan: [],
    selectedBrand: "",
    activeBrand: "",
    isLoading: false,
    hasFetched: false,
    error: null,
    sortBy: "default",      // "default" | "date" | "status"
    sortOrder: "desc",      // "asc" | "desc"
    filterDateFrom: "",     // ISO date string "YYYY-MM-DD"
    filterDateTo: "",       // ISO date string "YYYY-MM-DD"
    filterStatus: "",       // "" = semua, atau nilai status tertentu

    setLaporan: (laporan) =>
        set({ laporan: Array.isArray(laporan) ? laporan : [] }),
    setSelectedBrand: (selectedBrand) => set({ selectedBrand }),
    setActiveBrand: (activeBrand) => set({ activeBrand }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setHasFetched: (hasFetched) => set({ hasFetched }),
    setError: (error) => set({ error }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    setFilterDateFrom: (filterDateFrom) => set({ filterDateFrom }),
    setFilterDateTo: (filterDateTo) => set({ filterDateTo }),
    setFilterStatus: (filterStatus) => set({ filterStatus }),
    resetFilters: () =>
        set({ filterDateFrom: "", filterDateTo: "", filterStatus: "", sortBy: "default", sortOrder: "desc" }),
    resetLaporan: () =>
        set({ laporan: [], hasFetched: false, activeBrand: "", selectedBrand: "" }),
}));

export default useLaporanStore;