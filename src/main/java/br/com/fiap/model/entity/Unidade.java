package br.com.fiap.model.entity;

import br.com.fiap.model.dto.UnidadeDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "unidade")
public class Unidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidade")
    private Long idUnidade;

    @ManyToOne
    @JoinColumn(name = "id_estoque", nullable = false)
    private Estoque estoque;

    @Column(name = "nome_unidade", nullable = false, length = 100)
    private String nomeUnidade;

    @Column(nullable = false, length = 100)
    private String rua;

    @Column(nullable = false, length = 10)
    private String numero;

    @Column(nullable = false, length = 50)
    private String bairro;

    @Column(nullable = false, length = 50)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String estado;

    @Column(nullable = false, length = 10)
    private String cep;

    // construtores
    public Unidade() {
    }

    public Unidade(Estoque estoque, UnidadeDTO unidadeDTO) {
        this.estoque = estoque;
        this.nomeUnidade = unidadeDTO.nomeUnidade();
        this.rua = unidadeDTO.rua();
        this.numero = unidadeDTO.numero();
        this.bairro = unidadeDTO.bairro();
        this.cidade = unidadeDTO.cidade();
        this.estado = unidadeDTO.estado();
        this.cep = unidadeDTO.cep();
    }

    // getters / setters
    public Long getIdUnidade() {
        return idUnidade;
    }

    public void setIdUnidade(Long idUnidade) {
        this.idUnidade = idUnidade;
    }

    public Estoque getEstoque() {
        return estoque;
    }

    public void setEstoque(Estoque estoque) {
        this.estoque = estoque;
    }

    public String getNomeUnidade() {
        return nomeUnidade;
    }

    public void setNomeUnidade(String nomeUnidade) {
        this.nomeUnidade = nomeUnidade;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }
}
