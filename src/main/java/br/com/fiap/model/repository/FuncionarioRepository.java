package br.com.fiap.model.repository;

import br.com.fiap.model.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Funcionario findByFuncional(String funcional);
}
