import { jsPDF } from "jspdf";
import '../../styles/laporanDownload.css';

export default function SuratListingDownload({ data }) {
    const handleDownload = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 12;
        const contentWidth = pageWidth - margin * 2;

        // Default or extracted data
        const suratData = {
            nomorSurat: data?.nomorSurat || "",
            pihak1: {
                nama: data?.pihak1?.nama || "",
                jabatan: data?.pihak1?.jabatan || "",
                perusahaan: data?.pihak1?.perusahaan || "",
            },
            pihak2: {
                nama: data?.pihak2?.nama,
                jabatan: data?.pihak2?.jabatan,
                perusahaan: data?.pihak2?.perusahaan,
                telp: data?.pihak2?.telp,
            },
            deadline: data?.deadline,
            withTax: data?.type ? data.type === "tax" : true,
            items: data?.items && data.items.length > 0 ? data.items : "",
            tarifPerSku: data?.tarifPerSku,
        };

        const formatRupiah = (val) => {
            return "Rp" + Math.round(val).toLocaleString("id-ID");
        };

        // Format tanggal hari ini dalam bahasa Indonesia
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        const now = new Date();
        const hariIni = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        const tanggalTtd = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

        let y = margin + 4;

        // === KOP SURAT / HEADER ===
        // Logo atau Icon placeholder (jika ada file ncp-icon.png)
        try {
            doc.addImage("/ncp-icon.png", "PNG", margin + 3, y - 1, 18, 18);
        } catch (e) {
            // fallback jika gambar tidak ditemukan
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(210, 35, 35); // Merah khas Central Maju Sejahtera
        doc.text("CV. CENTRAL MAJU SEJAHTERA", pageWidth / 2, y + 2, { align: "center" });

        doc.setFontSize(13);
        doc.text("COSMETICS AND STATIONERY", pageWidth / 2, y + 7, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.text("Jalan Tadulako No.36", pageWidth / 2, y + 11.5, { align: "center" });
        doc.text("Palu, Sulawesi Tengah, Indonesia", pageWidth / 2, y + 15, { align: "center" });
        doc.text("Telp : 0451-4012562", pageWidth / 2, y + 18.5, { align: "center" });
        doc.text("Email: cmstadulako36@gmail.com", pageWidth / 2, y + 22, { align: "center" });

        y += 24;
        doc.setLineWidth(0.6);
        doc.line(margin, y, margin + contentWidth, y);

        // === JUDUL SURAT ===
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("SURAT PERJANJIAN LISTING", pageWidth / 2, y, { align: "center" });

        // Garis bawah judul
        const textW = doc.getTextWidth("SURAT PERJANJIAN LISTING");
        doc.setLineWidth(0.3);
        doc.line(pageWidth / 2 - textW / 2, y + 1, pageWidth / 2 + textW / 2, y + 1);

        // === PARAGRAF PEMBUKA ===
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        const openingText = `Pada hari ini, ${hariIni} ( ${suratData.nomorSurat} ) telah dilakukan kerjasama kesepakatan antara:`;
        doc.text(openingText, margin + 4, y);

        // === PIHAK I ===
        y += 4;
        const leftIndent = margin + 14;
        const colLabel = leftIndent + 10;
        const colColon = leftIndent + 28;
        const colVal = leftIndent + 32;

        doc.text("I.", leftIndent, y);
        doc.text("Nama", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak1.nama, colVal, y);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("Jabatan", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak1.jabatan, colVal, y);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("Perusahaan", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak1.perusahaan, colVal, y);

        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text("Selanjutnya disebut sebagai Pihak I (pertama).", margin + 4, y);

        // === PIHAK II ===
        y += 4.5;
        doc.text("II.", leftIndent, y);
        doc.text("Nama", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak2.nama || "-", colVal, y);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("Jabatan", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak2.jabatan || "-", colVal, y);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("Perusahaan", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak2.perusahaan || "-", colVal, y);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("No. Telp", colLabel, y);
        doc.text(":", colColon, y);
        doc.setFont("helvetica", "bold");
        doc.text(suratData.pihak2.telp || "-", colVal, y);

        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text("Selanjutnya disebut sebagai Pihak II (kedua)", margin + 4, y);

        // === KETENTUAN LISTING ===
        y += 5;
        doc.text("Sehubungan dengan masuknya produk dari Pihak II kepada pihak I maka disepakati oleh kedua belah pihak", margin + 4, y);
        y += 4;
        doc.text("perihal ketentuan listing meliputi :", margin + 4, y);

        y += 4.5;
        const numCol = margin + 14;
        const textCol = margin + 20;

        // Poin 1
        doc.text("1.", numCol, y);
        doc.text("Pengenaan tarif listing produk baru sebesar", textCol, y);
        const p1W = doc.getTextWidth("Pengenaan tarif listing produk baru sebesar ");
        doc.setFont("helvetica", "bold");
        doc.text(`${formatRupiah(suratData.tarifPerSku)},-/SKU`, textCol + p1W, y);

        // Poin 2
        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("2.", numCol, y);
        doc.text("Pihak I memberikan waktu selama 1 bulan setelah surat ini dibuat untuk melunaskan", textCol, y);
        y += 3.8;
        doc.setFont("helvetica", "bold");
        doc.text(`pembayaran (${suratData.deadline})`, textCol, y);

        // Poin 3
        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text("3.", numCol, y);
        doc.text("Jika dalam waktu yang ditentukan Pihak II belum melunaskan maka pihak I akan", textCol, y);
        y += 3.8;
        doc.text("memotongkan nominal listing yang terlampir pada tagihan/nota yang ditagihkan", textCol, y);
        y += 3.8;
        doc.text("pihak distributor", textCol, y);

        // Poin 4
        y += 4;
        doc.text("4.", numCol, y);
        doc.text("Pembayaran dapat ditransfer langsung melalui rekening atas", textCol, y);
        y += 3.8;
        doc.text("Nama", textCol, y);
        doc.text(":", textCol + 26, y);
        doc.setFont("helvetica", "bold");
        doc.text("Central Maju Sejahtera", textCol + 30, y);

        y += 3.8;
        doc.setFont("helvetica", "normal");
        doc.text("Nama Bank", textCol, y);
        doc.text(":", textCol + 26, y);
        doc.setFont("helvetica", "bold");
        doc.text("BCA", textCol + 30, y);

        y += 3.8;
        doc.setFont("helvetica", "normal");
        doc.text("Nomor Rekening", textCol, y);
        doc.text(":", textCol + 26, y);
        doc.setFont("helvetica", "bold");
        doc.text("792-1909091", textCol + 30, y);

        // Poin 5 & 6 (Pajak)
        if (suratData.withTax) {
            y += 4;
            doc.setFont("helvetica", "normal");
            doc.text("5.", numCol, y);
            doc.text("Pihak I wajib membuat faktur pajak atas transaksi ini", textCol, y);

            y += 4;
            doc.text("6.", numCol, y);
            doc.text("Pihak II wajib membuat bukti potong PPH pasal 23 atas transaksi ini", textCol, y);
        }

        // === LIST PRODUK BARU ===
        y += 5.5;
        doc.setFont("helvetica", "normal");
        doc.text("Adapun produk baru tersebut meliputi :", margin + 4, y);

        y += 6;
        doc.setFont("calibri", "normal");
        doc.setFontSize(8);
        const itemColNum = margin + 18;
        const itemColText = margin + 28;

        suratData.items.forEach((itemText, idx) => {
            doc.text(String(idx + 1), itemColNum, y);
            doc.text(String(itemText).toUpperCase(), itemColText, y);
            y += 4.2;
        });

        // === TABEL PERHITUNGAN BIAYA LISTING ===
        y += 2.5;
        const skuCount = suratData.items.length;
        const subtotal = skuCount * suratData.tarifPerSku;

        let dpp = subtotal;
        let ppn = 0;
        let pph23 = 0;
        let total = subtotal;

        if (suratData.withTax) {
            // DPP = 11/12 * subtotal atau perhitungannya sesuai format referensi:
            // Pada gambar: Subtotal 900.000, DPP 825.000, PPN 99.000, PPH23 18.000, Total 981.000
            // Formula: DPP = Subtotal / 1.11 ~ 810.8k atau DPP basis 825.000 (100/109 dll).
            // Di sini kita gunakan:
            dpp = Math.round(subtotal * (11 / 12)); // 900.000 * 11/12 = 825.000
            ppn = Math.round(dpp * 0.12);           // 825.000 * 12% = 99.000
            pph23 = Math.round(subtotal * 0.02);    // 900.000 * 2% = 18.000
            total = subtotal + ppn - pph23;         // 900.000 + 99.000 - 18.000 = 981.000
        }

        const tableX = margin + 14;
        const col1W = 60;
        const col2W = 65;
        const rowH = 4.5;

        doc.setLineWidth(0.2);

        const drawCalcRow = (label, valText, isBold = false, isItalic = false) => {
            doc.rect(tableX, y, col1W, rowH);
            doc.rect(tableX + col1W, y, col2W, rowH);

            doc.setFont("helvetica", isBold ? "bold" : "normal");
            doc.text(label, tableX + 2, y + 3.2);

            if (isItalic) {
                doc.setFont("helvetica", "bolditalic");
            }
            doc.text(valText, tableX + col1W + 2, y + 3.2);
            y += rowH;
        };

        drawCalcRow(
            "Jumlah Biaya Listing",
            `${formatRupiah(suratData.tarifPerSku)}   x   ${skuCount} Pcs   =   ${formatRupiah(subtotal)}`
        );

        if (suratData.withTax) {
            drawCalcRow("Dasar Pengenaan Pajak", formatRupiah(dpp));
            drawCalcRow("Jumlah PPN (Pajak Pertambahan Nilai)", formatRupiah(ppn));
            drawCalcRow("Jumlah PPH23", formatRupiah(pph23));
            drawCalcRow("TOTAL YANG DIBAYARKAN", formatRupiah(total), true, true);
        } else {
            drawCalcRow("TOTAL YANG DIBAYARKAN", formatRupiah(subtotal), true, true);
        }

        // === PENUTUP ===
        y += 4;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.text("Demikian surat perjanjian ini dibuat, atas dasar kesadaran dan tanpa paksaan dari pihak manapun.", margin + 4, y);

        // === TANDA TANGAN ===
        y += 5.5;
        doc.text(tanggalTtd, pageWidth - margin - 50, y, { align: "center" });

        y += 4.5;
        doc.setFont("helvetica", "bold");
        const ttdPihak1X = margin + 35;
        const ttdPihak2X = pageWidth - margin - 35;

        doc.text("PIHAK PERTAMA", ttdPihak1X, y, { align: "center" });
        doc.text("PIHAK KEDUA", ttdPihak2X, y, { align: "center" });

        y += 18; // Ruang tanda tangan
        doc.text(suratData.pihak1.nama, ttdPihak1X, y, { align: "center" });
        const name1W = doc.getTextWidth(suratData.pihak1.nama);
        doc.line(ttdPihak1X - name1W / 2, y + 0.6, ttdPihak1X + name1W / 2, y + 0.6);

        doc.text(suratData.pihak2.nama || ".........................", ttdPihak2X, y, { align: "center" });
        const name2W = doc.getTextWidth(suratData.pihak2.nama || ".........................");
        doc.line(ttdPihak2X - name2W / 2, y + 0.6, ttdPihak2X + name2W / 2, y + 0.6);

        y += 4;
        doc.setFont("helvetica", "normal");
        doc.text(suratData.pihak1.jabatan, ttdPihak1X, y, { align: "center" });
        doc.text(suratData.pihak2.perusahaan || suratData.pihak2.jabatan || "-", ttdPihak2X, y, { align: "center" });

        // Simpan file PDF
        const safeFileName = (suratData.nomorSurat || "surat-listing").replace(/[\/\\?%*:|"<>]/g, "-");
        doc.save(`Surat-Perjanjian-Listing-${safeFileName}.pdf`);
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            className="laporanDownloadBtn"
            title="Download Surat Perjanjian Listing PDF"
        >
            📄 Download Surat Listing (PDF)
        </button>
    );
}
