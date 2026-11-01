"use client";
import React from 'react';
import '@/app/styles/Listing.css';
import { useListingStore } from '@/store/listingStore';

function ListingContent() {
    const items = useListingStore((state) => state.item);
    return (
        <div className="listing-container">
            {/* Header Surat */}
            <div className="listing-header">
                <img src="/ncpLogo.png" alt="logo" className="listing-logo" />
                <div className="listing-header-text">
                    <h1 className="company-name">CV. CENTRAL MAJU SEJAHTERA</h1>
                    <p className="company-unit">COSMETICS AND STATIONERY</p>
                    <p className="company-address">Jalan Tadulako No.36, Palu, Sulawesi Tengah, Indonesia</p>
                    <p className="company-contact">Telp: 0451-4012562 | Email: cmstadulako36@gmail.com</p>
                </div>
            </div>

            {/* Judul & Tanggal */}
            <div className="listing-title-area">
                <h2>SURAT PERJANJIAN LISTING</h2>
                <p className="listing-date">Pada hari ini, Rabu, 21 Oktober 2026{` (16/CMS-FNC/X/2026) `}telah dilakukan kerjasama kesepakatan antara:</p>
            </div>

            {/* Pihak-pihak */}
            <div className="parties-section">
                <div className="party-box">
                    <table>
                        <tbody>
                            <tr><td>Nama</td><td>: WISSELY CIANDRA TEJALAKSANA</td></tr>
                            <tr><td>Jabatan</td><td>: GENERAL MANAGER</td></tr>
                            <tr><td>Perusahaan</td><td>: CV. CENTRAL MAJU SEJAHTERA</td></tr>
                        </tbody>
                    </table>
                    <p style={{ marginTop: '5px', fontStyle: 'italic', fontSize: '13px' }}>Selanjutnya disebut sebagai Pihak I (pertama).</p>
                </div>

                <div className="party-box" style={{ marginTop: '15px' }}>
                    <table>
                        <tbody>
                            <tr><td>Nama</td><td>: asdasd</td></tr>
                            <tr><td>Jabatan</td><td>: adasd</td></tr>
                            <tr><td>Perusahaan</td><td>: asdasd</td></tr>
                            <tr><td>No. Telp</td><td>: asdasd</td></tr>
                        </tbody>
                    </table>
                    <p style={{ marginTop: '5px', fontStyle: 'italic', fontSize: '13px' }}>Selanjutnya disebut sebagai Pihak II (kedua)</p>
                </div>
            </div>

            {/* Ketentuan Listing */}
            <div className="terms-section">
                <p>Sehubungan dengan masuknya produk dari Pihak II kepada pihak I maka disepakati oleh kedua belah pihak perihal ketentuan listing meliputi:</p>
                <ol>
                    <li>Pengenaan tarif listing produk baru sebesar Rp150.000,-/SKU</li>
                    <li>Pihak I memberikan waktu selama 1 bulan setelah surat ini dibuat untuk melunaskan pembayaran (2026-10-21)</li>
                    <li>Jika dalam waktu yang ditentukan Pihak II belum melunaskan maka pihak I akan memotongkan nominal listing yang terlampir pada tagihan/nota yang ditagihkan pihak distributor</li>
                    <li>
                        Pembayaran dapat ditransfer langsung melalui rekening atas:
                        <div className="bank-info">
                            <table>
                                <tbody>
                                    <tr><td style={{ width: '130px' }}>Nama</td><td>: Central Maju Sejahtera</td></tr>
                                    <tr><td>Nama Bank</td><td>: BCA</td></tr>
                                    <tr><td>Nomor Rekening</td><td>: 792-1909091</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>Pihak I wajib membuat faktur pajak atas transaksi ini</li>
                    <li>Pihak II wajib membuat bukti potong PPH pasal 23 atas transaksi ini</li>
                </ol>
            </div>

            {/* Produk Baru */}
            <div className="terms-section">
                <p>Adapun produk baru tersebut meliputi:</p>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th style={{ width: '10px' }}>No</th>
                            <th>Nama Produk / SKU</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((itm, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{itm}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rincian Biaya & Pajak */}
            <div className="summary-box">
                <div className="summary-row">
                    <span>Jumlah Biaya Listing</span>
                    <span>Rp150.000</span>
                </div>
                <div className="summary-row">
                    <span>Dasar Pengenaan Pajak</span>
                    <span>Rp137.500</span>
                </div>
                <div className="summary-row">
                    <span>Jumlah PPN (Pajak Pertambahan Nilai)</span>
                    <span>Rp16.500</span>
                </div>
                <div className="summary-row">
                    <span>Jumlah PPH23</span>
                    <span>(Rp3.000)</span>
                </div>
                <div className="summary-row total">
                    <span>TOTAL YANG DIBAYARKAN</span>
                    <span>Rp163.500</span>
                </div>
            </div>

            {/* Penutup */}
            <p className="closing-text">
                Demikian surat perjanjian ini dibuat, atas dasar kesadaran dan tanpa paksaan dari pihak manapun.
            </p>

            {/* Tanda Tangan */}
            <div className="signatures-section">
                <div className="signature-box">
                    <p className="signature-role">PIHAK PERTAMA</p>
                    <p className="signature-title">CV. CENTRAL MAJU SEJAHTERA</p>
                    <p className="signature-name">WISSELY CIANDRA TEJALAKSANA</p>
                    <p className="signature-title">GENERAL MANAGER</p>
                </div>

                <div className="signature-box">
                    <p className="signature-role">PIHAK KEDUA</p>
                    <p className="signature-title" style={{ visibility: 'hidden' }}>spacer</p>
                    <p className="signature-name">asdasd</p>
                    <p className="signature-title">asdasd</p>
                </div>
            </div>
        </div>
    );
}

export default ListingContent;