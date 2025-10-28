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
      }, 3000)

    } catch (error) {
      window.UIService.showAlert(alertContainer, "Erro ao criar pedido: " + error.message, "danger")
    }
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

  static async loadPedidosAnalistaCorporativo() {
    try {
      const pedidos = await ApiService.getPedidos();

      return pedidos;

    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      
      return [];
    }
  }

  static async atenderPedido(pedido) {
    const idPedido = pedido.idPedido
    try {
      const data = {
        nomeItem: pedido.nomeItem,
        quantidade: pedido.quantidade,
        status: "Atendido",
        dataPedido: pedido.dataPedido,
        idFuncionario: pedido.funcionario.id,
        idFornecedor: pedido.fornecedor.idFornecedor
      }

      const response = await ApiService.updatePedido(idPedido, data)
      window.UIService.showAlert(alertContainer, "Pedido atendido com sucesso!", "success")
      console.log("Pedido atendido com sucesso!", response)
    } catch (error) {
      window.UIService.showAlert(alertContainer, "Erro ao atender pedido: " + error.message, "danger")
    }
  }
}
