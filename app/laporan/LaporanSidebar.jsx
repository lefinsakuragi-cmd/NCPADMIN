"use client";
import { useState } from 'react';
import '@/app/styles/Laporan.css';

function LaporanSidebar({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <aside className="laporanSidebar">
            <div className="laporanSidebarWrapper">
                <div className="laporanSidebarHeadline">
                    <div>
                        <h1>Laporan Brand</h1>
                        <p>NewCentral Admin</p>
                    </div>
                </div>

                <div className="laporanSidebarCard">
                    <div className="laporanSidebarBadge">
                        <span className="laporanBadgeDot"></span>
                        <span>Filter & Pencarian</span>
                    </div>

                    <h2>LAPORAN SLOW MOVING</h2>

                    <div className="laporanSearchGroup">
                        <label htmlFor="brand">Cari Brand :</label>
                        <div className="laporanInputWrapper">
                            <svg 
                                className="laporanSearchIcon" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                id="brand"
                                value={searchValue}
                                placeholder="Cari brand kamu..."
                                onChange={handleSearchChange}
                            />
                            {searchValue && (
                                <button
                                    type="button"
                                    className="laporanClearBtn"
                                    onClick={handleClear}
                                    title="Hapus pencarian"
                                    aria-label="Hapus pencarian"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                        <p className="laporanSearchHint">Ketik nama brand untuk memfilter data tabel secara instan.</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default LaporanSidebar;