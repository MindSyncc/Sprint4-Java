// Configuração da Aplicação
const CONFIG = {
  // API
  API_BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  API_TIMEOUT: 30000,

  // Autenticação
  AUTH_TOKEN_KEY: "authToken",
  USER_KEY: "currentUser",
  REFRESH_TOKEN_KEY: "refreshToken",

  // Aplicação
  APP_NAME: "Laboratório Albert Einstein - Gerenciamento de Estoque",
  APP_VERSION: "1.0.0",
  ENVIRONMENT: process.env.NODE_ENV || "development",

  // Paginação
  ITEMS_PER_PAGE: 10,
  MAX_ITEMS_PER_PAGE: 100,

  // Validação
  MIN_QUANTIDADE: 0,
  MAX_QUANTIDADE: 999999,
  MIN_LOTE_LENGTH: 3,
  MAX_LOTE_LENGTH: 50,

  // Alertas
  DIAS_VENCIMENTO_ALERTA: 30,
  QUANTIDADE_MINIMA_ALERTA: 5,

  // Categorias Padrão
  CATEGORIAS_PADRAO: [
    { id: 1, nome: "Desinfetante" },
    { id: 2, nome: "Material de Consumo" },
    { id: 3, nome: "Reagente" },
    { id: 4, nome: "Equipamento" },
    { id: 5, nome: "Medicamento" },
  ],

  // Unidades de Medida
  UNIDADES_MEDIDA: [
    { id: 1, nome: "Mililitro", sigla: "ml" },
    { id: 2, nome: "Litro", sigla: "L" },
    { id: 3, nome: "Grama", sigla: "g" },
    { id: 4, nome: "Quilograma", sigla: "kg" },
    { id: 5, nome: "Unidade", sigla: "un" },
    { id: 6, nome: "Caixa", sigla: "cx" },
  ],

  // Status de Pedidos
  STATUS_PEDIDOS: ["aberto", "pendente", "entregue", "cancelado"],

  // Perfis de Usuário
  PERFIS: {
    CORPORATIVO: "corporativo",
    LOCAL: "local",
    ALMOXARIFE: "almoxarife",
  },

  // Permissões por Perfil
  PERMISSOES: {
    corporativo: ["visualizar_todas_unidades", "gerar_relatorios", "exportar_dados"],
    local: ["gerenciar_estoque", "fazer_pedidos", "visualizar_relatorios"],
    almoxarife: ["adicionar_insumos", "remover_insumos", "visualizar_estoque"],
  },
}

// Validação de Configuração
function validateConfig() {
  if (!CONFIG.API_BASE_URL) {
    console.warn("API_BASE_URL não configurada")
  }
  return true
}

// Exportar configuração
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG
}
