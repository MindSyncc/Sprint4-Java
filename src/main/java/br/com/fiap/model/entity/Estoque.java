package br.com.fiap.model.entity;

import br.com.fiap.model.dto.EstoqueDTO;
import jakarta.persistence.*;


import javax.swing.*;

@Entity(name = "estoque")
@Table(name = "ESTOQUE")

public class Estoque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstoque;
    private int qtdAtual;
    private int qtdMinima;
    private int qtdMaxima;
    private String status;

    // construtores

    public Estoque() {

    }

    public Estoque(EstoqueDTO estoqueDTO) {
        this.qtdAtual = estoqueDTO.qtdAtual();
        this.qtdMinima = estoqueDTO.qtdMinima();
        this.qtdMaxima = estoqueDTO.qtdMaxima();
        this.status = estoqueDTO.status();
    }

    // getters / setters
    public Long getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(Long idEstoque) {
        this.idEstoque = idEstoque;
    }

    public int getQtdAtual() {
        return qtdAtual;
    }

    public void setQtdAtual(int qtdAtual) {
        this.qtdAtual = qtdAtual;
    }

    public int getQtdMinima() {
        return qtdMinima;
    }

    public void setQtdMinima(int qtdMinima) {
        this.qtdMinima = qtdMinima;
    }

    public int getQtdMaxima() {
        return qtdMaxima;
    }

    public void setQtdMaxima(int qtdMaxima) {
        this.qtdMaxima = qtdMaxima;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void exibirInformacoesDoEstoque() {
        String info = String.format(
                """
                ==== Informações do Estoque ====
                
                ID da Unidade: %d
                Quant. Atual: %d
                Quant. Mínima: %d
                Quant. Máxima: %d
                Status: %s
                """,
                idEstoque,
                qtdAtual,
                qtdMinima,
                qtdMaxima,
                status
        );

        JOptionPane.showMessageDialog(null, info, "Detalhes da Unidade", JOptionPane.INFORMATION_MESSAGE);
    }
}
