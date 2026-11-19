"use client"

import { useEffect, useCallback } from "react"
import { useAuthStore } from "@/store/userStore"
import { useNotedStore } from "@/store/NotedStore"
import NotedEditFocus from "./NotedEditFocus"
import NotLogin from "../NotLogin"
import axios from "axios"
import "../styles/Noted.css"
import "../styles/HomeContent.css"

const TAG_COLOR_MAP = {
    gosip: "tag-orange",
    retur: "tag-pink",
    janji: "tag-purple",
    tradepromo: "tag-green",
}

function getTagColor(type) {
    if (!type) return ""
    return TAG_COLOR_MAP[type.toLowerCase()] || "tag-blue"
}

function NotedContent() {
    const user = useAuthStore((state) => state.user)
    const noted = useNotedStore((state) => state.noted)
    const setNoted = useNotedStore((state) => state.setNoted)
    const editTarget = useNotedStore((state) => state.editTarget)
    const setEditTarget = useNotedStore((state) => state.setEditTarget)
    const getFiltered = useNotedStore((state) => state.getFiltered)

    const searchQuery = useNotedStore((state) => state.searchQuery)
    const filterType = useNotedStore((state) => state.filterType)

    const fetchNoted = useCallback(async () => {
        try {
            const res = await axios.get("/api/noted")
            const data = res.data?.data
            if (Array.isArray(data)) {
                setNoted(data)
            }
        } catch (err) {
            console.error("Gagal mengambil data catatan:", err)
        }
    }, [setNoted])

    useEffect(() => {
        if (!user) return
        fetchNoted()
    }, [user, fetchNoted])

    if (!user) {
        return <NotLogin />
    }

    const filtered = getFiltered()

    return (
        <>
            <div className="notedWrapper">
                <div className="notedHeadline">
                    <h1>Noted & Memo</h1>
                    <p>Kelola catatan cepat, info gosip, retur, dan promo</p>
                    {(searchQuery || filterType) && (
                        <span className="notedResultCount">
                            {filtered.length} catatan ditemukan
                        </span>
                    )}
                </div>

                {filtered.length === 0 ? (
                    <div className="notedEmpty">
                        <span className="notedEmptyIcon">📝</span>
                        <p>
                            {searchQuery || filterType
                                ? "Tidak ada catatan yang cocok dengan filter."
                                : "Belum ada catatan. Buat catatan pertamamu dari sidebar!"}
                        </p>
                    </div>
                ) : (
                    <div className="notedGrid">
                        {filtered.map((item) => (
                            <div
                                key={item.id}
                                className="notedCard"
                                onClick={() => setEditTarget(item)}
                            >
                                <div className="notedCardHeader">
                                    <h3 className="notedCardTitle">{item.title}</h3>
                                    {item.type && (
                                        <span className={`notedCardBadge ${getTagColor(item.type)}`}>
                                            {item.type}
                                        </span>
                                    )}
                                </div>

                                {item.description && (
                                    <p className="notedCardDesc">{item.description}</p>
                                )}

                                <div className="notedCardMeta">
                                    {item.syarat && (
                                        <div className="notedCardMetaItem">
                                            <span className="notedMetaLabel">Syarat</span>
                                            <span className="notedMetaValue">{item.syarat}</span>
                                        </div>
                                    )}
                                    {item.reward && (
                                        <div className="notedCardMetaItem">
                                            <span className="notedMetaLabel">Reward</span>
                                            <span className="notedMetaValue">{item.reward}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="notedCardFooter">
                                    <button
                                        className="notedCardEditBtn"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setEditTarget(item)
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editTarget && (
                <NotedEditFocus
                    noted={editTarget}
                    onClose={() => setEditTarget(null)}
                    onSaved={fetchNoted}
                />
            )}
        </>
    )
}

export default NotedContent
