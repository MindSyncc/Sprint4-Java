package br.com.fiap.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.fiap.model.entity.Movimentacao;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
}