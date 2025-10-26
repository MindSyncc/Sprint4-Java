package br.com.fiap.model.entity;

import br.com.fiap.model.dto.EstoqueInsumoDTO;
import jakarta.persistence.*;

@Entity(name = "estoque_insumo")
@Table (name = "ESTOQUE_INSUMO")

public class EstoqueInsumo {

    @EmbeddedId
    private EstoqueInsumoId id;

    @ManyToOne
    @MapsId("estoqueId")
    @JoinColumn(name = "ID_ESTOQUE")
    private Estoque estoque;

    @ManyToOne
    @MapsId("insumoId")
    @JoinColumn(name = "ID_INSUMO")
    private Insumo insumo;

    private int quantidade;

    // construtores

    public EstoqueInsumo() {
    }

    public EstoqueInsumo(Estoque estoque, Insumo insumo, int quantidade) {
        this.estoque = estoque;
        this.insumo = insumo;
        this.quantidade = quantidade;
        this.id = new EstoqueInsumoId(estoque.getIdEstoque(), insumo.getIdInsumo());
    }


    // getters e setters

    public EstoqueInsumoId getId() {
        return id;
    }

    public void setId(EstoqueInsumoId id) {
        this.id = id;
    }

    public Estoque getEstoque() {
        return estoque;
    }

    public void setEstoque(Estoque estoque) {
        this.estoque = estoque;
    }

    public Insumo getInsumo() {
        return insumo;
    }

    public void setInsumo(Insumo insumo) {
        this.insumo = insumo;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
