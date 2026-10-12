import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
    persist(
        (set) => ({
            task: [],

            setTask: (taskData) =>
                set({
                    task: Array.isArray(taskData) ? taskData : [],
                }),

            addTask: (newTask) =>
                set((state) => ({
                    task: [newTask, ...state.task],
                })),
        }),
        {
            name: "task-storage",
            skipHydration: true,
        }
    )
);