"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import LaporanContent from './LaporanContent';
import LaporanSidebar from './LaporanSidebar';

function Page() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className="app-layout">
            <Navbar />
            <div className="page-content">
                <LaporanContent searchQuery={searchQuery} />
                <LaporanSidebar onSearch={setSearchQuery} />
            </div>
        </main>
    );
}

export default Page;
