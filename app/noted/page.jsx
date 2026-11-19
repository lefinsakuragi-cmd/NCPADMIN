"use client"

import Navbar from "../components/Navbar"
import NotedSidebar from "./NotedSidebar"
import NotedContent from "./NotedContent"
import "../styles/Noted.css"

function Page() {
    return (
        <main className="app-layout">
            <Navbar />
            <div className="page-content">
                <section className="notedContent">
                    <NotedContent />
                </section>
                <NotedSidebar />
            </div>
        </main>
    )
}

export default Page
