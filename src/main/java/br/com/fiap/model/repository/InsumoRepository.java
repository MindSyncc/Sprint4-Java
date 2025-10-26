package br.com.fiap.model.repository;

import br.com.fiap.model.entity.Insumo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsumoRepository extends JpaRepository<Insumo, Long> {
    Insumo findByIdInsumo(Long idInsumo);
}
