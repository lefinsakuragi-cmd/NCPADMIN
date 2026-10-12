import Navbar from "../components/Navbar"
import ListingContent from "./ListingContent"

function Page() {
    return (
        <main>
            <Navbar />
            <div className="page-content">
                <ListingContent />
            </div>
        </main>
    )
}

export default Page