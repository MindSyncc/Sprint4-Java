package br.com.fiap.model.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EstoqueInsumoId implements Serializable {

    @Column(name = "id_estoque")
    private Long estoqueId;

    @Column(name = "id_insumo")
    private Long insumoId;

    public EstoqueInsumoId() {}

    public EstoqueInsumoId(Long estoqueId, Long insumoId) {
        this.estoqueId = estoqueId;
        this.insumoId = insumoId;
    }

    // getters e setters

    public Long getEstoqueId() {
        return estoqueId;
    }
    public void setEstoqueId(Long estoqueId) {
        this.estoqueId = estoqueId;
    }
    public Long getInsumoId() {
        return insumoId;
    }
    public void setInsumoId(Long insumoId) {
        this.insumoId = insumoId;
    }

    // equals e hashCode (necessário para chave composta)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EstoqueInsumoId)) return false;
        EstoqueInsumoId that = (EstoqueInsumoId) o;
        return Objects.equals(estoqueId, that.estoqueId) &&
                Objects.equals(insumoId, that.insumoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(estoqueId, insumoId);
    }
}

