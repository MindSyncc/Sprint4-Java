import { AuthService } from "../modules/auth-service.js";
import { InsumoService } from "../services/insumo-service.js";

document.addEventListener("DOMContentLoaded", async () => {
  await carregarEstoqueUnidade(1); // unidade fixa ID = 1
});

async function carregarEstoqueUnidade() {
  try {
    const estoqueInsumos = await InsumoService.loadEstoqueInsumos();
    const filtrados = estoqueInsumos.filter(
      (item) => item.estoque?.idEstoque === 1 // MOCK
    );
    renderizarEstoque(filtrados);
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
  }
}

function renderizarEstoque(estoques) {
  const tbody = document.getElementById("tbody-estoque");

  if (!estoques || estoques.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align: center; padding: 30px;">Nenhum insumo encontrado</td></tr>';
    return;
  }

  tbody.innerHTML = estoques
    .map((item) => {
      const nomeInsumo = item.insumo.nome;
      const categoria = item.insumo.categoria?.tipoCategoria || "-";
      const qtd = item.quantidade;
      const unidadeMedida = item.insumo.unidadeMedida || "-";
      const status = item.estoque?.status || "-";

      const statusClass =
        status === "Disponível"
          ? "success"
          : status === "Baixo"
          ? "warning"
          : "danger";

      return `
        <tr>
          <td>${nomeInsumo}</td>
          <td>${categoria}</td>
          <td><strong>${qtd}</strong></td>
          <td>${unidadeMedida}</td>
          <td><span class="badge badge-${statusClass}">${status}</span></td>
        </tr>
      `;
    })
    .join("");
}
