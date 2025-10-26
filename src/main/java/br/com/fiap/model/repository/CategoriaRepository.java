package br.com.fiap.model.repository;

import br.com.fiap.model.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Buscar pelo ID da categoria
    Categoria findByIdCategoria(Long idCategoria);
}
