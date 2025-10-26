// Importar os serviços necessários
import { AuthService } from "../modules/auth-service.js"
import { UIService } from "../modules/ui-service.js"
import { InsumoService } from "../services/insumo-service.js"
import { Validator } from "../modules/validators.js"

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

  // identifica o formulário
  const form = document.getElementById("form-consumo-insumo")

  // Carregar insumos disponíveis
  const estoqueInsumos = await InsumoService.loadEstoqueInsumos()
  const selectInsumo = document.getElementById("insumoSelect")
  const selectMotivo = document.getElementById("motivoConsumoSelect")

  // Popular o select com os insumos disponíveis
  estoqueInsumos.forEach(estoqueInsumo => {

    const nomeInsumo = estoqueInsumo.insumo.nome
    const quantidadeInsumo = estoqueInsumo.quantidade

    const option = document.createElement("option")
    option.value = estoqueInsumo.insumo.idInsumo
    option.textContent = `${nomeInsumo} (Disponível: ${quantidadeInsumo})`
    selectInsumo.appendChild(option)
  })

  // Popula o campo de quantidade disponível ao selecionar um insumo
  const quantidadeDisponivelInput = document.getElementById("quantidadeDisponivelInput")

  let estoqueInsumo = {}

  // Escuta pela mudança na seleção do insumo
  selectInsumo.addEventListener("change", (event) => {
    const insumoId = event.target.value
    estoqueInsumo = estoqueInsumos.find(estoqueInsumo => estoqueInsumo.insumo.idInsumo == insumoId)
    console.log("Registro de estoqueInsumo selecionado:", estoqueInsumo)

    if (estoqueInsumo) {
      quantidadeDisponivelInput.value = estoqueInsumo.quantidade
    } else {
      quantidadeDisponivelInput.value = 0
    }
  })

  let motivoSelecionado = null

  // Escuta pela mudança na seleção do motivo de consumo
  selectMotivo.addEventListener("change", (event) => {
    motivoSelecionado = event.target.value
    console.log("Motivo de consumo selecionado:", motivoSelecionado)
  })

  // Adiciona o listener para o submit do formulário
  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    // recupera os parâmetros preenchidos no formulário
    const quantidadePreenchida = Number.parseInt(document.getElementById("quantidadeConsumir").value)
    const quantidade = estoqueInsumo.quantidade - quantidadePreenchida // cálculo de quantidade
    const motivo = motivoSelecionado
    const idFuncionario = AuthService.getCurrentUser().id

    console.log("Formulário de consumo submetido com:", { quantidade, motivo, idFuncionario })



    await confirmarConsumo(estoqueInsumo, quantidade, motivo, idFuncionario)
  })
});

async function confirmarConsumo(estoqueInsumo, quantidade, motivo, idFuncionario) {
  const idEstoque = estoqueInsumo.id.estoqueId
  const idInsumo = estoqueInsumo.id.insumoId

  const alertContainer = document.getElementById("alertContainer")
  

  if (!Validator.validarQuantidadeParaRetirada(quantidade, estoqueInsumo.quantidade)) {
    UIService.showAlert(alertContainer, "A quantidade desejada sobrepassa a quantidade atual", "danger")
    return
    }

  if (!motivo.trim()) {
    UIService.showAlert(alertContainer, "Por favor, informe o motivo do consumo", "error")
    return
  }

  try {
    // Chamar serviço para consumir insumo
    console.log("Consumindo insumo com os dados:", { idEstoque, idInsumo, quantidade, motivo, idFuncionario })
    await InsumoService.consumirInsumo(idEstoque, idInsumo, quantidade, motivo, idFuncionario)
    
    UIService.showAlert(alertContainer, "Insumo consumido com sucesso!", "success")

    // Redireciona para o mesmo formulário após 5 segundos
    setTimeout(() => {
    window.location.href = "retirar.html"
    }, 5000)

  } catch (error) {
    console.error("Erro ao consumir insumo:", error)
    UIService.showAlert(alertContainer, "Erro ao consumir insumo", "error")
  }
}
