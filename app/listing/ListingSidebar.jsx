"use client"

import { useAuthStore } from '@/store/userStore'
import { useState } from 'react'
import { useListingStore } from '@/store/listingStore'
import '../styles/Listing.css'

function ListingSidebar() {
    const user = useAuthStore((state) => state.user)

    const [nomorSurat, setNomorSurat] = useState("")
    const [nama, setNama] = useState("")
    const [perusahaan, setPerusahaan] = useState("")
    const [jabatan, setJabatan] = useState("")
    const [telp, setTelp] = useState("")
    const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0])
    const [type, setType] = useState("tax")

    const [input, setInput] = useState("")

    const addItem = useListingStore((state) => state.addItem)
    const deleteItem = useListingStore((state) => state.deleteItem)
    const item = useListingStore((state) => state.item)

    const handleAppend = () => {
        if (!input.trim()) return;

        addItem(input)
        setInput("")
    }

    const handleRemoveItem = (index) => {
        deleteItem(index)
    }

    if (!user) return null;

    // Persiapkan data untuk template PDF
    const pdfData = {
        nomorSurat: nomorSurat || "Nomor belum di isikan!",
        pihak1: {
            nama: "WISSELY CIANDRA TEJALAKSANA",
            jabatan: "GENERAL MANAGER",
            perusahaan: "CV.CENTRAL MAJU SEJAHTERA",
        },
        pihak2: {
            nama: nama || "nama belum di isikan",
            jabatan: jabatan || "jabatan belum di isikan",
            perusahaan: perusahaan || "perusahaan belum di isikan",
            telp: telp || "no telepon belum di isikan",
        },
        deadline: deadline || "deadline belum di isikan",
        type: type,
        items: item.length > 0 ? item : "item belum di isikan",
        tarifPerSku: 150000,
    }

    return (
        <>
            <aside className="listingSidebar">

                <div className='listingHeader'>
                    <h1>Surat Listing</h1>
                    <button
                        type="button"
                        id="btn-print-listing"
                        className="btn-print"
                        onClick={() => window.print()}
                    >
                        Print Surat
                    </button>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="no">Nomor Surat</label>
                    <input
                        type="text"
                        placeholder="Contoh: 16 /CMS-FNC/X /2026"
                        id="no"
                        value={nomorSurat}
                        onChange={(e) => setNomorSurat(e.target.value)}
                    />

                    <h1>Pihak PenanggungJawab Listing</h1>
                    <label htmlFor="nama">Nama</label>
                    <input
                        id="nama"
                        type="text"
                        placeholder="Masukan nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />

                    <label htmlFor="perusahaan">Perusahaan</label>
                    <input
                        type="text"
                        placeholder="Masukan perusahaan"
                        id="perusahaan"
                        value={perusahaan}
                        onChange={(e) => setPerusahaan(e.target.value)}
                    />

                    <label htmlFor="jabatan">Jabatan</label>
                    <input
                        id="jabatan"
                        type="text"
                        placeholder="Jabatan"
                        value={jabatan}
                        onChange={(e) => setJabatan(e.target.value)}
                    />

                    <label htmlFor="telp">No Telpon</label>
                    <input
                        id="telp"
                        type="tel"
                        placeholder="Nomor telepon"
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                    />

                    <label htmlFor="deadline">Deadline</label>
                    <input
                        value={deadline}
                        id="deadline"
                        type="date"
                        onChange={(e) => setDeadline(e.target.value)}
                    />

                    <label htmlFor="type">Pake pajak atau tidak?</label>
                    <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="tax">Dengan Pajak</option>
                        <option value="notax">Tanpa Pajak</option>
                    </select>

                    <label htmlFor="item">Item yang mau di Listing:</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            style={{ flex: 1 }}
                            type="text"
                            id="item"
                            placeholder="Isi dengan item"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAppend();
                                }
                            }}
                        />
                        <button type="button" onClick={handleAppend}>Tambah</button>
                    </div>

                    <div className="item">
                        {item.map((itm, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ margin: 0 }}>No.{index + 1} - {itm}</p>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ff3366',
                                        cursor: 'pointer',
                                        padding: '2px 6px',
                                        boxShadow: 'none',
                                        fontSize: '12px'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </form>
            </aside>
        </>
    )
}

export default ListingSidebar