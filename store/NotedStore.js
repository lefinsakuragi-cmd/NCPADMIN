import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotedStore = create(
    persist(
        (set, get) => ({
            noted: [],
            searchQuery: "",
            filterType: "",
            editTarget: null,

            setNoted: (data) =>
                set({ noted: Array.isArray(data) ? data : [] }),

            addNoted: (item) =>
                set((state) => ({
                    noted: [item, ...state.noted],
                })),

            updateNoted: (updated) =>
                set((state) => ({
                    noted: state.noted.map((n) =>
                        n.id === updated.id ? { ...n, ...updated } : n
                    ),
                })),

            setSearchQuery: (q) => set({ searchQuery: q }),

            setFilterType: (t) => set({ filterType: t }),

            setEditTarget: (item) => set({ editTarget: item }),

            clearEditTarget: () => set({ editTarget: null }),

            getFiltered: () => {
                const { noted, searchQuery, filterType } = get();
                let result = noted;

                if (filterType) {
                    result = result.filter(
                        (n) =>
                            n.type &&
                            n.type.toLowerCase() === filterType.toLowerCase()
                    );
                }

                if (searchQuery && searchQuery.trim()) {
                    const q = searchQuery.toLowerCase().trim();
                    result = result.filter(
                        (n) =>
                            (n.title && n.title.toLowerCase().includes(q)) ||
                            (n.description && n.description.toLowerCase().includes(q)) ||
                            (n.type && n.type.toLowerCase().includes(q)) ||
                            (n.syarat && n.syarat.toLowerCase().includes(q)) ||
                            (n.reward && n.reward.toLowerCase().includes(q))
                    );
                }

                return result;
            },
        }),
        {
            name: "noted-storage",
            skipHydration: true,
        }
    )
);

