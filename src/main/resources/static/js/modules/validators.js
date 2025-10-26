export class Validator {

  static validarDataFutura(data) {
    console.log("Validando data futura:", data)
    try {
      console.log("Data recebida para validação:", data);
      const dataVal = new Date(data + "T00:00")
      const hoje = new Date()
      dataVal.setHours(0, 0, 0, 0)
      hoje.setHours(0, 0, 0, 0)

      const valido = !isNaN(dataVal) && dataVal >= hoje
      console.log("Resultado da validação de data:", valido)
      return valido
    } catch (e) {
      console.error("Erro ao validar data:", e)
      return false
    } 
  }

  static validarQuantidade(quantidade) {
    console.log("Validando quantidade:", quantidade)
    try {
      const valido = !isNaN(quantidade) && quantidade > 0
      console.log("Resultado da validação de quantidade:", valido)
      return valido
    } catch (e) {
      console.error("Erro ao validar quantidade:", e)
      return false
    }
  }

  static validarQuantidadeParaRetirada(quantidadeRetirada, quantidadeAtual) {
    console.log("Validando quantidade para retirada:", quantidadeRetirada, "contra quantidade atual:", quantidadeAtual)
    try {
      const valido = quantidadeRetirada <= quantidadeAtual && quantidadeRetirada > 0 && !isNaN(quantidadeRetirada)
      
      console.log("Resultado da validação de quantidade para retirada:", valido)
      return valido
    } catch (e) {
      console.error("Erro ao validar quantidade para retirada:", e)
      return false
    }
  }

  static validarCategoria(idCategoria) {
    console.log("Validando categoria ID:", idCategoria)
    try {
      const valido = !isNaN(idCategoria) && idCategoria > 0
      console.log("Resultado da validação de categoria:", valido)
      return valido
    } catch (e) {
      console.error("Erro ao validar categoria:", e)
      return false
    }
  }
}
