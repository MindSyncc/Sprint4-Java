// Validadores
class Validators {
  static isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  static isValidDate(date) {
    return date instanceof Date && !isNaN(date)
  }

  static isValidBarcode(barcode) {
    return barcode && barcode.length >= 8 && barcode.length <= 20
  }

  static isValidLote(lote) {
    return lote && lote.length >= 3 && lote.length <= 50
  }

  static isValidQuantidade(quantidade) {
    return !isNaN(quantidade) && quantidade >= 0 && quantidade <= 999999
  }

  static isValidNome(nome) {
    return nome && nome.trim().length >= 3 && nome.trim().length <= 255
  }

  static validateInsumo(insumo) {
    const errors = []

    if (!this.isValidNome(insumo.nome)) {
      errors.push("Nome inválido (3-255 caracteres)")
    }

    if (!insumo.categoria) {
      errors.push("Categoria é obrigatória")
    }

    if (!this.isValidLote(insumo.lote)) {
      errors.push("Lote inválido (3-50 caracteres)")
    }

    if (!this.isValidDate(new Date(insumo.dataVencimento))) {
      errors.push("Data de vencimento inválida")
    }

    if (!this.isValidQuantidade(insumo.quantidade)) {
      errors.push("Quantidade inválida")
    }

    if (!insumo.unidade) {
      errors.push("Unidade de medida é obrigatória")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static validatePedido(pedido) {
    const errors = []

    if (!pedido.fornecedor) {
      errors.push("Fornecedor é obrigatório")
    }

    if (!pedido.itens || pedido.itens.length === 0) {
      errors.push("Pedido deve conter pelo menos um item")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}
