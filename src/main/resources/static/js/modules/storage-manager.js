// Gerenciador de Armazenamento Local
class StorageManager {
  static saveInsumos(insumos) {
    localStorage.setItem("insumos", JSON.stringify(insumos))
  }

  static getInsumos() {
    const data = localStorage.getItem("insumos")
    return data ? JSON.parse(data) : []
  }

  static savePedidos(pedidos) {
    localStorage.setItem("pedidos", JSON.stringify(pedidos))
  }

  static getPedidos() {
    const data = localStorage.getItem("pedidos")
    return data ? JSON.parse(data) : []
  }

  static clearAll() {
    localStorage.removeItem("insumos")
    localStorage.removeItem("pedidos")
    localStorage.removeItem("currentUser")
  }
}
