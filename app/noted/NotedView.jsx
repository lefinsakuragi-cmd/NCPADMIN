"use client";

import { useEffect } from "react";

const TAG_COLOR_MAP = {
  gosip: "tag-orange",
  retur: "tag-pink",
  janji: "tag-purple",
  tradepromo: "tag-green",
};

function getTagColor(type) {
  if (!type) return "";
  return TAG_COLOR_MAP[type.toLowerCase()] || "tag-blue";
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function NotedView({ item, isOwner = false, authorLabel = "", onClose, onEdit }) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="notedEditOverlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Detail Memo"}
    >
      <div className="notedEditModal" onClick={(e) => e.stopPropagation()}>
        <div className="notedEditHeader">
          <h2>{item.title}</h2>
          <button
            type="button"
            className="notedEditClose"
            onClick={onClose}
            aria-label="Tutup detail memo"
          >
            ✕
          </button>
        </div>

        <div className="notedCardHeader">
          {item.type && (
            <span className={`notedCardBadge ${getTagColor(item.type)}`}>
              {item.type}
            </span>
          )}
          {authorLabel && (
            <span className="notedMetaValue notedAuthorHighlight">
              {authorLabel}
            </span>
          )}
        </div>

        {item.deskription && (
          <div className="notedFormGroup">
            <label>Deskripsi</label>
            <p
              className="notedMetaValue"
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "var(--leading-relaxed)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              {item.deskription}
            </p>
          </div>
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
              <span className="notedMetaLabel">Efektif Sampai:</span>
              <span className="notedMetaValue">{formatDate(item.expired)}</span>
            </div>
          )}
          {authorLabel && (
            <div className="notedCardMetaItem">
              <span className="notedMetaLabel">Dibuat oleh</span>
              <span className="notedMetaValue notedAuthorHighlight">
                {authorLabel}
              </span>
            </div>
          )}
        </div>

        <div className="notedEditActions">
          <button
            type="button"
            className="notedBtnCancel"
            onClick={onClose}
          >
            Tutup
          </button>

          {isOwner && (
            <button
              type="button"
              className="notedBtnSubmit"
              onClick={() => {
                onClose?.();
                onEdit?.(item);
              }}
            >
              Edit Memo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotedView;