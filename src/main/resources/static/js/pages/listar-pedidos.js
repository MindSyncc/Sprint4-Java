import { PedidoService } from "../services/pedido-service.js";
import { AuthService } from "../modules/auth-service.js";

const idUsuarioAtual = AuthService.getCurrentUser().id;
let userRole = AuthService.getUserRole();
console.log("Usuário atual: ", idUsuarioAtual)

document.addEventListener("DOMContentLoaded", async () => {
  carregarPedidos();
});

let pedidos = {};

async function carregarPedidos() {
    try {
        if (userRole == "Analista Local")
        {
          pedidos = await PedidoService.loadPedidos(idUsuarioAtual);
        } else if (userRole == "Analista Corporativo"){

          const tabelaAcao = document.getElementById("linha-pedidos")
          const th = document.createElement("th")
          th.textContent = "Ação"
          tabelaAcao.appendChild(th)
          pedidos = await PedidoService.loadPedidosAnalistaCorporativo();
        }
        
        console.log("Pedidos carregados:", pedidos);
    } catch (error) {
        console.error("Erro ao carregar pedidos:", error)
    }
    
  renderizarPedidos(pedidos);
}

function renderizarPedidos(pedidos) {
  const tbody = document.getElementById("tbody-pedidos");
  console.log("User Role: ", userRole)
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
                    ${
                      userRole === "Analista Corporativo"
                        ? `<td><button class="btn btn-small btn-atender" data-id="${pedido.idPedido}">Atender</button></td>`
                        : ""
                    }
                </tr>
            `
    )
    .join("");

  // Seção para renderizado da lista para o ANALISTA CORPORATIVO
  if (userRole = "Analista Corporativo") {
    document.querySelectorAll(".btn-atender").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const pedidoId = e.target.dataset.id;
        console.log("Pedido escolhido para abertura do modal: ", pedidoId)
        const pedido = pedidos.find((pedido) => pedido.idPedido == pedidoId);
        console.log("Pedido a ser aberto no modal: ", pedido)
        abrirModalPedido(pedido);
      });
    });
  }
}

function abrirModalPedido(pedido) {
  const modal = document.getElementById("pedidoModal");
  modal.style.display = "flex";

  document.getElementById("modal-id").textContent = pedido.idPedido;
  document.getElementById("modal-item").textContent = pedido.nomeItem;
  document.getElementById("modal-quantidade").textContent = pedido.quantidade;
  document.getElementById("modal-fornecedor").textContent = pedido.fornecedor.nomeFornecedor;
  document.getElementById("modal-status").textContent = pedido.status;
  document.getElementById("modal-data").textContent = new Date(pedido.dataPedido).toLocaleDateString("pt-BR");

  const btnAtender = document.getElementById("btnAtender");
  btnAtender.onclick = () => atenderPedido(pedido);

  document.getElementById("fecharModal").onclick = fecharModal;
}

function fecharModal() {
  document.getElementById("pedidoModal").style.display = "none";
}

async function atenderPedido(pedido) {
  try {
    await PedidoService.atenderPedido(pedido);
    setTimeout([], 3000);
    fecharModal();
    carregarPedidos();
  } catch (error) {
    console.error("Erro ao atender Pedido", error);
  }
}
