"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLaporanStore } from '@/store/laporanStore';
import '@/app/styles/Laporan.css';

function LaporanSidebar({ onSearch, onFetch }) {
    const {
        laporan,
        setLaporan,
        selectedBrand: storeBrand,
        setSelectedBrand: setStoreBrand,
        activeBrand,
        setActiveBrand,
        isLoading,
        setIsLoading,
        hasFetched,
        setHasFetched,
        setError,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        filterDateFrom,
        setFilterDateFrom,
        filterDateTo,
        setFilterDateTo,
        filterStatus,
        setFilterStatus,
        resetFilters,
    } = useLaporanStore();

    // Derive unique status options from loaded data
    const statusOptions = Array.from(
        new Set((laporan || []).map((item) => item.status?.trim()).filter(Boolean))
    ).sort();

    const [selectedBrand, setSelectedBrand] = useState(storeBrand || '');
    const [brandOptions, setBrandOptions] = useState([]);
    const [loadingBrands, setLoadingBrands] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Fetch brand options for the select dropdown on initial load
    useEffect(() => {
        const fetchBrandOptions = async () => {
            try {
                setLoadingBrands(true);
                const response = await axios.get('/api/laporan');
                const data = response.data?.data || [];
                const brands = Array.from(
                    new Set(data.map((item) => item.brand?.trim()).filter(Boolean))
                ).sort();
                setBrandOptions(brands);
            } catch (err) {
                console.error("Gagal mengambil opsi brand:", err);
            } finally {
                setLoadingBrands(false);
            }
        };

        fetchBrandOptions();
    }, []);

    const handleBrandSelectChange = (e) => {
        const value = e.target.value;
        setSelectedBrand(value);
        setStoreBrand(value);
    };

    // Button action: Fetch data for the chosen brand and render in LaporanCard
    const handleFetchReport = async (e) => {
        if (e) e.preventDefault();
        if (!selectedBrand) return;

        setIsLoading(true);
        setError(null);

        try {
            const url = selectedBrand === "ALL"
                ? '/api/laporan'
                : `/api/laporan?brand=${encodeURIComponent(selectedBrand)}`;

            const response = await axios.get(url);
            const data = response.data?.data || [];

            setLaporan(data);
            setActiveBrand(selectedBrand);
            setHasFetched(true);

            if (onFetch) {
                onFetch({ brand: selectedBrand, data });
            }
        } catch (err) {
            console.error("Gagal mengambil data laporan:", err);
            setError(err.message || "Gagal memuat laporan brand");
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleResetFilters = () => {
        resetFilters();
    };

    return (
        <aside className="laporanSidebar">
            <div className="laporanSidebarWrapper">
                <div className="laporanSidebarHeadline">
                    <div>
                        <h1>Panel Laporan</h1>
                        <p>NewCentral Admin</p>
                    </div>
                </div>

                <div className="laporanSidebarCard">
                    <div className="laporanSidebarBadge">
                        <span className="laporanBadgeDot"></span>
                        <span>Panel Kontrol</span>
                    </div>

                    <h2>PILIH & TAMPILKAN BRAND</h2>

                    {/* Brand Select Option */}
                    <div className="laporanControlGroup">
                        <label htmlFor="brandSelect">Pilih Brand :</label>
                        <div className="laporanSelectWrapper">
                            <select
                                id="brandSelect"
                                className="laporanSelect"
                                value={selectedBrand}
                                onChange={handleBrandSelectChange}
                                disabled={loadingBrands || isLoading}
                            >
                                <option value="">-- Pilih Brand --</option>
                                <option value="ALL">Semua Brand (All Brands)</option>
                                {brandOptions.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                            <div className="laporanSelectArrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                        {loadingBrands ? (
                            <p className="laporanFieldHint">Memuat opsi brand dari database...</p>
                        ) : (
                            <p className="laporanFieldHint">
                                {brandOptions.length > 0
                                    ? `Tersedia ${brandOptions.length} brand terdaftar.`
                                    : "Pilih opsi di atas untuk memuat data."}
                            </p>
                        )}
                    </div>

                    {/* Button Action to Fetch Data */}
                    <button
                        type="button"
                        className="laporanActionBtn"
                        onClick={handleFetchReport}
                        disabled={!selectedBrand || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="laporanBtnSpinner"></span>
                                <span>Mengambil Data...</span>
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="laporanBtnIcon">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                <span>Tampilkan Laporan</span>
                            </>
                        )}
                    </button>

                    {/* Status Info Box after data fetched */}
                    {hasFetched && (
                        <div className="laporanStatusBox">
                            <div className="laporanStatusRow">
                                <span className="laporanStatusLabel">Brand Aktif:</span>
                                <span className="laporanStatusValue">
                                    {activeBrand === "ALL" ? "Semua Brand" : activeBrand}
                                </span>
                            </div>
                            <div className="laporanStatusRow">
                                <span className="laporanStatusLabel">Total Produk:</span>
                                <span className="laporanStatusCount">{laporan.length} Item</span>
                            </div>
                        </div>
                    )}

                    {/* Filter & Realtime Search Box */}
                    <div className="laporanSearchGroup">
                        <label htmlFor="brandSearch">Filter Pencarian :</label>
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
                                id="brandSearch"
                                value={searchValue}
                                placeholder={hasFetched ? "Cari nama / barcode..." : "Tampilkan brand terlebih dahulu"}
                                onChange={handleSearchChange}
                                disabled={!hasFetched}
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
                        <p className="laporanSearchHint">
                            {hasFetched
                                ? "Ketik untuk menyaring produk atau barcode yang sedang ditampilkan."
                                : "Filter pencarian aktif setelah laporan ditampilkan."}
                        </p>
                    </div>

                    {/* Sort Controls */}
                    <div className="laporanSortGroup">
                        <label>Urutkan Data :</label>

                        {/* Sort By */}
                        <div className="laporanControlGroup" style={{ marginBottom: '10px' }}>
                            <label htmlFor="sortBySelect" className="laporanSortSubLabel">Berdasarkan</label>
                            <div className="laporanSelectWrapper">
                                <select
                                    id="sortBySelect"
                                    className="laporanSelect"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    disabled={!hasFetched}
                                >
                                    <option value="default">Default (Tanpa Urutan)</option>
                                    <option value="date">Tanggal Update</option>
                                    <option value="status">Status</option>
                                </select>
                                <div className="laporanSelectArrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Sort Order — hanya tampil jika sortBy bukan default */}
                        {sortBy !== 'default' && (
                            <div className="laporanSortOrderGroup">
                                <label className="laporanSortSubLabel">Arah Urutan</label>
                                <div className="laporanSortOrderBtns">
                                    <button
                                        type="button"
                                        id="sortOrderAsc"
                                        className={`laporanSortOrderBtn ${sortOrder === 'asc' ? 'active' : ''}`}
                                        onClick={() => setSortOrder('asc')}
                                        disabled={!hasFetched}
                                        title={sortBy === 'date' ? 'Terlama → Terbaru' : 'A → Z'}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="19" x2="12" y2="5"></line>
                                            <polyline points="5 12 12 5 19 12"></polyline>
                                        </svg>
                                        <span>{sortBy === 'date' ? 'Terlama' : 'A → Z'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        id="sortOrderDesc"
                                        className={`laporanSortOrderBtn ${sortOrder === 'desc' ? 'active' : ''}`}
                                        onClick={() => setSortOrder('desc')}
                                        disabled={!hasFetched}
                                        title={sortBy === 'date' ? 'Terbaru → Terlama' : 'Z → A'}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <polyline points="19 12 12 19 5 12"></polyline>
                                        </svg>
                                        <span>{sortBy === 'date' ? 'Terbaru' : 'Z → A'}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="laporanSearchHint">
                            {!hasFetched
                                ? "Sorting aktif setelah laporan ditampilkan."
                                : sortBy === 'default'
                                    ? "Pilih kriteria pengurutan di atas."
                                    : `Diurutkan: ${sortBy === 'date' ? 'Tanggal Update' : 'Status'} (${sortOrder === 'asc' ? (sortBy === 'date' ? 'Terlama' : 'A→Z') : (sortBy === 'date' ? 'Terbaru' : 'Z→A')})`
                            }
                        </p>
                    </div>

                    {/* Filter Panel — Tanggal Update & Status */}
                    <div className="laporanFilterPanel">
                        <div className="laporanFilterPanelHeader">
                            <div className="laporanFilterPanelTitle">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                </svg>
                                <span>Filter Tampilan</span>
                            </div>
                            {(filterDateFrom || filterDateTo || filterStatus) && (
                                <button
                                    type="button"
                                    className="laporanFilterResetBtn"
                                    onClick={handleResetFilters}
                                    title="Reset semua filter"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Filter Tanggal Update */}
                        <div className="laporanFilterGroup">
                            <label className="laporanSortSubLabel">Tanggal Update</label>
                            <div className="laporanDateRange">
                                <div className="laporanDateField">
                                    <label htmlFor="filterDateFrom" className="laporanDateLabel">Dari</label>
                                    <input
                                        type="date"
                                        id="filterDateFrom"
                                        className="laporanDateInput"
                                        value={filterDateFrom}
                                        onChange={(e) => setFilterDateFrom(e.target.value)}
                                        disabled={!hasFetched}
                                    />
                                </div>
                                <div className="laporanDateSep"></div>
                                <div className="laporanDateField">
                                    <label htmlFor="filterDateTo" className="laporanDateLabel">Sampai</label>
                                    <input
                                        type="date"
                                        id="filterDateTo"
                                        className="laporanDateInput"
                                        value={filterDateTo}
                                        onChange={(e) => setFilterDateTo(e.target.value)}
                                        disabled={!hasFetched}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Filter Status */}
                        <div className="laporanFilterGroup">
                            <label htmlFor="filterStatusSelect" className="laporanSortSubLabel">Status Produk</label>
                            <div className="laporanSelectWrapper">
                                <select
                                    id="filterStatusSelect"
                                    className="laporanSelect"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    disabled={!hasFetched}
                                >
                                    <option value="">Semua Status</option>
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <div className="laporanSelectArrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <p className="laporanSearchHint">
                            {!hasFetched
                                ? "Filter aktif setelah laporan ditampilkan."
                                : (!filterDateFrom && !filterDateTo && !filterStatus)
                                    ? "Belum ada filter aktif. Semua data ditampilkan."
                                    : [
                                        filterStatus && `Status: ${filterStatus}`,
                                        (filterDateFrom || filterDateTo) && `Tanggal: ${filterDateFrom || '...'} → ${filterDateTo || '...'}`,
                                    ].filter(Boolean).join(' · ')
                            }
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default LaporanSidebar;