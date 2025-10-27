import { PedidoService } from "../services/pedido-service.js";
import { AuthService } from "../modules/auth-service.js";

const idUsuarioAtual = AuthService.getCurrentUser().id;

document.addEventListener("DOMContentLoaded", async () => {
  carregarPedidos();
});

let pedidos = {};

async function carregarPedidos() {
    try {
        pedidos = await PedidoService.loadPedidos(idUsuarioAtual);
        console.log("Pedidos carregados:", pedidos);
    } catch {
        console.error("Erro ao carregar insumos:", error)
    }
    
  renderizarPedidos(pedidos);
}

function renderizarPedidos(pedidos) {
  const tbody = document.getElementById("tbody-pedidos");
  document.getElementById("total-pedidos").textContent = pedidos.length;

  if (pedidos.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="7" style="text-align: center; padding: 30px;">Nenhum pedido realizado</td></tr>';
    return;
  }

  tbody.innerHTML = pedidos
    .map(
      (pedido) => `
                <tr>
                    <td>#${pedido.idPedido}</td>
                    <td>${pedido.nomeItem}</td>
                    <td>${pedido.quantidade}</td>
                    <td>${pedido.fornecedor.nomeFornecedor}</td>
                    <td>${new Date(pedido.dataPedido).toLocaleDateString(
                      "pt-BR"
                    )}</td>
                    <td><span class="badge badge-${
                      pedido.status === "Pendente" ? "warning" : "success"
                    }">${pedido.status}</span></td>
                </tr>
            `
    )
    .join("");
}
