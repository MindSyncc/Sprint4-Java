import { ApiService } from "./api-service.js";

export class AuthService {
  static async handleLogin(event) {
    event.preventDefault();

    const funcional = document.getElementById("funcional").value;
    const senhaHash = document.getElementById("senha").value;
    const alertContainer = document.getElementById("alertContainer");

    try {
      // Chamar backend para autenticar
      const response = await ApiService.login(funcional, senhaHash);

      // Salvar dados do usuário na sessão
      // a resposta é o FuncionarioDTO retornado pelo backend
      sessionStorage.setItem("currentUser", JSON.stringify(response));

      // Redirecionar para dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      // Exibe mensagem de erro
      window.UIService.showAlert(alertContainer, "Erro ao fazer login: " + error.message, "danger");
    }
  }

  static getCurrentUser() {
    const user = sessionStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  static getUserRole() {
    const user = this.getCurrentUser();
    return user?.permissao || null;
  }

  static getUserUnidadeId() {
    const user = this.getCurrentUser();
    return user?.idUnidade || null;
  }

  static hasPermission(requiredRole) {
    console.log("Required Role:", requiredRole);
    return this.getUserRole() === requiredRole;
  }

  static hasAnyPermission(roles) {
    const userRole = this.getUserRole();
    return roles.includes(userRole);
  }

  static logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "../index.html";
  }

  static checkAuthentication() {
    if (!this.isAuthenticated()) {
      window.location.href = "index.html";
    }
  }

}

// Verificar autenticação ao carregar página
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;
  const isLoginPage = currentPage.includes("index.html") || currentPage === "/";

  if (!isLoginPage && !AuthService.isAuthenticated()) {
    window.location.href = "index.html";
  }

  // Adicionar listener ao formulário de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", AuthService.handleLogin);
  }
});
