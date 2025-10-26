// Renderizador de UI Avançado
class UIRenderer {
  static renderInsumoTable(insumos, onEdit, onDelete) {
    if (insumos.length === 0) {
      return `
                <tr>
                    <td colspan="8" style="text-align: center; padding: var(--spacing-xl);">
                        Nenhum insumo cadastrado
                    </td>
                </tr>
            `
    }

    return insumos
      .map(
        (insumo) => `
            <tr>
                <td>${insumo.codigoBarras || "N/A"}</td>
                <td>${insumo.nome}</td>
                <td><span class="badge badge-primary">${insumo.categoria}</span></td>
                <td>${insumo.lote}</td>
                <td>${new Date(insumo.dataVencimento).toLocaleDateString("pt-BR")}</td>
                <td><strong>${insumo.quantidade}</strong></td>
                <td>${insumo.unidade}</td>
                <td>
                    <div style="display: flex; gap: var(--spacing-sm);">
                        <button class="btn btn-sm btn-secondary" onclick="editInsumo(${insumo.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteInsumo(${insumo.id})">Deletar</button>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("")
  }

  static renderPedidoTable(pedidos) {
    if (pedidos.length === 0) {
      return `
                <tr>
                    <td colspan="6" style="text-align: center; padding: var(--spacing-xl);">
                        Nenhum pedido cadastrado
                    </td>
                </tr>
            `
    }

    return pedidos
      .map(
        (pedido) => `
            <tr>
                <td>#${pedido.id}</td>
                <td>${new Date(pedido.dataPedido).toLocaleDateString("pt-BR")}</td>
                <td>${pedido.fornecedor}</td>
                <td><span class="badge badge-${this.getStatusBadgeClass(pedido.status)}">${pedido.status}</span></td>
                <td>${pedido.itens?.length || 0}</td>
                <td>
                    <button class="btn btn-sm btn-secondary">Visualizar</button>
                </td>
            </tr>
        `,
      )
      .join("")
  }

  static getStatusBadgeClass(status) {
    const statusMap = {
      aberto: "primary",
      pendente: "warning",
      entregue: "success",
      cancelado: "error",
    }
    return statusMap[status] || "primary"
  }

  static renderAlertaVencimento(insumos) {
    if (insumos.length === 0) return ""

    return `
            <div class="alert alert-warning">
                <strong>⚠️ Atenção:</strong> ${insumos.length} insumo(s) próximo(s) ao vencimento
            </div>
        `
  }

  static renderAlertaVencido(insumos) {
    if (insumos.length === 0) return ""

    return `
            <div class="alert alert-error">
                <strong>❌ Crítico:</strong> ${insumos.length} insumo(s) vencido(s) - Remover do estoque
            </div>
        `
  }

  static renderCategoriaSelect(categorias) {
    return categorias.map((cat) => `<option value="${cat.id}">${cat.nome}</option>`).join("")
  }

  static renderFornecedorSelect(fornecedores) {
    return fornecedores.map((forn) => `<option value="${forn.id}">${forn.nome}</option>`).join("")
  }
}
