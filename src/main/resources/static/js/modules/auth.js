// Módulo de Autenticação
export class AuthModule {
  constructor() {
    this.currentUser = this.loadUser()
  }

  loadUser() {
    const user = sessionStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  }

  saveUser(user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user))
    this.currentUser = user
  }

  logout() {
    sessionStorage.removeItem("currentUser")
    window.location.href = "/"
  }

  isAuthenticated() {
    return this.currentUser !== null
  }

  getCurrentUser() {
    return this.currentUser
  }

  getUserRole() {
    return this.currentUser?.permissao || null
  }

  // Validar se usuário tem permissão
  hasPermission(requiredRole) {
    const userRole = this.getUserRole()
    return userRole === requiredRole
  }

  // Validar se usuário tem uma das permissões
  hasAnyPermission(roles) {
    const userRole = this.getUserRole()
    return roles.includes(userRole)
  }
}

const auth = new AuthModule()

// Verificar autenticação ao carregar página
document.addEventListener("DOMContentLoaded", () => {
  if (!auth.isAuthenticated() && !window.location.pathname.includes("index.html") && window.location.pathname !== "/") {
    window.location.href = "index.html"
  }
})
