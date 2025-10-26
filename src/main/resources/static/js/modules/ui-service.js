export class UIService {
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
      document.getElementById("user-role").textContent = user.permissao || "Sem permissão";
    }
  }

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
