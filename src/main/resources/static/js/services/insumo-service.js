// insumo-service.js
import { ApiService } from "../modules/api-service.js"
import { AuthService } from "../modules/auth-service.js"
import { UIService } from "../modules/ui-service.js"
import { Validator } from "../modules/validators.js"

export class InsumoService {

  // Lida com o submit do formulário para criar um novo insumo
  static async handleCreateInsumo(payload) {

    const form = document.getElementById("form-novo-insumo")
    const alertContainer = document.getElementById("alertContainer")

    // Validar data de vencimento
    if (!Validator.validarDataFutura(payload.dataValidade)) {
    UIService.showAlert(alertContainer, "Data de vencimento deve ser no futuro", "danger")
    return
    }

    // Validar quantidade inicial
    if (!Validator.validarQuantidade(Number(payload.quantidade || 0))) {
    UIService.showAlert(alertContainer, "A quantidade inicial deve ser maior que 0", "danger")
    return
    }

    // Validar categoria selecionada
    if (!Validator.validarCategoria(Number(payload.idCategoria))) {
    UIService.showAlert(alertContainer, "Selecione uma categoria válida", "danger")
    return
    }

    console.log("Validações concluídas")

    let codigoDeBarras = `INS${Date.now()}${Math.floor(Math.random() * 1000)}`

    try {
      const data = {
        nome: payload.nome,
        lote: payload.lote,
        dataValidade: payload.dataValidade,
        unidadeMedida: payload.unidadeMedida,
        codigoDeBarras,
        idCategoria: Number(payload.idCategoria)
      }

      // Cria o registro do insumo
      const response = await ApiService.createInsumo(data)
      console.log("Insumo criado:", response)

      const insumoCriado = response;
      
      UIService.showAlert(alertContainer, "Insumo adicionado com sucesso!", "success")
      console.log("Insumo adicionado com sucesso")

      // Cria o registro do vínculo entre insumo e estoque para armazenar a quantidade
      await ApiService.createEstoqueInsumo(1, insumoCriado.idInsumo, { quantidade: Number(payload.quantidade) })

      // Reseta os valores do formulário
      form.reset()

    } catch (error) {
      UIService.showAlert(alertContainer, "Erro ao adicionar insumo: " + error.message, "danger")
      console.error("Erro ao criar insumo:", error)
    }
  }



  // ATUALIZA UM INSUMO EXISTENTE

  static async handleUpdateInsumo(insumoId, payload) {
    const alertContainer = document.getElementById("alertContainer")

    // Validações mínimas (reaproveita validadores)
    if (!Validator.validarDataFutura(payload.dataValidade)) {
      UIService.showAlert(alertContainer, "Data de vencimento deve ser no futuro", "danger")
      return
    }

    if (!Validator.validarQuantidade(Number(payload.quantidade || 0))) {
      UIService.showAlert(alertContainer, "A quantidade deve ser maior que 0", "danger")
      return
    }

    if (!Validator.validarCategoria(Number(payload.idCategoria))) {
      UIService.showAlert(alertContainer, "Selecione uma categoria válida", "danger")
      return
    }

    console.log("Validações concluídas")

    try {
      await ApiService.updateInsumo(insumoId, {
      nome: payload.nome,
      lote: payload.lote,
      dataValidade: payload.dataValidade,
      unidadeMedida: payload.unidadeMedida,
      codigoDeBarras: payload.codigoDeBarras,
      idCategoria: Number(payload.idCategoria)
      })

      UIService.showAlert(alertContainer, "Insumo atualizado com sucesso!", "success")
      console.log("Insumo atualizado com sucesso")

      // Atualiza o registro do vínculo entre insumo e estoque para armazenar a quantidade
      await ApiService.updateEstoqueInsumo(
        1,
        insumoId,
        { quantidade: Number(payload.quantidade) })

      // Redireciona para a lista de insumos após 5 segundos
      setTimeout(() => {
        window.location.href = "listar.html"
      }, 5000)

    } catch (error) {
      UIService.showAlert(alertContainer, "Erro ao atualizar insumo: " + (error.message || error), "danger")
      console.error("Erro ao atualizar insumo:", error)
      throw error
    }
  }

  // Carrega todos os insumos
  static async loadInsumos() {
    try {
      const insumos = await ApiService.getInsumos()
      console.log("Insumos carregados:", insumos)
      return insumos
    } catch (error) {
      console.error("Erro ao carregar insumos:", error)
      return []
    }
  }

  // Carrega o estoque de insumos com as quantidades
  static async loadEstoqueInsumos() {
    try {
      const estoqueInsumos = await ApiService.getEstoqueInsumos()
      console.log("Estoque de insumos carregado:", estoqueInsumos)
      return estoqueInsumos
    } catch (error) {
      console.error("Erro ao carregar estoque de insumos:", error)
      return []
    }
  }
    
  // Deleta um insumo
  static async deleteInsumo(id) {
    if (!confirm("Tem certeza que deseja deletar este insumo?")) return

    const alertContainer = document.getElementById("alertContainer")
    try {
      await ApiService.deleteInsumo(id)
      UIService.showAlert(alertContainer, "Insumo deletado com sucesso!", "success")
      setTimeout(() => location.reload(), 1500)
    } catch (error) {
      UIService.showAlert(alertContainer, "Erro ao deletar insumo: " + error.message, "danger")
    }
  }

  // Registra o consumo de um insumo no estoque
  static async consumirInsumo(idInsumo, idEstoque, quantidade, motivo, idFuncionario) {
    const alertContainer = document.getElementById("alertContainer")

    try {
      await ApiService.updateEstoqueInsumo(
        idInsumo,
        idEstoque,
        { quantidade }
      )

      await ApiService.createMovimentacao({
        dataHoraEntrada: null,
        dataHoraSaida: new Date().toISOString(),
        tipoMovimentacao: "Saída",
        quantidade: quantidade,
        motivo: motivo,
        idFuncionario: idFuncionario
      })

      UIService.showAlert(alertContainer, "Insumo retirado com sucesso!", "success")
      console.log("Consumo de insumo registrado com sucesso")

    } catch (error) {
      UIService.showAlert(alertContainer, "Erro ao registrar retirada de insumo: " + error.message, "danger")
    }
  }
  

}
