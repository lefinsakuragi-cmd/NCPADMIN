"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/store/userStore";
import { useTaskStore } from "@/store/taskStore";
import "@/app/styles/TaskManager.css";

function TaskManager() {
    const user = useAuthStore((state) => state.user);
    const setTaskStore = useTaskStore((state) => state.setTask);
    const storeTasks = useTaskStore((state) => state.task);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (Array.isArray(storeTasks)) {
            setTasks(storeTasks);
        }
    }, [storeTasks]);

    const handleCompleteTask = async (taskId) => {
        if (!taskId || deletingId) return;
        setDeletingId(taskId);
        try {
            const res = await fetch(`/api/task?id=${encodeURIComponent(taskId)}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: taskId }),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message || "Gagal menandai tugas selesai");
            }

            setTasks((prev) => {
                const updated = prev.filter((t) => t.id !== taskId);
                if (typeof setTaskStore === "function") {
                    setTaskStore(updated);
                }
                return updated;
            });
        } catch (err) {
            console.error("Error completing task:", err);
            alert(err.message || "Terjadi kesalahan saat menyelesaikan task");
        } finally {
            setDeletingId(null);
        }
    };

    const loadTasks = useCallback(async (isRefresh = false) => {
        if (!user) return;
        if (isRefresh) {
            setLoading(true);
            setError(null);
        }
        try {
            const query = user?.id ? `?userId=${encodeURIComponent(user.id)}` : "";
            const res = await fetch(`/api/task${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Gagal mengambil daftar task");
            }

            const data = Array.isArray(result.data) ? result.data : [];
            setTasks(data);
            setError(null);
            if (typeof setTaskStore === "function") {
                setTaskStore(data);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err.message || "Terjadi kesalahan saat memuat task");
        } finally {
            setLoading(false);
        }
    }, [user, setTaskStore]);

    useEffect(() => {
        if (!user) return;
        let ignore = false;

        async function initFetch() {
            try {
                const query = user?.id ? `?userId=${encodeURIComponent(user.id)}` : "";
                const res = await fetch(`/api/task${query}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await res.json();

                if (!ignore) {
                    if (!res.ok) {
                        throw new Error(result.message || "Gagal mengambil daftar task");
                    }
                    const data = Array.isArray(result.data) ? result.data : [];
                    setTasks(data);
                    setError(null);
                    if (typeof setTaskStore === "function") {
                        setTaskStore(data);
                    }
                }
            } catch (err) {
                if (!ignore) {
                    console.error("Error fetching tasks:", err);
                    setError(err.message || "Terjadi kesalahan saat memuat task");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        initFetch();

        return () => {
            ignore = true;
        };
    }, [user, setTaskStore]);

    if (!user) {
        return (
            <section className="taskManager">
                <div className="taskWrapper">
                    <div className="taskHeadline">
                        <div>
                            <h1>NewCentral Admin</h1>
                            <p>Kamu Belum login</p>
                        </div>
                    </div>
                    <div className="taskGuestCard">
                        <div className="taskGuestIcon">
                            {/* Lock icon */}
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h2>Belum Login</h2>
                        <p>Login terlebih dahulu untuk melihat dan mengelola task kamu.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="taskManager">
            <div className="taskWrapper">
                <div className="taskManagerHead">
                    <div className="taskHeadLeft">
                        <h1>TASK MANAGER</h1>
                        <span className="taskCountBadge">{tasks.length} Task</span>
                    </div>
                    <button
                        className="taskRefreshBtn"
                        onClick={() => loadTasks(true)}
                        disabled={loading}
                        aria-label="Refresh daftar task"
                        title="Refresh daftar task"
                    >
                        <svg
                            className={loading ? "spin" : ""}
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <polyline points="1 20 1 14 7 14"></polyline>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                    </button>
                </div>

                <div className="taskListContainer">
                    {loading && (
                        <div className="taskSkeletonList">
                            <div className="taskSkeletonItem"></div>
                            <div className="taskSkeletonItem"></div>
                            <div className="taskSkeletonItem"></div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="taskErrorCard">
                            <div className="taskErrorIcon">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <p className="taskErrorMessage">{error}</p>
                            <button className="taskRetryBtn" onClick={() => loadTasks(true)}>
                                Coba Lagi
                            </button>
                        </div>
                    )}

                    {!loading && !error && tasks.length === 0 && (
                        <div className="taskEmptyState">
                            <div className="taskEmptyIcon">
                                <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" fill="none" strokeWidth="1.5">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>
                            <h3>Nyantai ee tidak ada tugas?!</h3>
                            <p>{user.username} belum ada tugas</p>
                        </div>
                    )}

                    {!loading && !error && tasks.length > 0 && (
                        <div className="taskList">
                            {tasks.map((item) => {
                                const statusClass = (item.status || "pending").toLowerCase().replace(/\s+/g, "_");
                                const isItemDeleting = deletingId === item.id;
                                return (
                                    <article key={item.id} className={`taskItem status-${statusClass}`}>
                                        <div className="taskItem-header">
                                            <h3 className="taskItem-title">{item.title}</h3>
                                            <span className={`taskStatusBadge badge-${statusClass}`}>
                                                {item.status || "PENDING"}
                                            </span>
                                        </div>

                                        {item.description && (
                                            <p className="taskItem-desc">{item.description}</p>
                                        )}

                                        <div className="taskItem-footer">
                                            <div className="taskItem-meta-group">
                                                {item.due_date ? (
                                                    <span className="taskItem-meta taskItem-due">
                                                        📅 {new Date(item.due_date).toLocaleDateString("id-ID")}
                                                    </span>
                                                ) : (
                                                    <span className="taskItem-meta">#task-{item.id}</span>
                                                )}
                                                {item.created_at && (
                                                    <span className="taskItem-meta">
                                                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            month: "short"
                                                        })}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                className="taskCompleteBtn"
                                                onClick={() => handleCompleteTask(item.id)}
                                                disabled={isItemDeleting}
                                                title="Tandai tugas telah selesai"
                                                aria-label="Tandai tugas telah selesai"
                                            >
                                                {isItemDeleting ? (
                                                    <span className="taskCompleteSpinner" />
                                                ) : (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width="14"
                                                        height="14"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                                <span>Selesai</span>
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TaskManager;