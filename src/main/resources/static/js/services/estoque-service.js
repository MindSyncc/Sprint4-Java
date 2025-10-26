// Import necessary services
const apiService = require("./api-service")
const UIService = require("./ui-service")

class EstoqueService {
  static async loadEstoque() {
    try {
      const estoque = await apiService.getEstoque()
      return estoque
    } catch (error) {
      console.error("Erro ao carregar estoque:", error)
      return []
    }
  }

  static async updateQuantidade(insumoId, novaQuantidade) {
    try {
      const response = await apiService.updateEstoqueInsumo(insumoId, novaQuantidade)
      return response
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
      throw error
    }
  }

  static async handleRetirada(event) {
    event.preventDefault()

    const alertContainer = document.getElementById("alertContainer")
    const insumoId = document.getElementById("insumo").value
    const quantidade = Number.parseInt(document.getElementById("quantidade").value)

    try {
      const data = {
        tipo: "SAIDA",
        insumoId: insumoId,
        quantidade: quantidade,
        motivo: document.getElementById("motivo").value,
        data: new Date().toISOString(),
      }

      await apiService.createMovimentacao(data)

      UIService.showAlert(alertContainer, "Movimentação registrada com sucesso!", "success")
      event.target.reset()

      setTimeout(() => {
        location.reload()
      }, 1500)
    } catch (error) {
      UIService.showAlert(alertContainer, "Erro ao registrar movimentação: " + error.message, "danger")
    }
  }

  static renderEstoqueRow(item) {
    return `
      <tr>
        <td>${item.codigoDeBarras || "-"}</td>
        <td>${item.nome}</td>
        <td>${item.categoria || "-"}</td>
        <td>${item.quantidade}</td>
        <td>${item.unidadeMedida}</td>
        <td>${UIService.formatDate(item.dataValidade)}</td>
        <td>
          <button onclick="EstoqueService.openRetiradaModal(${item.id})" class="btn btn-danger btn-small">Retirar</button>
        </td>
      </tr>
    `
  }

  static openRetiradaModal(insumoId) {
    // Implementar modal de retirada
    console.log("Abrir modal para insumo:", insumoId)
  }
}
