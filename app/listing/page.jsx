"use client";

import Navbar from '../components/Navbar';
import ListingContent from './ListingContent';
import ListingSidebar from './ListingSidebar';

function Page() {
    return (
        <main className="app-layout">
            <Navbar />
            <div className="page-content">
                <ListingContent />
                <ListingSidebar />
            </div>
        </main>
    );
}

export default Page;
