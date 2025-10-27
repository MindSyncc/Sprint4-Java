import { AuthService } from "../modules/auth-service.js"
import { ApiService } from "../modules/api-service.js"
import { InsumoService } from "../services/insumo-service.js"
import { PedidoService } from "../services/pedido-service.js"
import { UIService } from "../modules/ui-service.js"

document.addEventListener("DOMContentLoaded", async () => {
  // Autenticação/permissão (existência verificada)
    if (AuthService && typeof AuthService.checkAuthentication === "function") {
        AuthService.checkAuthentication()
    }
    if (AuthService && typeof AuthService.hasPermission === "function") {
        if (!AuthService.hasPermission("Analista Local")) {
            window.location.href = "../dashboard.html"
            return
        }
    }

    if (UIService && typeof UIService.renderUserInfo === "function") {
        UIService.renderUserInfo(AuthService)
    }

    const form = document.getElementById("form-novo-pedido")
    if (!form) return

    // Carrega os fornecedores
    await loadFornecedores()

    // Carrega os insumos
    await loadInsumos()

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        console.log("Formulário de pedido submetido")

        try {
            await PedidoService.handleCreatePedido()

        } catch (err) {
            console.error("Erro ao criar pedido:", err)
        }
    })

})



async function loadFornecedores() {
    try {
        console.log("Carregando fornecedores...")
        const fornecedores = await ApiService.getFornecedores()
        const fornecedorSelect = document.getElementById("fornecedor")

        fornecedores.forEach(fornecedor => {
            const option = document.createElement("option")
            option.value = fornecedor.idFornecedor
            option.textContent = fornecedor.nomeFornecedor
            fornecedorSelect.appendChild(option)
        })

    } catch (err) {
        console.error("Erro ao carregar fornecedores:", err)
    }
}

async function loadInsumos() {
    try {
        console.log("Carregando insumos...")
        const insumos = await InsumoService.loadInsumos()
        const insumoSelect = document.getElementById("insumo")

        insumos.forEach(insumo => {
            const option = document.createElement("option")
            option.value = insumo.idInsumo
            option.textContent = insumo.nome
            insumoSelect.appendChild(option)
        })

    } catch (err) {
        console.error("Erro ao carregar insumos:", err)
    }
}       