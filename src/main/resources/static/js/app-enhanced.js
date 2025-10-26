// Importar módulos (em produção, usar import statements)
import { InsumoManager } from "./modules/insumo-manager.js"
import { PedidoManager } from "./modules/pedido-manager.js"
import { RelatorioGenerator } from "./modules/relatorio-generator.js"
import { NotificationManager } from "./modules/notification-manager.js"
import { router } from "./modules/router.js"
import { apiService } from "./modules/api-service.js"

// Inicializar Managers
let insumoManager
let pedidoManager
let relatorioGenerator

// Funções globais para manipulação de insumos
async function editInsumo(id) {
  const insumo = insumoManager.insumos.find((i) => i.id === id)
  if (insumo) {
    // Preencher modal com dados do insumo
    document.getElementById("insumoNome").value = insumo.nome
    document.getElementById("insumoCategoria").value = insumo.categoria
    document.getElementById("insumoLote").value = insumo.lote
    document.getElementById("insumoVencimento").value = insumo.dataVencimento
    document.getElementById("insumoQuantidade").value = insumo.quantidade
    document.getElementById("insumoUnidade").value = insumo.unidade
    document.getElementById("insumoModal").style.display = "flex"
  }
}

async function deleteInsumo(id) {
  if (confirm("Tem certeza que deseja deletar este insumo?")) {
    try {
      await insumoManager.deleteInsumo(id)
      NotificationManager.success("Insumo deletado com sucesso!")
      router.render()
    } catch (error) {
      NotificationManager.error("Erro ao deletar insumo")
    }
  }
}

function goBack() {
  window.history.back()
}

// Inicializar aplicação com módulos
function initializeApp() {
  insumoManager = new InsumoManager(apiService)
  pedidoManager = new PedidoManager(apiService)
  relatorioGenerator = new RelatorioGenerator(insumoManager, pedidoManager)

  // Carregar dados iniciais
  loadInitialData()
}

async function loadInitialData() {
  try {
    await insumoManager.loadInsumos()
    await insumoManager.loadCategorias()
    await pedidoManager.loadPedidos()
  } catch (error) {
    console.error("Erro ao carregar dados iniciais:", error)
  }
}

// Chamar inicialização quando o app estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})
