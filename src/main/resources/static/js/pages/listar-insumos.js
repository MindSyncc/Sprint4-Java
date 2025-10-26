// Importar os serviços necessários
import { AuthService } from "../modules/auth-service.js"
import { UIService } from "../modules/ui-service.js"
import { InsumoService } from "../services/insumo-service.js"

document.addEventListener("DOMContentLoaded", async () => {
  // Verificar autenticação
  AuthService.checkAuthentication()

  // Verificar permissão
  if (!AuthService.hasPermission("Almoxarife")) {
    window.location.href = "../dashboard.html"
    return
  }

  // Renderizar informações do usuário
  UIService.renderUserInfo(AuthService)

  // Carregar insumos
  await loadInsumos()
})

async function loadInsumos() {
  const tbody = document.getElementById("tbody-insumos")

  try {
    const insumos = await InsumoService.loadInsumos()

    tbody.innerHTML = "" // limpa a tabela

    insumos.forEach(insumo => {
      const row = document.createElement("tr")
      row.className = "linha-insumos";

      // usa um identificador
      const identifier = insumo.idInsumo

      row.innerHTML = `
        <td>${insumo.codigoDeBarras}</td>
        <td>${insumo.nome}</td>
        <td>${insumo.categoria?.tipoCategoria || "—"}</td>
        <td>${insumo.lote}</td>
        <td>${insumo.dataValidade || "—"}</td>
        <td>${insumo.unidadeMedida || "—"}</td>
        <td><a href="form.html?id=${identifier}" class="btn btn-primary btn-small">Editar</a></td>
      `
      tbody.appendChild(row)
    })
  } catch (error) {
    console.error("Erro ao carregar insumos:", error)
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Erro ao carregar</td></tr>`
  }
}

