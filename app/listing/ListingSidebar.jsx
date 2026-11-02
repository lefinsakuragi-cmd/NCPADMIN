"use client"

import { useAuthStore } from '@/store/userStore'
import { useState } from 'react'
import { useListingStore } from '@/store/listingStore'
import '../styles/Listing.css'

function ListingSidebar() {
    const user = useAuthStore((state) => state.user)

    const [input, setInput] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const addItem = useListingStore((state) => state.addItem)
    const deleteItem = useListingStore((state) => state.deleteItem)
    const item = useListingStore((state) => state.item)
    const data = useListingStore((state) => state.data)
    const setData = useListingStore((state) => state.setData)

    const { nomorSurat, pihak2, deadline, type } = data
    const { nama, perusahaan, jabatan, telp } = pihak2

    const handleAppend = () => {
        if (!input.trim()) return;

        addItem(input)
        setInput("")
    }

    const handleRemoveItem = (index) => {
        deleteItem(index)
    }

    const handlePrint = () => {
        const originalTitle = document.title;
        const safeNumber = nomorSurat ? nomorSurat.trim().replace(/[\/\s\\:]+/g, '_') : 'Draft';
        document.title = `Surat Listing Include Tax No.${safeNumber}.pdf`;
        window.print();
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    };

    const handleSavePdf = async () => {
        const element = document.querySelector('.listing-container');
        if (!element) {
            alert('Konten surat tidak ditemukan');
            return;
        }

        setIsSaving(true);
        try {
            const { jsPDF } = await import('jspdf');
            const html2canvas = (await import('html2canvas')).default;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const margin = 10;
            const contentWidth = pdfWidth - (margin * 2);
            const contentHeight = (canvas.height * contentWidth) / canvas.width;

            let heightLeft = contentHeight;
            let position = margin;

            // Halaman pertama
            pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
            heightLeft -= (pdfHeight - (margin * 2));

            // Tambah halaman berikutnya jika konten melebihi 1 halaman A4
            while (heightLeft > 0) {
                position = heightLeft - contentHeight + margin;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
                heightLeft -= (pdfHeight - (margin * 2));
            }

            const safeNumber = nomorSurat ? nomorSurat.trim().replace(/[\/\s\\:]+/g, '_') : 'Draft';
            pdf.save(`Surat Listing Include Tax No.${safeNumber}.pdf`);
        } catch (error) {
            console.error('Gagal generate PDF:', error);
            handlePrint();
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <>
            <aside className="listingSidebar">

                <div className='listingHeader'>
                    <h1>Surat Listing</h1>
                    <div className='listingBtnGroup'>
                        <button
                            type="button"
                            className="btn-print btn-save-pdf"
                            onClick={handleSavePdf}
                            disabled={isSaving}
                            title="Download langsung sebagai file PDF"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            {isSaving ? "Menyimpan..." : "Save PDF"}
                        </button>
                        <button
                            type="button"
                            id="btn-print-listing"
                            className="btn-print"
                            onClick={handlePrint}
                            title="Cetak atau pilih Simpan sebagai PDF dari dialog browser"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                            Print
                        </button>
                    </div>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="no">Nomor Surat</label>
                    <input
                        type="text"
                        placeholder="Contoh: 16 /CMS-FNC/X /2026"
                        id="no"
                        value={nomorSurat}
                        onChange={(e) => setData({ nomorSurat: e.target.value })}
                    />

                    <h1>Pihak PenanggungJawab Listing</h1>
                    <label htmlFor="nama">Nama</label>
                    <input
                        id="nama"
                        type="text"
                        placeholder="Masukan nama"
                        value={nama}
                        onChange={(e) => setData({ pihak2: { nama: e.target.value } })}
                    />

                    <label htmlFor="perusahaan">Perusahaan</label>
                    <input
                        type="text"
                        placeholder="Masukan perusahaan"
                        id="perusahaan"
                        value={perusahaan}
                        onChange={(e) => setData({ pihak2: { perusahaan: e.target.value } })}
                    />

                    <label htmlFor="jabatan">Jabatan</label>
                    <input
                        id="jabatan"
                        type="text"
                        placeholder="Jabatan"
                        value={jabatan}
                        onChange={(e) => setData({ pihak2: { jabatan: e.target.value } })}
                    />

                    <label htmlFor="telp">No Telpon</label>
                    <input
                        id="telp"
                        type="tel"
                        placeholder="Nomor telepon"
                        value={telp}
                        onChange={(e) => setData({ pihak2: { telp: e.target.value } })}
                    />

                    <label htmlFor="deadline">Deadline</label>
                    <input
                        value={deadline}
                        id="deadline"
                        type="date"
                        onChange={(e) => setData({ deadline: e.target.value })}
                    />

                    <label htmlFor="type">Pake pajak atau tidak?</label>
                    <select name="type" id="type" value={type} onChange={(e) => setData({ type: e.target.value })}>
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