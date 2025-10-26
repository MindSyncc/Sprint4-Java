// Importar serviços necessários
import { AuthService } from "../modules/auth-service.js"
import { UIService } from "../modules/ui-service.js"
import { ApiService } from "../modules/api-service.js"
import { InsumoService } from "../services/insumo-service.js"

document.addEventListener("DOMContentLoaded", async () => {

  // Autenticação/permissão (existência verificada)
  if (AuthService && typeof AuthService.checkAuthentication === "function") {
    AuthService.checkAuthentication()
  }
  if (AuthService && typeof AuthService.hasPermission === "function") {
    if (!AuthService.hasPermission("Almoxarife")) {
      window.location.href = "../dashboard.html"
      return
    }
  }

  if (UIService && typeof UIService.renderUserInfo === "function") {
    UIService.renderUserInfo(AuthService)
  }

  const form = document.getElementById("form-novo-insumo")
  if (!form) return

  // Carrega as categorias
  await loadCategorias()

  const params = new URLSearchParams(window.location.search)
  const insumoId = params.get("id")
  const editMode = Boolean(insumoId)
  let insumo = {}

  console.log(editMode ? "Modo de edição" : "Modo de criação")

  const submitButton = form.querySelector('button[type="submit"]')

  if (editMode) {
    try {
      insumo = await ApiService.getInsumoById(insumoId)

      if (insumo) {
        if (document.getElementById("nome")) document.getElementById("nome").value = insumo.nome || ""
        if (document.getElementById("lote")) document.getElementById("lote").value = insumo.lote || ""
        if (document.getElementById("dataValidade") && insumo.dataValidade) document.getElementById("dataValidade").value = insumo.dataValidade.slice(0,10)
        if (document.getElementById("unidadeMedida")) document.getElementById("unidadeMedida").value = insumo.unidadeMedida || ""
        if (document.getElementById("quantidade")) document.getElementById("quantidade").value = insumo.quantidade ?? ""
        if (document.getElementById("descricao")) document.getElementById("descricao").value = insumo.descricao || ""
        if (document.getElementById("categoria")) {
          const catId = insumo.categoria?.idCategoria || insumo.idCategoria
          if (catId) document.getElementById("categoria").value = String(catId)
        }
      }

      console.log("Insumo carregado para edição:", insumo)

      // Muda o texto do botão de submit
      if (submitButton) submitButton.textContent = "Salvar Alterações"
    } catch (err) {
      console.error("Erro ao carregar insumo para edição:", err)
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log("Formulário submetido")

    // Leitura dos campos do formulário
    const payload = {
      nome: document.getElementById("nome")?.value || "",
      lote: document.getElementById("lote")?.value || "",
      dataValidade: document.getElementById("dataValidade")?.value || "",
      unidadeMedida: document.getElementById("unidadeMedida")?.value || "",
      quantidade: document.getElementById("quantidade")?.value || "",
      descricao: document.getElementById("descricao")?.value || "",
      idCategoria: document.getElementById("categoria")?.value || "",
      codigoDeBarras: insumo.codigoDeBarras || ""
    }

    console.log("Payload do formulário:", payload)

    try {
      if (editMode) {
        console.log("Modo de atualização com insumo ID:", insumoId)
        await InsumoService.handleUpdateInsumo(insumoId, payload)

      } else {
        console.log("Modo de criação de novo insumo")
        await InsumoService.handleCreateInsumo(payload)
      }

    } catch (err) {
      console.error("Erro ao salvar insumo:", err)
      // mostrar alerta se UIService disponível
      const alertContainer = document.getElementById("alertContainer")
      UIService.showAlert(alertContainer, "Erro ao salvar insumo: " + (err), "danger")
    }
  })
})

async function loadCategorias() {
  try {
    const categorias = await ApiService.getCategorias()
    const selectCategoria = document.getElementById("categoria")
    if (!selectCategoria) return

    selectCategoria.innerHTML = `<option value="">Selecione uma categoria</option>`
    categorias.forEach((categoria) => {
      const option = document.createElement("option")
      option.textContent = `${categoria.idCategoria} - ${categoria.tipoCategoria}`
      option.value = categoria.idCategoria
      selectCategoria.appendChild(option)
    })
  } catch (error) {
    console.error("Erro ao carregar categorias:", error)
  }
}
