// listar-unidades.js

import { ApiService } from "../modules/api-service.js";
import { AuthService } from "../modules/auth-service.js";
import { UIService } from "../modules/ui-service.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Verificar autenticação
  AuthService.checkAuthentication();

  // Verificar permissão
  if (!AuthService.hasPermission("Analista Corporativo")) {
    window.location.href = "../dashboard.html";
    return;
  }

  // Renderizar informações do usuário
  UIService.renderUserInfo(AuthService);

  // Carregar unidades
  await loadUnidades();
});

async function loadUnidades() {
  const tbody = document.getElementById("tbody-unidades");

  try {
    const unidades = await ApiService.getUnidades;
    console.log("Lista de unidades: ", unidades)

    // Limpa a tabela antes de preencher
    tbody.innerHTML = "";

    if (!unidades || unidades.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:30px;">Nenhuma unidade cadastrada</td>
        </tr>
      `;
      return;
    }

    unidades.forEach((unidade) => {
      const row = document.createElement("tr");
      row.className = "linha-unidades";

      row.innerHTML = `
        <td>${unidade.idUnidade}</td>
        <td>${unidade.nomeUnidade}</td>
        <td>${unidade.rua}</td>
        <td>${unidade.numero}</td>
        <td>${unidade.bairro}</td>
        <td>${unidade.cidade}</td>
        <td>${unidade.estado}</td>
        <td>${unidade.cep}</td>
        <td>
          <a href="form-unidade.html?id=${unidade.idUnidade}" class="btn btn-primary btn-small">Editar</a>
        </td>
      `;

      tbody.appendChild(row);
    });

    // Atualiza o total
    document.getElementById("total-unidades").textContent = unidades.length;

  } catch (error) {
    console.error("Erro ao carregar unidades:", error);
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center;">Erro ao carregar unidades</td>
      </tr>
    `;
  }
}
