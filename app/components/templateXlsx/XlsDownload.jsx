import * as XLSX from "xlsx";

function XlsDownload() {
  const data = [
    {
      sku: "001",
      barang: "kemeja",
      qty: 200,
    },
    {
      sku: "002",
      barang: "celana",
      qty: 200,
    },
    {
      sku: "003",
      barang: "dasi",
      qty: 200,
    },
  ];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "nama barang");

    XLSX.writeFile(workbook, "laporan.xlsx");
  };
  return <button onClick={downloadExcel}>klik untuk download</button>;
}

export default XlsDownload;
