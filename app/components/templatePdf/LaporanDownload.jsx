import { jsPDF } from "jspdf";
import '../../styles/laporanDownload.css'

export default function LaporanDownload({ data }) {
    const handleDownload = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 14;

        // === DARK THEME COLORS ===
        const colors = {
            bg: [255, 255, 255],           // Background utama: putih
            bgLight: [245, 245, 245],      // Background row genap
            bgDark: [235, 235, 235],       // Background row ganjil
            headerBg: [220, 220, 220],     // Background header tabel
            accent: [255, 49, 49],         // Accent / highlight: merah
            textPrimary: [0, 0, 0],        // Teks utama: hitam
            textSecondary: [60, 60, 60],   // Teks sekunder
            textMuted: [100, 100, 100],    // Teks muted
            border: [210, 210, 210],       // Border abu-abu
            divider: [180, 180, 180],      // Garis pemisah header
        };

        // Fungsi untuk menggambar background halaman
        const drawPageBg = () => {
            doc.setFillColor(...colors.bg);
            doc.rect(0, 0, pageWidth, pageHeight, "F");
        };

        // Background halaman pertama
        drawPageBg();

        let y = margin;

        // === HEADER SECTION ===
        const logoUrl = "/ncp-icon.png";
        doc.setLineWidth(0)
        doc.addImage(logoUrl, "PNG", margin, y, 20, 20);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(...colors.textPrimary);
        doc.text("CV. CENTRAL MAJU SEJAHTERA", margin + 25, y + 7);

        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(...colors.textPrimary);
        doc.text(`BRAND: ${data[0]?.brand ?? "Brand tidak tersedia"}`, margin + 25, y + 15);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...colors.accent);
        doc.text("Laporan Data Slow Moving dan overstock", margin + 25, y + 19);

        // Tanggal cetak
        const today = new Date();
        const tanggal = today.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        doc.setFontSize(8);
        doc.setTextColor(...colors.textSecondary);
        doc.text(`Dicetak: ${tanggal}`, margin + 30, y + 25);

        y += 32;

        // Garis pemisah header
        doc.setDrawColor(...colors.divider);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 8;

        // === TABLE SECTION ===
        const colWidths = [10, 25, 105, 15, 20, 15]; // No, Barcode, Product, Qty, Update, Status
        const headers = ["No", "Barcode", "Product", "Qty", "Update", "Status"];
        const tableWidth = colWidths.reduce((a, b) => a + b, 0);
        const tableStartX = margin;
        const rowHeight = 8;

        // Fungsi untuk menggambar header tabel
        const drawTableHeader = (startY) => {
            doc.setFillColor(...colors.headerBg);
            doc.rect(tableStartX, startY, tableWidth, rowHeight, "F");

            // Garis accent di atas header
            doc.setDrawColor(...colors.accent);
            doc.setLineWidth(0.8);
            doc.line(tableStartX, startY, tableStartX + tableWidth, startY);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.setTextColor(...colors.accent);

            let x = tableStartX;
            headers.forEach((header, i) => {
                doc.text(header, x + 2, startY + 5.5);
                x += colWidths[i];
            });

            return startY + rowHeight;
        };

        // Gambar header tabel pertama
        y = drawTableHeader(y);

        // === DATA ROWS ===
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        const items = data || [];

        if (items.length === 0) {
            doc.setFillColor(...colors.bgLight);
            doc.rect(tableStartX, y, tableWidth, rowHeight, "F");
            doc.setFont("helvetica", "italic");
            doc.setTextColor(...colors.textMuted);
            doc.text("Tidak ada data untuk ditampilkan", tableStartX + 2, y + 5.5);
            y += rowHeight;
        } else {
            items.forEach((item, index) => {
                // Cek apakah perlu halaman baru
                if (y + rowHeight > pageHeight - 20) {
                    // Footer halaman
                    doc.setFontSize(7);
                    doc.setTextColor(...colors.textMuted);
                    doc.text(
                        `Halaman ${doc.getNumberOfPages()}`,
                        pageWidth / 2,
                        pageHeight - 10,
                        { align: "center" }
                    );

                    doc.addPage();
                    drawPageBg();
                    y = margin;
                    y = drawTableHeader(y);
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(8);
                }

                // Alternating row color
                if (index % 2 === 0) {
                    doc.setFillColor(...colors.bgLight);
                } else {
                    doc.setFillColor(...colors.bgDark);
                }
                doc.rect(tableStartX, y, tableWidth, rowHeight, "F");

                // Border bawah row
                doc.setDrawColor(...colors.border);
                doc.setLineWidth(0.2);
                doc.line(tableStartX, y + rowHeight, tableStartX + tableWidth, y + rowHeight);

                // Isi data per kolom
                doc.setTextColor(...colors.textPrimary);
                let x = tableStartX;
                const rowData = [
                    String(index + 1),
                    item.barcode || "-",
                    item.title || "-",
                    item.quantity != null ? String(item.quantity) : "-",
                    item.update || "-",
                    item.status || "-",
                ];

                rowData.forEach((text, i) => {
                    // Truncate text jika terlalu panjang
                    const maxWidth = colWidths[i] - 4;
                    let displayText = text;
                    while (doc.getTextWidth(displayText) > maxWidth && displayText.length > 1) {
                        displayText = displayText.slice(0, -1);
                    }
                    if (displayText !== text) {
                        displayText = displayText.slice(0, -2) + "..";
                    }
                    doc.text(displayText, x + 2, y + 5.5);
                    x += colWidths[i];
                });

                y += rowHeight;
            });
        }

        // Border luar tabel
        const tableEndY = y;
        const tableStartY = tableEndY - (items.length > 0 ? items.length * rowHeight + rowHeight : rowHeight + rowHeight);
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.3);

        // Garis vertikal kolom
        let colX = tableStartX;
        colWidths.forEach((w) => {
            doc.line(colX, tableStartY > margin + 40 ? margin + 40 : tableStartY, colX, tableEndY);
            colX += w;
        });
        doc.line(colX, tableStartY > margin + 40 ? margin + 40 : tableStartY, colX, tableEndY);

        // === SUMMARY FOOTER ===
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...colors.accent);
        doc.text(`Total Item: ${items.length}`, margin, y);

        // Footer halaman terakhir
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...colors.textMuted);
        doc.text(
            `Halaman ${doc.getNumberOfPages()}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
        );

        doc.save("laporan-slow-moving.pdf");
    };

    return (
        <button
            onClick={handleDownload}
            className="laporanDownloadBtn"
        >
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
            >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
        </button>
    );
}