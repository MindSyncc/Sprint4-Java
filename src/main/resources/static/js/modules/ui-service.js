export class UIService {
  static renderMenu() {
    const container = document.querySelector(".sidebar");
    if (!container) return;
    console.log("Rendering menu");

    container.innerHTML = `
      <div class="nav-section">
        <h3>Menu Principal</h3>
          <ul>
          <li><a href="/dashboard.html">Dashboard</a></li>
        </ul>
      </div>

      <!-- Menu para Almoxarife -->
      <div class="nav-section" id="menu-almoxarife" style="display: none;">
          <h3>Gerenciamento de Insumos</h3>
          <ul>
              <li><a href="/insumos/form.html">Adicionar Insumo</a></li>
              <li><a href="/insumos/listar.html">Listar Insumos</a></li>
              <li><a href="/insumos/retirar.html">Retirar um Insumo</a>"
          </ul>
      </div>

      <!-- Menu para Analista Local -->
      <div id="menu-analista-local" style="display: none;">

        <div class="nav-section">
          <h3>Gerenciamento de Estoque</h3>
          <ul>
            <li><a href="/estoque/listar.html">Visualizar Estoque</a></li>
          </ul>  
        </div>

        <div class="nav-section">
          <h3>Pedidos</h3>
          <ul>
            <li><a href="/pedidos/novo.html">Novo Pedido</a></li>
            <li><a href="/pedidos/listar.html">Meus Pedidos</a></li>
          </ul>
        </div>

      </div>

      <!-- Menu para Analista Corporativo -->
      <div class="nav-section" id="menu-corporativo" style="display: none;">
        <h3>Relatórios</h3>
        <ul>
            <li><a href="/unidades/listar.html">Visualizar Unidades</a></li>
            <li><a href="/pedidos/atender.html">Atender Pedidos</a></li>
            <li><a href="/movimentacoes/movimentacoes.html">Movimentações</a></li>
        </ul>
      </div>
    `;

    console.log("Menu renderizado");
  }

  static setActiveSection() {
    const currentPage = window.location.pathname.split("/").slice(-2).join("/");
    console.log("Current page:", currentPage);

    // Seleciona todos os links dentro das seções de navegação
    const links = document.querySelectorAll(".nav-section a");

    links.forEach(link => {
      const href = link.getAttribute("href");

      // Remove qualquer "active" anterior
      link.classList.remove("active");

      // Marca o link ativo comparando o nome do arquivo
      if (href && href.includes(currentPage)) {
        link.classList.add("active");
      }
    });
  }


  static showAlert(container, message, type = "info") {
    const alertHTML = `
      <div class="alert alert-${type}">
        ${message}
      </div>
    `;
    container.innerHTML = alertHTML;

    setTimeout(() => {
      container.innerHTML = "";
    }, 5000);
  }

  static showLoading(container) {
    container.innerHTML = '<div class="loading">Carregando...</div>';
  }

  static renderUserInfo(AuthService) {
    const user = AuthService.getCurrentUser();
    if (user) {
      document.getElementById("user-name").textContent = user.nome || "Usuário";
      document.getElementById("user-role").textContent =
        user.permissao || "Sem permissão";
    }
  }

  // Controla o menu lateral esquerdo
  static showMenuByRole(AuthService) {
    const role = AuthService.getUserRole();

    document.getElementById("menu-almoxarife").style.display = "none";
    document.getElementById("menu-analista-local").style.display = "none";
    document.getElementById("menu-corporativo").style.display = "none";

    if (role === "Almoxarife") {
      document.getElementById("menu-almoxarife").style.display = "block";
    } else if (role === "Analista Local") {
      document.getElementById("menu-analista-local").style.display = "block";
    } else if (role === "Analista Corporativo") {
      document.getElementById("menu-corporativo").style.display = "block";
    }
  }

  static renderTable(data, columns) {
    if (!data || data.length === 0) {
      return (
        '<tr><td colspan="' +
        columns.length +
        '" style="text-align: center; padding: 20px;">Nenhum registro encontrado</td></tr>'
      );
    }

    return data
      .map((row) => {
        return (
          "<tr>" +
          columns
            .map((col) => {
              return "<td>" + (row[col] || "-") + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
  }

  static formatDate(date) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  }

  static formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
}

// Torna global
window.UIService = UIService;
