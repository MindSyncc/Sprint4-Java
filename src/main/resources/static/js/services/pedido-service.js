class PedidoService {
  static async handleCreatePedido(event) {
    event.preventDefault()

    const alertContainer = document.getElementById("alertContainer")
    const form = event.target

    try {
      const data = {
        fornecedorId: document.getElementById("fornecedor").value,
        dataEntregaEsperada: document.getElementById("dataEntrega").value,
        observacoes: document.getElementById("observacoes").value || null,
        itens: this.getItensPedido(),
      }

      const response = await window.apiService.createPedido(data)

      window.UIService.showAlert(alertContainer, "Pedido criado com sucesso!", "success")
      form.reset()

      setTimeout(() => {
        window.location.href = "listar.html"
      }, 2000)
    } catch (error) {
      window.UIService.showAlert(alertContainer, "Erro ao criar pedido: " + error.message, "danger")
    }
  }

  static getItensPedido() {
    // Implementar lógica para obter itens do pedido
    return []
  }

  static async loadPedidos() {
    try {
      const pedidos = await window.apiService.getPedidos()
      return pedidos
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error)
      return []
    }
  }

  static renderPedidoRow(pedido) {
    return `
      <tr>
        <td>${pedido.id}</td>
        <td>${window.UIService.formatDate(pedido.dataPedido)}</td>
        <td>${pedido.fornecedor || "-"}</td>
        <td><span class="badge badge-${this.getStatusClass(pedido.status)}">${pedido.status}</span></td>
        <td>${pedido.totalItens || 0}</td>
        <td>
          <a href="detalhe.html?id=${pedido.id}" class="btn btn-primary btn-small">Visualizar</a>
        </td>
      </tr>
    `
  }

  static getStatusClass(status) {
    const statusMap = {
      Pendente: "warning",
      "Em Processamento": "info",
      Entregue: "success",
      Cancelado: "danger",
    }
    return statusMap[status] || "secondary"
  }
}
