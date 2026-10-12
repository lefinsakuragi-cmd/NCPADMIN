"use client";

import { useState } from "react";
import "@/app/styles/TaskManager.css";
import axios from "axios";
import { useAuthStore } from "@/store/userStore";
import { useTaskStore } from "@/store/taskStore";

function TaskOperator() {
    const user = useAuthStore((state) => state.user);
    const addTask = useTaskStore((state) => state.addTask);

    const [task, setTask] = useState({
        title: "",
        due_date: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTambahTugas = async (e) => {
        e.preventDefault();
        if (!task.title.trim()) return;

        setLoading(true);

        try {
            const payload = {
                title: task.title.trim(),
                due_date: task.due_date || null,
                user_id: user?.id || null,
            };

            const response = await axios.post(
                "/api/task",
                payload
            );

            if (response.data?.data && typeof addTask === "function") {
                addTask(response.data.data);
            }

            // Kosongkan form setelah berhasil
            setTask({
                title: "",
                due_date: "",
            });
        } catch (error) {
            console.error("Error menambahkan tugas:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="taskOperator">
            <div className="taskOperatorHead">
                <span className="taskOperatorBadge">
                    Jangan Lupa Eee..
                </span>

                <h1>Tambah Pekerjaan</h1>

                <p>
                    Tambah Tugas? Hamma banyak skali Kerjamu wkwkwk
                </p>
            </div>

            <form
                className="taskOperatorForm"
                onSubmit={handleTambahTugas}
            >
                <h2>Tambah Tugas</h2>

                <div className="taskOperatorGroup">
                    <label htmlFor="title">
                        Nama Tugas
                    </label>

                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Masukkan tugas baru"
                        required
                    />
                </div>

                <div className="taskOperatorRow">
                    <div className="taskOperatorGroup">
                        <label htmlFor="due_date">
                            Deadline
                        </label>

                        <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            value={task.due_date}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="taskOperatorSubmitBtn"
                    disabled={loading}
                >
                    {loading
                        ? "Menyimpan..."
                        : "Tambah Tugas"}
                </button>
            </form>
        </section>
    );
}

export default TaskOperator;
