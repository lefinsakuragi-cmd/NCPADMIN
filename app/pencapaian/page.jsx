import Navbar from "../components/Navbar";
import PencapaianContent from "./PencapaianContent";

function Page() {
    return (
        <main>
            <Navbar />
            <div className="page-content">
                <PencapaianContent />
            </div>
        </main>
    )
}

export default Page