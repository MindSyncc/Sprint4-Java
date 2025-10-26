package br.com.fiap.model.repository;

import br.com.fiap.model.entity.EstoqueInsumo;
import br.com.fiap.model.entity.EstoqueInsumoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstoqueInsumoRepository extends JpaRepository<EstoqueInsumo, EstoqueInsumoId> {

    // Buscar todos os registros de um insumo específico
    List<EstoqueInsumo> findByIdInsumoId(Long insumoId);

    // Buscar todos os registros de um estoque específico
    List<EstoqueInsumo> findByIdEstoqueId(Long estoqueId);
}
