"use client"

import { useEffect, useMemo } from "react"
import { useAuthStore } from "@/store/userStore"
import { useNotedStore } from "@/store/NotedStore"
import NotedEditFocus from "./NotedEditFocus"
import NotLogin from "../NotLogin"
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

function formatDate(value) {
    if (!value) return ""
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

function NotedContent() {
    const user = useAuthStore((state) => state.user)
    const noted = useNotedStore((state) => state.noted)
    const fetchNoted = useNotedStore((state) => state.fetchNoted)
    const editTarget = useNotedStore((state) => state.editTarget)
    const setEditTarget = useNotedStore((state) => state.setEditTarget)
    const searchQuery = useNotedStore((state) => state.searchQuery)
    const filterType = useNotedStore((state) => state.filterType)

    useEffect(() => {
        if (!user) return
        fetchNoted()
    }, [user, fetchNoted])

    const filtered = useMemo(() => {
        let result = Array.isArray(noted) ? noted : []

        if (filterType) {
            result = result.filter(
                (n) => n.type && n.type.toLowerCase() === filterType.toLowerCase()
            )
        }

        if (searchQuery && searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim()
            result = result.filter(
                (n) =>
                    (n.title && n.title.toLowerCase().includes(q)) ||
                    (n.deskription && n.deskription.toLowerCase().includes(q)) ||
                    (n.type && n.type.toLowerCase().includes(q)) ||
                    (n.syarat && n.syarat.toLowerCase().includes(q)) ||
                    (n.reward && n.reward.toLowerCase().includes(q)) ||
                    (n.brand && n.brand.toLowerCase().includes(q)) ||
                    (n.company && n.company.toLowerCase().includes(q)) ||
                    (n.expired && String(n.expired).toLowerCase().includes(q))
            )
        }

        return result
    }, [noted, searchQuery, filterType])

    if (!user) {
        return <NotLogin />
    }

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

                                {item.deskription && (
                                    <p className="notedCardDesc">{item.deskription}</p>
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
                                    {item.brand && (
                                        <div className="notedCardMetaItem">
                                            <span className="notedMetaLabel">Brand</span>
                                            <span className="notedMetaValue">{item.brand}</span>
                                        </div>
                                    )}
                                    {item.company && (
                                        <div className="notedCardMetaItem">
                                            <span className="notedMetaLabel">Perusahaan</span>
                                            <span className="notedMetaValue">{item.company}</span>
                                        </div>
                                    )}
                                    {item.expired && (
                                        <div className="notedCardMetaItem">
                                            <span className="notedMetaLabel">Berlaku</span>
                                            <span className="notedMetaValue">{formatDate(item.expired)}</span>
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

            {editTarget && <NotedEditFocus />}
        </>
    )
}

export default NotedContent