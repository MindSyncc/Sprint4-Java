// Import necessary services
import { AuthService } from "./modules/auth-service.js"
import { UIService } from "./modules/ui-service.js"
import { ApiService } from "./modules/api-service.js"


document.addEventListener("DOMContentLoaded", async () => {

  // Verifica user
  const user = AuthService.getCurrentUser()

  // Carregar dados do dashboard
  await loadDashboardData()

  // seta o nome e a permissão no header
  document.getElementById("user-name").textContent = user.nome;
  document.getElementById("user-role").textContent = user.permissao;

  // Marcar link ativo
  const currentPage = window.location.pathname.split("/").pop() || "dashboard.html"
  document.querySelectorAll(".nav-section a").forEach((link) => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active")
    }
  })
})

async function loadDashboardData() {
  const role = AuthService.getUserRole()
  const dashboardContent = document.getElementById("dashboardContent")
  const alertContainer = document.getElementById("alertContainer")

  try {
    if (role === "Almoxarife") {
      await loadAlmoxarifeDashboard(dashboardContent)
    } else if (role === "Analista Local") {
      await loadAnalistaLocalDashboard(dashboardContent)
    } else if (role === "Analista Corporativo") {
      await loadCorporativoDashboard(dashboardContent)
    }
  } catch (error) {
    UIService.showAlert(alertContainer, "Erro ao carregar dashboard: " + error.message, "danger")
    console.error(error)
  }
}

async function loadAlmoxarifeDashboard(container) {
  try {
    console.log("Loading Almoxarife Dashboard");

    const insumos = await ApiService.getInsumos();
    console.log("Insumos recebidos:", insumos);

    const html = `
      <div class="card">
        <h2>Bem-vindo, Almoxarife!</h2>
        <p>Gerenciar insumos do Laboratório Albert Einstein</p>
      </div>
      
      <div class="card stat-card">
        <h3>Total de Insumos</h3>
        <p class="stat-number">${insumos.length || 0}</p>
      </div>
      
      <div class="card stat-card">
        <h3>Insumos Vencidos</h3>
        <p class="stat-number alert">${countExpiredItems(insumos)}</p>
      </div>
    `;

    container.innerHTML = html;
  } catch (error) {
    console.error("Erro ao carregar Almoxarife Dashboard:", error);
    container.innerHTML = '<div class="card"><p>Erro ao carregar dados</p></div>';
  }
}

async function loadAnalistaLocalDashboard(container) {
  try {
    console.log("Loading Analista Local Dashboard");
    const estoque = await ApiService.getInsumos()
    const pedidos = await ApiService.getPedidos()

    const html = `
      <div class="card">
        <h2>Bem-vindo, Analista Local!</h2>
        <p>Gerencie o estoque e pedidos do Laboratório Albert Einstein</p>
      </div>
      
      <div class="card stat-card">
        <h3>Itens em Estoque</h3>
        <p class="stat-number">${estoque.length || 0}</p>
      </div>
      
      <div class="card stat-card">
        <h3>Pedidos Pendentes</h3>
        <p class="stat-number">${countPendingOrders(pedidos)}</p>
      </div>
    `

    container.innerHTML = html
  } catch (error) {
    container.innerHTML = '<div class="card"><p>Erro ao carregar dados</p></div>'
  }
}

async function loadCorporativoDashboard(container) {
  try {
    const insumos = await ApiService.getInsumos()
    const pedidos = await ApiService.getPedidos()

    const html = `
      <div class="card">
        <h2>Bem-vindo, Analista Corporativo!</h2>
        <p>Visualize relatórios consolidados do Laboratório Albert Einstein</p>
      </div>
      
      <div class="card stat-card">
        <h3>Total de Insumos</h3>
        <p class="stat-number">${insumos.length || 0}</p>
      </div>
      
      <div class="card stat-card">
        <h3>Pedidos em Aberto</h3>
        <p class="stat-number">${countPendingOrders(pedidos)}</p>
      </div>
    `

    container.innerHTML = html
  } catch (error) {
    container.innerHTML = '<div class="card"><p>Erro ao carregar dados</p></div>'
  }
}

function countExpiredItems(insumos) {
  const today = new Date()
  return insumos.filter((item) => new Date(item.dataVencimento) < today).length
}

function countPendingOrders(pedidos) {
  return pedidos.filter((pedido) => pedido.status === "Pendente" || pedido.status === "Andamento").length
}
