"use client";
import '@/app/styles/Laporan.css';
import LaporanCard from './LaporanCard';

function LaporanContent({ searchQuery }) {
    return (
        <section className="laporanContent">
            <div className="laporanWrapper">
                <div className="laporanHeadline">
                    <h1>LAPORAN BRAND</h1>
                    <p>NewCentral <span>Admin</span></p>
                </div>
                <LaporanCard searchQuery={searchQuery} />
            </div>
        </section>
    );
}

export default LaporanContent;