"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function TaskProvider({ children }) {
    useEffect(() => {
        useTaskStore.persist.rehydrate();
    }, []);

    return children;
}
