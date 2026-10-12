import axios from "axios"
import { useState, useEffect } from "react"
import '@/app/styles/Laporan.css'


function LaporanCard({ searchQuery = "" }) {
    const [laporan, setLaporan] = useState([])

    useEffect(() => {
        const fetchLaporan = async () => {
            try {
                const response = await axios.get('/api/laporan')
                setLaporan(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchLaporan()
    }, [])

    const filtered = searchQuery.trim()
        ? laporan.filter(item =>
            item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : laporan

    return (
        <div className="laporanCard">
            <table>
                <thead>
                    <tr>

                        <th>Product</th>
                        <th>Barcode</th>
                        <th>Brand</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length > 0 ? (
                        filtered.map(laporan => (
                            <tr key={laporan.id}>
                                <td>{laporan.title}</td>
                                <td>{laporan.barcode}</td>
                                <td>{laporan.brand}</td>
                                <td>{laporan.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="laporan-empty-cell">
                                Data brand tidak ditemukan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LaporanCard