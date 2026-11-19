"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/userStore"
import { useNotedStore } from "@/store/NotedStore"
import axios from "axios"
import "../styles/Noted.css"

function NotedSidebar() {
    const user = useAuthStore((state) => state.user)

    const addNoted = useNotedStore((state) => state.addNoted)
    const searchQuery = useNotedStore((state) => state.searchQuery)
    const setSearchQuery = useNotedStore((state) => state.setSearchQuery)
    const filterType = useNotedStore((state) => state.filterType)
    const setFilterType = useNotedStore((state) => state.setFilterType)

    const [title, setTitle] = useState("")
    const [deskription, setDeskription] = useState("")
    const [type, setType] = useState("")
    const [syarat, setSyarat] = useState("")
    const [reward, setReward] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const handleTagClick = (tag) => {
        setType((prev) => (prev === tag ? "" : tag))
    }

    const handleFilterTag = (tag) => {
        setFilterType(filterType === tag ? "" : tag)
    }

    const resetForm = () => {
        setTitle("")
        setDeskription("")
        setType("")
        setSyarat("")
        setReward("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim()) return alert("Title wajib diisi")

        setIsSaving(true)
        try {
            const payload = {
                title: title.trim(),
                deskription: deskription.trim(),
                type: type.trim() || null,
                syarat: syarat.trim() || null,
                reward: reward.trim() || null,
            }

            const res = await axios.post("/api/noted", payload)
            const created = res.data?.data

            if (created) {
                addNoted(created)
            } else {
                addNoted({ ...payload, id: Date.now() })
            }

            resetForm()
        } catch (err) {
            console.error("Gagal menyimpan catatan:", err)
            alert(err.response?.data?.message || "Gagal menyimpan catatan")
        } finally {
            setIsSaving(false)
        }
    }

    if (!user) {
        return (
            <aside className="notedSidebar">
                <div className="notedSidebarWrapper">
                    <div className="notedSidebarHeader">
                        <h2>Noted</h2>
                        <p>Akses Terbatas</p>
                    </div>
                    <div className="notedSidebarLocked">
                        <span className="notedLockIcon">🔒</span>
                        <p>Silakan login terlebih dahulu untuk menambah atau mengelola catatan.</p>
                    </div>
                </div>
            </aside>
        )
    }

    return (
        <aside className="notedSidebar">
            <div className="notedSidebarWrapper">

                {/* ===== SEARCH & FILTER PANEL ===== */}
                <div className="notedSidebarHeader">
                    <h2>Cari Catatan</h2>
                    <p>Filter berdasarkan keyword atau kategori</p>
                </div>

                <div className="notedSearchPanel">
                    <div className="notedSearchBox">
                        <svg className="notedSearchIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari catatan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="notedSearchClear"
                                onClick={() => setSearchQuery("")}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="notedFilterGroup">
                        <span className="notedFilterLabel">Filter Kategori</span>
                        <div className="notedTagGroup">
                            <button
                                type="button"
                                className={`notedTagChip tag-orange ${filterType === "Gosip" ? "active" : ""}`}
                                onClick={() => handleFilterTag("Gosip")}
                            >
                                Gosip
                            </button>
                            <button
                                type="button"
                                className={`notedTagChip tag-pink ${filterType === "Retur" ? "active" : ""}`}
                                onClick={() => handleFilterTag("Retur")}
                            >
                                Retur
                            </button>
                            <button
                                type="button"
                                className={`notedTagChip tag-purple ${filterType === "Janji" ? "active" : ""}`}
                                onClick={() => handleFilterTag("Janji")}
                            >
                                Janji
                            </button>
                            <button
                                type="button"
                                className={`notedTagChip tag-green ${filterType === "TradePromo" ? "active" : ""}`}
                                onClick={() => handleFilterTag("TradePromo")}
                            >
                                TradePromo
                            </button>
                        </div>
                    </div>
                </div>

                <div className="notedSidebarDivider"></div>

                {/* ===== FORM CREATE ===== */}
                <div className="notedSidebarHeader">
                    <h2>Buat Catatan</h2>
                    <p>Catat memo, gosip, retur, atau promo</p>
                </div>

                <form className="notedForm" onSubmit={handleSubmit}>
                    <div className="notedFormGroup">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Isi Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="desc">Deskripsi</label>
                        <textarea
                            id="desc"
                            placeholder="Isi Deskripsi"
                            value={deskription}
                            onChange={(e) => setDeskription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            id="type"
                            placeholder="Type ?"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label>Kategori Cepat</label>
                        <div className="notedTagGroup">
                            <button
                                type="button"
                                className={`notedTagChip tag-orange ${type === "Gosip" ? "active" : ""}`}
                                onClick={() => handleTagClick("Gosip")}
                            >
                                Gosip
                            </button>
                            <button
                                type="button"
                                className={`notedTagChip tag-pink ${type === "Retur" ? "active" : ""}`}
                                onClick={() => handleTagClick("Retur")}
                            >
                                Retur
                            </button>
                            <button
                                type="button"
                                className={`notedTagChip tag-purple ${type === "Janji" ? "active" : ""}`}
                                onClick={() => handleTagClick("Janji")}
                            >
                                Janji
                            </button>
                            <button
                                type="button"
                                className={`notedTagChip tag-green ${type === "TradePromo" ? "active" : ""}`}
                                onClick={() => handleTagClick("TradePromo")}
                            >
                                TradePromo
                            </button>
                        </div>
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="syarat">Syarat</label>
                        <input
                            id="syarat"
                            type="text"
                            placeholder="Syarat"
                            value={syarat}
                            onChange={(e) => setSyarat(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="reward">Reward</label>
                        <input
                            id="reward"
                            type="text"
                            placeholder="Reward"
                            value={reward}
                            onChange={(e) => setReward(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="notedBtnSubmit" disabled={isSaving}>
                        {isSaving ? "Menyimpan..." : "Simpan"}
                    </button>
                </form>

            </div>
        </aside>
    )
}

export default NotedSidebar;
