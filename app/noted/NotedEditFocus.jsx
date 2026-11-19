"use client"

import { useState } from "react"
import { useNotedStore } from "@/store/NotedStore"
import axios from "axios"
import "../styles/Noted.css"

function NotedEditFocus({ noted, onClose, onSaved }) {
    const updateNotedStore = useNotedStore((state) => state.updateNoted)

    const [title, setTitle] = useState(noted?.title || "")
    const [description, setDescription] = useState(noted?.description || "")
    const [type, setType] = useState(noted?.type || "")
    const [syarat, setSyarat] = useState(noted?.syarat || "")
    const [reward, setReward] = useState(noted?.reward || "")
    const [isSaving, setIsSaving] = useState(false)

    const handleTagClick = (tag) => {
        setType((prev) => (prev === tag ? "" : tag))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!title.trim()) return alert("Title wajib diisi")

        setIsSaving(true)
        try {
            const payload = {
                id: noted.id,
                title: title.trim(),
                description: description.trim(),
                type: type.trim() || null,
                syarat: syarat.trim() || null,
                reward: reward.trim() || null,
            }

            await axios.put("/api/noted", payload)

            updateNotedStore(payload)

            if (onSaved) await onSaved()

            onClose()
        } catch (err) {
            console.error("Gagal memperbarui catatan:", err)
            alert(err.response?.data?.message || "Gagal memperbarui catatan")
        } finally {
            setIsSaving(false)
        }
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="notedEditOverlay" onClick={handleOverlayClick}>
            <div className="notedEditModal">
                <div className="notedEditHeader">
                    <h2>Edit Catatan</h2>
                    <button
                        className="notedEditClose"
                        onClick={onClose}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

                    <div className="notedEditActions">
                        <button type="button" className="notedBtnCancel" onClick={onClose}>
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
