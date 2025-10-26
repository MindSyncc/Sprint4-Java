// Gerenciador de Pedidos
class PedidoManager {
  constructor(apiService) {
    this.apiService = apiService
    this.pedidos = []
    this.fornecedores = []
  }

  async loadPedidos() {
    try {
      this.pedidos = await this.apiService.getPedidos()
      return this.pedidos
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error)
      return []
    }
  }

  async createPedido(data) {
    try {
      const novoPedido = await this.apiService.createPedido(data)
      this.pedidos.push(novoPedido)
      return novoPedido
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
      throw error
    }
  }

  async updatePedido(id, data) {
    try {
      const pedidoAtualizado = await this.apiService.updatePedido(id, data)
      const index = this.pedidos.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pedidos[index] = pedidoAtualizado
      }
      return pedidoAtualizado
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error)
      throw error
    }
  }

  getPedidosPorStatus(status) {
    return this.pedidos.filter((p) => p.status === status)
  }

  getPedidosAbertos() {
    return this.getPedidosPorStatus("aberto")
  }

  getPedidosPendentes() {
    return this.getPedidosPorStatus("pendente")
  }

  getPedidosEntregues() {
    return this.getPedidosPorStatus("entregue")
  }
}
