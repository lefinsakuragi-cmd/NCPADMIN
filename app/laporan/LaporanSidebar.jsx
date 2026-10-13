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
    } = useLaporanStore();

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
                </div>
            </div>
        </aside>
    );
}

export default LaporanSidebar;