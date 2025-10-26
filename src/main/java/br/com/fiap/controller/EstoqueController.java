package br.com.fiap.controller;

import br.com.fiap.model.entity.Estoque;
import br.com.fiap.model.repository.EstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EstoqueController {

    @Autowired
    private EstoqueRepository estoqueRepository;

    @GetMapping("/estoque/{id}")
    public Estoque consultarPorId(@PathVariable Long id) {
        Estoque estoque = estoqueRepository.findById(id).
                orElseThrow(() -> new IllegalArgumentException("Estoque não encontrado com id: " + id));

        return estoque;
    }

    @GetMapping("/estoque")
    public List<Estoque> consultar() {
        List<Estoque> estoques = estoqueRepository.findAll();

        return estoques;
    }}