package br.com.fiap.controller;


import br.com.fiap.model.dto.UnidadeDTO;
import br.com.fiap.model.entity.Estoque;
import br.com.fiap.model.entity.Unidade;
import br.com.fiap.model.repository.EstoqueRepository;
import br.com.fiap.model.repository.UnidadeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class UnidadeController {
    @Autowired
    UnidadeRepository unidadeRepository;

    @Autowired
    EstoqueRepository estoqueRepository;

    @PostMapping("/unidades")
    public Unidade adicionar(
            @Valid @RequestBody UnidadeDTO unidadeDTO,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            throw new IllegalArgumentException("Campos inválidos na criação da Unidade!");
        }

        // Verifica se o estoque existe
        Estoque estoque = estoqueRepository.findById(unidadeDTO.idEstoque())
                .orElseThrow(() -> new IllegalArgumentException("Campos inválidos"));

        Unidade unidade = new Unidade(estoque, unidadeDTO);
        unidadeRepository.save(unidade);

        return unidade;
    }

    @GetMapping("/unidades")
    public List<Unidade> consultar() {
        List<Unidade> unidades = unidadeRepository.findAll();

        return unidades;
    }
}
