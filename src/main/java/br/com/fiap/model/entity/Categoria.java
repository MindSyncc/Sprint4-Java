package br.com.fiap.model.entity;

import br.com.fiap.model.dto.CategoriaDTO;
import jakarta.persistence.*;

@Entity(name = "categoria")
@Table(name = "CATEGORIA")

public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CATEGORIA")
    private int idCategoria;

    private String tipoCategoria;

    // construtores
    public Categoria() {}

    public Categoria(CategoriaDTO categoriaDTO) {
        this.tipoCategoria = categoriaDTO.tipoCategoria();
    }

    // getters / setters

    public int getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(int idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getTipoCategoria() {
        return tipoCategoria;
    }

    public void setTipoCategoria(String tipoCategoria) {
        this.tipoCategoria = tipoCategoria;
    }
}
