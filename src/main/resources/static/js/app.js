import { AuthService } from "./modules/auth-service.js";
import { UIService } from "./modules/ui-service.js";

document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticação
  AuthService.checkAuthentication()

  // Renderizar informações do usuário
  UIService.renderUserInfo(AuthService)

  UIService.renderMenu();
  UIService.setActiveSection();
  UIService.showMenuByRole(AuthService);

});

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  AuthService.logout();
});

