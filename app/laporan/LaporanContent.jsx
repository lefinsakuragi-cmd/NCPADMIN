"use client";
import '@/app/styles/HomeContent.css'
import LaporanCard from './LaporanCard';
function LaporanContent({ searchQuery }) {
    return (
        <section className="homeContent">
            <div className="homeWrapper">
                <div className="homeHeadline">
                    <h1>LAPORAN BRAND</h1>
                    <p>NewCentral <span>Admin</span></p>
                </div>
                <LaporanCard searchQuery={searchQuery} />
            </div>
        </section>
    )
}

export default LaporanContent