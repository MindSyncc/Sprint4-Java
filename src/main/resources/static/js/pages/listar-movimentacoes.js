import { ApiService } from "../modules/api-service.js";
import { AuthService } from "../modules/auth-service.js"
import { UIService } from "../modules/ui-service.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Verifica autenticação
    AuthService.checkAuthentication();

    // Verifica permissão
    if (!AuthService.hasPermission("Analista Corporativo")) {
        window.location.href = "../dashboard.html"
    }

    // Renderiza informações do usuário
    UIService.renderUserInfo(AuthService);

    // Carrega movimentações
    await loadMovimentacoes();
}) 

async function loadMovimentacoes() {
    const tbody = document.getElementById("tbody-movimentacoes")

    try {
        const movimentacoes = await ApiService.getMovimentacoes();
        console.log("Lista de movimentações: ", movimentacoes)
        // Limpa a tabela antes de preencher
        tbody.innerHTML = "";

        // Se não houver movimentações, mostra mensagem de aviso
        if (!movimentacoes || movimentacoes.length === 0) {
            tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding:30px;">Nenhuma movimentação disponível para visualização</td>
            </tr>
            `
        return;
    }

    movimentacoes.forEach((movimentacao) => {
        const row = document.createElement("tr")
        row.className = "linha-movimentacoes"

        row.innerHTML = `
            <td><strong>${movimentacao.idMovimentacao}</strong></td>
            <td class="tipo-movimentacao"><strong>${movimentacao.tipoMovimentacao}<strong></td>
            <td>${movimentacao.motivo}</td>
            <td>${movimentacao.dataHoraEntrada === null ? "-" : new Date(movimentacao.dataHoraEntrada).toLocaleDateString("pt-BR")}</td>
            <td>${movimentacao.dataHoraSaida === null ? "-" : new Date(movimentacao.dataHoraSaida).toLocaleDateString("pt-BR")}</td>
            <td>${movimentacao.quantidade}</td>
            <td>${movimentacao.funcionario.id}</td>
        `

        tbody.appendChild(row);

        const tiposMovimentacao = document.querySelectorAll(".tipo-movimentacao")

        tiposMovimentacao.forEach(element => {
            if (element.textContent.trim() === "Entrada") {
                    element.style.color = "green"
                } else if (element.textContent.trim() === "Saída") {
                    element.style.color = "red"
                }
            }
        )


        // Atualiza o total
        document.getElementById("total-movimentacoes").textContent = movimentacoes.length;
    })
    } catch (error) {
        console.error("Erro ao carregar movimentações: ", error);
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">Erro ao carregar movimentações</td>
            </tr>
        `
    }

    

}