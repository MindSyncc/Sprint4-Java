import { AuthService } from "./modules/auth-service.js";

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  AuthService.logout();
});