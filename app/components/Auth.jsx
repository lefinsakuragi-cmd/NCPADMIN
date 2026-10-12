"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/userStore";
import "@/app/styles/Auth.css";

function Auth(props) {
    const onClose = typeof props === "object" ? props?.onClose : null;
    const login = useAuthStore((state) => state.login);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login gagal");
                return;
            }

            if (data.user) {
                login(data.user);
            }

            if (onClose) {
                onClose();
            }
        } catch (err) {
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth" onClick={onClose}>
            <div className="authWrapper" onClick={(e) => e.stopPropagation()}>
                {onClose && (
                    <button type="button" className="authClose" onClick={onClose} aria-label="Tutup">
                        &times;
                    </button>
                )}
                <div className="authHeader">
                    <h1>Masuk ke Akunmu</h1>
                    <p>Masukkan username dan password kamu untuk login.</p>
                </div>
                <div className="authForm">
                    <form onSubmit={handleLoginSubmit}>
                        {error && <div className="authError">{error}</div>}
                        <div className="formGroup">
                            <label htmlFor="login-username">Username</label>
                            <input
                                type="text"
                                id="login-username"
                                placeholder="Masukkan username kamu"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="login-password">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                placeholder="Masukkan password kamu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Memproses..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Auth;