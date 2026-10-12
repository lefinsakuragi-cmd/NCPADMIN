"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/userStore";

export default function AuthProvider({ children }) {
    useEffect(() => {
        useAuthStore.persist.rehydrate();
    }, []);

    return children;
}
