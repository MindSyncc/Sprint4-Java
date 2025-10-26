package br.com.fiap.controller;

import br.com.fiap.model.dto.MovimentacaoDTO;
import br.com.fiap.model.entity.Funcionario;
import br.com.fiap.model.entity.Movimentacao;
import br.com.fiap.model.repository.FuncionarioRepository;
import br.com.fiap.model.repository.MovimentacaoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MovimentacaoController {
    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping("/movimentacao/{id}")
    public Movimentacao consultarPorId(@PathVariable Long id) {
        Movimentacao movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movimentação não encontrada!"));

        return movimentacao;
    }

    @PostMapping("/movimentacao")
    public Movimentacao adicionar(@Valid @RequestBody MovimentacaoDTO movimentacaoDTO, BindingResult result) {
        System.out.println(movimentacaoDTO);
        if (result.hasErrors()) {
            throw new IllegalArgumentException("Campos inválidos para criação da movimentação");
        }

        Funcionario funcionario = null;

        // busca pelo funcionário
        funcionario = funcionarioRepository.findById(movimentacaoDTO.idFuncionario())
                .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado"));

        Movimentacao movimentacao = new Movimentacao(movimentacaoDTO, funcionario);

        // salva no banco
        movimentacaoRepository.save(movimentacao);

        return movimentacao;
    }

    @GetMapping("/movimentacao")
    public List<Movimentacao> consultar() {
        List<Movimentacao> movimentacoes = movimentacaoRepository.findAll();

        return movimentacoes;
    }
}
