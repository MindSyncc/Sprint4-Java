// Exemplos de Uso do Sistema

// ============================================
// 1. EXEMPLO: Carregar e Listar Insumos
// ============================================
const insumoManager = require("./insumoManager")
const UIRenderer = require("./UIRenderer")
const NotificationManager = require("./NotificationManager")

async function exemploCarregarInsumos() {
  try {
    const insumos = await insumoManager.loadInsumos()
    console.log("Insumos carregados:", insumos)

    // Renderizar tabela
    const tableBody = document.getElementById("insumosTableBody")
    tableBody.innerHTML = UIRenderer.renderInsumoTable(insumos)
  } catch (error) {
    NotificationManager.error("Erro ao carregar insumos")
  }
}

// ============================================
// 2. EXEMPLO: Adicionar Novo Insumo
// ============================================
async function exemploAdicionarInsumo() {
  const novoInsumo = {
    nome: "Álcool 70%",
    categoria: 1,
    lote: "LOT123",
    dataVencimento: "2025-12-31",
    quantidade: 100,
    unidade: "ml",
  }

  try {
    const insumo = await insumoManager.addInsumo(novoInsumo)
    NotificationManager.success("Insumo adicionado com sucesso!")
    console.log("Novo insumo:", insumo)
  } catch (error) {
    NotificationManager.error("Erro ao adicionar insumo")
  }
}

// ============================================
// 3. EXEMPLO: Atualizar Quantidade de Insumo
// ============================================
async function exemploAtualizarQuantidade(insumoId, novaQuantidade) {
  try {
    const insumoAtualizado = await insumoManager.updateInsumo(insumoId, {
      quantidade: novaQuantidade,
    })
    NotificationManager.success("Quantidade atualizada!")
    console.log("Insumo atualizado:", insumoAtualizado)
  } catch (error) {
    NotificationManager.error("Erro ao atualizar quantidade")
  }
}

// ============================================
// 4. EXEMPLO: Gerar Relatório de Estoque
// ============================================
const relatorioGenerator = require("./relatorioGenerator")

function exemploGerarRelatorio() {
  const resumo = relatorioGenerator.getResumoEstoque()
  console.log("Resumo do Estoque:", resumo)

  const distribuicao = relatorioGenerator.getDistribuicaoPorCategoria()
  console.log("Distribuição por Categoria:", distribuicao)

  const baixoEstoque = relatorioGenerator.getInsumosComBaixoEstoque(5)
  console.log("Insumos com Baixo Estoque:", baixoEstoque)

  const proximosVencimento = insumoManager.getInsumosProximosVencimento(30)
  console.log("Próximos ao Vencimento (30 dias):", proximosVencimento)
}

// ============================================
// 5. EXEMPLO: Exportar Dados
// ============================================
const ExportManager = require("./ExportManager")

function exemploExportarDados() {
  // Exportar como CSV
  const csv = relatorioGenerator.exportarCSV()
  ExportManager.exportToCSV(insumoManager.insumos, "insumos.csv")

  // Exportar como JSON
  ExportManager.exportToJSON(insumoManager.insumos, "insumos.json")

  // Exportar como PDF
  const conteudo = `
        <table>
            <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Quantidade</th>
            </tr>
            ${insumoManager.insumos
              .map(
                (i) => `
                <tr>
                    <td>${i.nome}</td>
                    <td>${i.categoria}</td>
                    <td>${i.quantidade}</td>
                </tr>
            `,
              )
              .join("")}
        </table>
    `
  ExportManager.exportToPDF("Relatório de Insumos", conteudo)
}

// ============================================
// 6. EXEMPLO: Criar Pedido
// ============================================
const pedidoManager = require("./pedidoManager")

async function exemploCriarPedido() {
  const novoPedido = {
    dataPedido: new Date().toISOString().split("T")[0],
    fornecedor: 1,
    itens: [
      {
        insumo: 1,
        quantidade: 50,
        unidade: "ml",
        precoUnitario: 5.5,
      },
    ],
  }

  try {
    const pedido = await pedidoManager.createPedido(novoPedido)
    NotificationManager.success("Pedido criado com sucesso!")
    console.log("Novo pedido:", pedido)
  } catch (error) {
    NotificationManager.error("Erro ao criar pedido")
  }
}

// ============================================
// 7. EXEMPLO: Validar Insumo
// ============================================
const Validators = require("./Validators")

function exemploValidarInsumo() {
  const insumo = {
    nome: "Álcool 70%",
    categoria: 1,
    lote: "LOT123",
    dataVencimento: "2025-12-31",
    quantidade: 100,
    unidade: "ml",
  }

  const validacao = Validators.validateInsumo(insumo)
  console.log("Validação:", validacao)

  if (!validacao.isValid) {
    validacao.errors.forEach((erro) => {
      NotificationManager.error(erro)
    })
  }
}

// ============================================
// 8. EXEMPLO: Usar Notificações
// ============================================
function exemploNotificacoes() {
  NotificationManager.success("Operação realizada com sucesso!")
  NotificationManager.error("Ocorreu um erro!")
  NotificationManager.warning("Atenção: Insumo próximo ao vencimento")
  NotificationManager.info("Informação importante")
}

// ============================================
// 9. EXEMPLO: Filtrar Insumos
// ============================================
function exemploFiltrarInsumos() {
  // Insumos por categoria
  const porCategoria = insumoManager.getInsumosPorCategoria()
  console.log("Insumos por categoria:", porCategoria)

  // Insumos vencidos
  const vencidos = insumoManager.getInsumosVencidos()
  console.log("Insumos vencidos:", vencidos)

  // Insumos próximos ao vencimento
  const proximosVencimento = insumoManager.getInsumosProximosVencimento(30)
  console.log("Próximos ao vencimento:", proximosVencimento)
}

// ============================================
// 10. EXEMPLO: Gerenciar Armazenamento Local
// ============================================
const StorageManager = require("./StorageManager")

function exemploArmazenamentoLocal() {
  // Salvar insumos
  StorageManager.saveInsumos(insumoManager.insumos)

  // Recuperar insumos
  const insumosSalvos = StorageManager.getInsumos()
  console.log("Insumos salvos:", insumosSalvos)

  // Limpar tudo
  // StorageManager.clearAll()
}

// ============================================
// EXECUTAR EXEMPLOS
// ============================================
// Descomente para testar:
// exemploCarregarInsumos()
// exemploAdicionarInsumo()
// exemploGerarRelatorio()
// exemploExportarDados()
// exemploNotificacoes()
// exemploFiltrarInsumos()
