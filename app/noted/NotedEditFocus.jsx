"use client"

import { useState } from "react"
import { useNotedStore } from "@/store/NotedStore"
import axios from "axios"
import "../styles/Noted.css"

function NotedEditFocus() {
    const editTarget = useNotedStore((state) => state.editTarget)
    const clearEditTarget = useNotedStore((state) => state.clearEditTarget)
    const updateNotedStore = useNotedStore((state) => state.updateNoted)
    const fetchNoted = useNotedStore((state) => state.fetchNoted)

    const [title, setTitle] = useState(editTarget?.title || "")
    const [deskription, setDeskription] = useState(editTarget?.deskription || "")
    const [type, setType] = useState(editTarget?.type || "")
    const [syarat, setSyarat] = useState(editTarget?.syarat || "")
    const [reward, setReward] = useState(editTarget?.reward || "")
    const [brand, setBrand] = useState(editTarget?.brand || "")
    const [company, setCompany] = useState(editTarget?.company || "")
    const [expired, setExpired] = useState(
        editTarget?.expired ? String(editTarget.expired).slice(0, 10) : ""
    )
    const [isSaving, setIsSaving] = useState(false)

    if (!editTarget) return null

    const handleTagClick = (tag) => {
        setType((prev) => (prev === tag ? "" : tag))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!title.trim()) return alert("Title wajib diisi")

        setIsSaving(true)
        try {
            const payload = {
                id: editTarget.id,
                title: title.trim(),
                deskription: deskription.trim(),
                type: type.trim() || null,
                syarat: syarat.trim() || null,
                reward: reward.trim() || null,
                brand: brand.trim() || null,
                company: company.trim() || null,
                expired: expired || null,
            }

            const res = await axios.put("/api/noted", payload)
            const updated = res.data?.data || payload

            updateNotedStore(updated)
            await fetchNoted()

            clearEditTarget()
        } catch (err) {
            console.error("Gagal memperbarui catatan:", err)
            alert(err.response?.data?.message || "Gagal memperbarui catatan")
        } finally {
            setIsSaving(false)
        }
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            clearEditTarget()
        }
    }

    return (
        <div className="notedEditOverlay" onClick={handleOverlayClick}>
            <div className="notedEditModal">
                <div className="notedEditHeader">
                    <h2>Edit Catatan</h2>
                    <button
                        className="notedEditClose"
                        onClick={clearEditTarget}
                        type="button"
                    >
                        ✕
                    </button>
                </div>

                <form className="notedForm" onSubmit={handleUpdate}>
                    <div className="notedFormGroup">
                        <label htmlFor="edit-title">Title</label>
                        <input
                            id="edit-title"
                            type="text"
                            placeholder="Isi Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-desc">Deskripsi</label>
                        <textarea
                            id="edit-desc"
                            placeholder="Isi Deskripsi"
                            value={deskription}
                            onChange={(e) => setDeskription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-type">Type</label>
                        <input
                            type="text"
                            id="edit-type"
                            placeholder="Type ?"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label>Kategori Cepat</label>
                        <div className="notedTagGroup">
                            <button type="button" className={`notedTagChip tag-orange ${type === "Gosip" ? "active" : ""}`} onClick={() => handleTagClick("Gosip")}>Gosip</button>
                            <button type="button" className={`notedTagChip tag-pink ${type === "Retur" ? "active" : ""}`} onClick={() => handleTagClick("Retur")}>Retur</button>
                            <button type="button" className={`notedTagChip tag-purple ${type === "Janji" ? "active" : ""}`} onClick={() => handleTagClick("Janji")}>Janji</button>
                            <button type="button" className={`notedTagChip tag-green ${type === "TradePromo" ? "active" : ""}`} onClick={() => handleTagClick("TradePromo")}>TradePromo</button>
                        </div>
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-syarat">Syarat</label>
                        <input
                            id="edit-syarat"
                            type="text"
                            placeholder="Syarat"
                            value={syarat}
                            onChange={(e) => setSyarat(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-reward">Reward</label>
                        <input
                            id="edit-reward"
                            type="text"
                            placeholder="Reward"
                            value={reward}
                            onChange={(e) => setReward(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-brand">Brand</label>
                        <input
                            id="edit-brand"
                            type="text"
                            placeholder="Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-company">Perusahaan</label>
                        <input
                            id="edit-company"
                            type="text"
                            placeholder="Perusahaan"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className="notedFormGroup">
                        <label htmlFor="edit-expired">Berlaku Sampai</label>
                        <input
                            id="edit-expired"
                            type="date"
                            value={expired}
                            onChange={(e) => setExpired(e.target.value)}
                        />
                    </div>

                    <div className="notedEditActions">
                        <button type="button" className="notedBtnCancel" onClick={clearEditTarget}>
                            Batal
                        </button>
                        <button type="submit" className="notedBtnSubmit" disabled={isSaving}>
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NotedEditFocus