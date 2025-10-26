package br.com.fiap.model.repository;

import br.com.fiap.model.entity.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
    Estoque findByIdEstoque(Long idEstoque);
}
