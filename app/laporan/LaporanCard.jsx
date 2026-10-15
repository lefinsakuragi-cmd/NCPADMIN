"use client";
import { useLaporanStore } from "@/store/laporanStore";
import '@/app/styles/Laporan.css';
import LaporanDownload from "../components/templatePdf/LaporanDownload";

function LaporanCard({
    searchQuery = "",
    laporan: propLaporan,
    hasFetched: propHasFetched,
    isLoading: propIsLoading,
    activeBrand: propActiveBrand
}) {
    const store = useLaporanStore();

    const laporan = propLaporan !== undefined ? propLaporan : store.laporan;
    const hasFetched = propHasFetched !== undefined ? propHasFetched : store.hasFetched;
    const isLoading = propIsLoading !== undefined ? propIsLoading : store.isLoading;
    const activeBrand = propActiveBrand !== undefined ? propActiveBrand : store.activeBrand;
    const error = store.error;
    const { sortBy, sortOrder, filterDateFrom, filterDateTo, filterStatus } = store;

    // 1. Filter by search query (nama/barcode/brand)
    const filtered = searchQuery.trim()
        ? (laporan || []).filter(item =>
            (item.brand?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (item.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (item.barcode?.toLowerCase() || "").includes(searchQuery.toLowerCase())
        )
        : (laporan || []);

    // 2. Filter by date range (filterDateFrom & filterDateTo)
    const filteredByDate = filtered.filter(item => {
        if (!filterDateFrom && !filterDateTo) return true;
        if (!item.update) return false;
        // Normalize: ambil 10 karakter pertama "YYYY-MM-DD" agar bisa dibandingkan string
        const itemDate = item.update.toString().slice(0, 10);
        if (filterDateFrom && itemDate < filterDateFrom) return false;
        if (filterDateTo && itemDate > filterDateTo) return false;
        return true;
    });

    // 3. Filter by status
    const filteredByStatus = filterStatus
        ? filteredByDate.filter(item =>
            (item.status?.trim() || '') === filterStatus
        )
        : filteredByDate;

    // 4. Sort logic
    const sorted = [...filteredByStatus].sort((a, b) => {
        if (sortBy === 'date') {
            const dateA = a.update ? new Date(a.update) : new Date(0);
            const dateB = b.update ? new Date(b.update) : new Date(0);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (sortBy === 'status') {
            const statusA = (a.status || '').toLowerCase();
            const statusB = (b.status || '').toLowerCase();
            if (statusA < statusB) return sortOrder === 'asc' ? -1 : 1;
            if (statusA > statusB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        }
        return 0; // default: urutan asli
    });

    // 1. Initial Standby State: Jangan langsung render tabel sebelum brand dipilih dan tombol diklik
    if (!hasFetched && !isLoading) {
        return (
            <div className="laporanCard laporanCardStandby">
                <div className="laporanStandbyState">
                    <div className="laporanStandbyIcon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                    </div>
                    <h3>LAPORAN BELUM DITAMPILKAN</h3>
                    <p>
                        Silakan pilih brand pada <strong>Panel Kontrol</strong> di samping, lalu klik tombol <strong>Tampilkan Laporan</strong> untuk memuat data tabel.
                    </p>
                    <div className="laporanStandbySteps">
                        <div className="laporanStepItem">
                            <span className="laporanStepNum">1</span>
                            <span>Pilih Brand</span>
                        </div>
                        <div className="laporanStepArrow">→</div>
                        <div className="laporanStepItem">
                            <span className="laporanStepNum">2</span>
                            <span>Klik Tampilkan</span>
                        </div>
                        <div className="laporanStepArrow">→</div>
                        <div className="laporanStepItem">
                            <span className="laporanStepNum">3</span>
                            <span>Tabel Dirender</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Loading State: Menampilkan animasi cyberpunk saat fetching berlangsung
    if (isLoading) {
        return (
            <div className="laporanCard laporanCardLoading">
                <div className="laporanLoadingBox">
                    <div className="laporanSpinner"></div>
                    <h3>MEMUAT DATA LAPORAN...</h3>
                    <p>Mengambil data slow moving dari database sistem...</p>
                </div>
            </div>
        );
    }

    // 3. Error State
    if (error) {
        return (
            <div className="laporanCard">
                <div className="laporanErrorBox">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // 4. Rendered Table State setelah tombol diklik
    return (
        <div className="laporanCard">
            <div className="laporanCardHeader">
                <div className="laporanCardHeaderLeft">
                    <span className="laporanCardActiveBadge">
                        <span className="laporanActivePulse"></span>
                        BRAND: {activeBrand === "ALL" ? "SEMUA BRAND" : activeBrand}
                    </span>
                    <span className="laporanCardCount">
                        {sorted.length} {sorted.length === 1 ? "Item" : "Items"}
                    </span>
                </div>
                {searchQuery && (
                    <div className="laporanFilterNotice">
                        Filter: <span>"{searchQuery}"</span>
                    </div>
                )}
                <LaporanDownload data={sorted} />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Barcode</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Stok Update</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.length > 0 ? (
                        sorted.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{index + 1}</td>
                                <td>{item.barcode}</td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.update}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="laporan-empty-cell">
                                {searchQuery
                                    ? `Data tidak ditemukan untuk pencarian "${searchQuery}"`
                                    : "Data brand tidak ditemukan"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default LaporanCard;