// Gerenciador de Exportação
class ExportManager {
  static exportToCSV(data, filename = "export.csv") {
    const csv = this.convertToCSV(data)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  static convertToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) return ""

    const headers = Object.keys(data[0])
    const csv = [headers.join(",")]

    data.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header]
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value
      })
      csv.push(values.join(","))
    })

    return csv.join("\n")
  }

  static exportToPDF(title, content) {
    // Implementação básica - pode ser expandida com biblioteca como jsPDF
    const printWindow = window.open("", "", "height=400,width=600")
    printWindow.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #0052cc; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f3f4f6; }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${content}
                </body>
            </html>
        `)
    printWindow.document.close()
    printWindow.print()
  }

  static exportToJSON(data, filename = "export.json") {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
