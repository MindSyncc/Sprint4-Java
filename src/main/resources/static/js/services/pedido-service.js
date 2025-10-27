import { ApiService } from "../modules/api-service.js"
import { AuthService } from "../modules/auth-service.js"

export class PedidoService {
  
  static async handleCreatePedido() {
    const alertContainer = document.getElementById("alertContainer")
    const form = document.getElementById("form-novo-pedido")

    // Leitura dos campos do formulário
    const funcionarioId = AuthService.getCurrentUser().id
    const fornecedorId = document.getElementById("fornecedor").value
    const insumoNome = document.getElementById("insumo").selectedOptions[0].textContent
    const quantidade = parseInt(document.getElementById("quantidade").value, 10)

    try {
      const data = {
        nomeItem: insumoNome,
        quantidade: quantidade,
        status: "Pendente",
        dataPedido: new Date().toISOString(),
        idFuncionario: Number(funcionarioId),
        idFornecedor: Number(fornecedorId)
      }

      const response = await ApiService.createPedido(data)

      window.UIService.showAlert(alertContainer, "Pedido criado com sucesso!", "success")
      console.log("Pedido criado com sucesso!", response)
      form.reset()

      setTimeout(() => {
        window.location.href = "listar.html"
      }, 5000)

    } catch (error) {
      window.UIService.showAlert(alertContainer, "Erro ao criar pedido: " + error.message, "danger")
    }
  }

  static getItensPedido() {
    // Implementar lógica para obter itens do pedido
    return []
  }

  static async loadPedidos(idUsuario) {
  try {
    const pedidos = await ApiService.getPedidos();
    const pedidosUsuario = pedidos.filter(
      (pedido) => pedido.funcionario.id === idUsuario
    );

    return pedidosUsuario;

  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    
    return [];
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
