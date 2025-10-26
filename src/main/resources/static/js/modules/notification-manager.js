// Gerenciador de Notificações
class NotificationManager {
  static show(message, type = "info", duration = 3000) {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            </div>
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, duration)
  }

  static success(message) {
    this.show(message, "success")
  }

  static error(message) {
    this.show(message, "error", 5000)
  }

  static warning(message) {
    this.show(message, "warning")
  }

  static info(message) {
    this.show(message, "info")
  }
}
