package br.com.fiap.model.entity;

import br.com.fiap.model.dto.InsumoDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name = "insumo")
@Table(name = "INSUMO")

public class Insumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInsumo;

    private String lote;
    private LocalDate dataValidade;
    private String nome;
    private String unidadeMedida;
    private String codigoDeBarras;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    // construtores

    public Insumo() {
    }


    public Insumo(InsumoDTO insumoDTO, Categoria categoria) {
        this.nome = insumoDTO.nome();
        this.lote = insumoDTO.lote();
        this.dataValidade = insumoDTO.dataValidade();
        this.unidadeMedida = insumoDTO.unidadeMedida();
        this.codigoDeBarras = insumoDTO.codigoDeBarras();
        this.categoria = categoria;
    }


    // getters/setters

    public Long getIdInsumo() {
        return idInsumo;
    }

    public void setIdInsumo(Long idInsumo) {
        this.idInsumo = idInsumo;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getCodigoDeBarras() {
        return codigoDeBarras;
    }

    public void setCodigoDeBarras(String codigoDeBarras) {
        this.codigoDeBarras = codigoDeBarras;
    }

    // metodos da classe

    /**
     * Classe para exibir as informacoes do insumo em um string formatada
     */
    public String exibirInformacoesDoInsumo() {
        String info = String.format("""
            ==== Informações do Insumo ====
            🆔 ID do Insumo: %d%n
            📋 Nome: %s%n
            📅 Validade: %s%n
            🏷️ Lote: %s%n
            📏 Unidade de Medida: %s%n
            """, idInsumo, nome, dataValidade, lote, unidadeMedida);

        return info;
    }
}
