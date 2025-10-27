export class ApiService {

  static baseURL = "http://localhost:8080/api";

  // Método genérico para requisições
  static async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("[API Error]", error)
      throw error
    }
  }

  // ===== AUTENTICAÇÃO =====
  static async login(funcional, senhaHash) {
    return this.request("/funcionarios/login", {
      method: "POST",
      body: JSON.stringify({ funcional, senhaHash }),
    })
  }

  // ===== INSUMOS =====
  static async getInsumos() {
    return this.request("/insumos")
  }

  static async getInsumoById(id) {
    return this.request(`/insumos/${id}`)
  }

  static async createInsumo(data) {
    return this.request("/insumos", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async updateInsumo(id, data) {
    return this.request(`/insumos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  static async deleteInsumo(id) {
    return this.request(`/insumos/${id}`, {
      method: "DELETE",
    })
  }

  // ===== CATEGORIAS =====
  static async getCategorias() {
    return this.request("/categorias")
  }

  // ===== ESTOQUE =====
  static async getEstoque(estoqueId) {
    return this.request(`/estoque/${estoqueId}`)
  }

  static async getEstoques() {
    return this.request("/estoque")
  }

  // ===== ESTOQUE_INSUMO =====
  static async getEstoqueInsumo(insumoId) {
    return this.request(`/estoque-insumo/estoque/insumo/${insumoId}`)
  }

  static async createEstoqueInsumo(estoqueId, insumoId, quantidade) {
    return this.request(`/estoque-insumo/novo/${estoqueId}/${insumoId}`, {
      method: "POST",
      body: JSON.stringify(quantidade)
    })
  }

  static async updateEstoqueInsumo(estoqueId, insumoId, quantidade) {
    return this.request(`/estoque-insumo/atualizar/${estoqueId}/${insumoId}`, {
      method: "PUT",
      body: JSON.stringify(quantidade)
    })
  }

  static async getEstoqueInsumos() {
    return this.request(`/estoque-insumo/estoque-insumos`)
  }

  // ===== PEDIDOS =====
  static async getPedidos() {
    return this.request("/pedidos")
  }

  static async getPedidoById(id) {
    return this.request(`/pedidos/${id}`)
  }

  static async createPedido(data) {
    return this.request("/pedidos", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async updatePedido(id, data) {
    return this.request(`/pedidos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // ===== MOVIMENTAÇÕES =====
  static async createMovimentacao(data) {
    return this.request("/movimentacao", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  static async getMovimentacoes() {
    return this.request("/movimentacao")
  }

  // ===== FORNECEDORES =====
  static async getFornecedores() {
    return this.request("/fornecedor")
  }

  static async getFornecedorById(id) {
    return this.request(`/fornecedor/${id}`)
  }
}

window.apiService = new ApiService()
