// Renderizador de Gráficos
class ChartRenderer {
  static renderBarChart(elementId, data, title) {
    const canvas = document.getElementById(elementId)
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const maxValue = Math.max(...data.map((d) => d.value))
    const barWidth = canvas.width / data.length
    const padding = 40

    // Limpar canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Desenhar eixos
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Desenhar barras
    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * (canvas.height - 2 * padding) || 0
      const x = padding + index * barWidth + barWidth / 4
      const y = canvas.height - padding - barHeight

      ctx.fillStyle = "#0052cc"
      ctx.fillRect(x, y, barWidth / 2, barHeight)

      // Label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.label, x + barWidth / 4, canvas.height - padding + 20)
      ctx.fillText(item.value, x + barWidth / 4, y - 10)
    })
  }

  static renderPieChart(elementId, data, title) {
    const canvas = document.getElementById(elementId)
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    let currentAngle = -Math.PI / 2
    const total = data.reduce((sum, item) => sum + item.value, 0)

    const colors = ["#0052cc", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"]

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI

      // Desenhar fatia
      ctx.fillStyle = colors[index % colors.length]
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Label
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

      ctx.fillStyle = "white"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY)

      currentAngle += sliceAngle
    })
  }
}
