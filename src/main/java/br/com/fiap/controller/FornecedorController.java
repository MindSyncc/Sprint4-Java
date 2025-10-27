package br.com.fiap.controller;

import br.com.fiap.model.entity.Fornecedor;
import br.com.fiap.model.repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FornecedorController {
    @Autowired
    FornecedorRepository fornecedorRepository;

    @GetMapping("/fornecedor/{id}")
    public Fornecedor consultarPorId(@PathVariable Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fornecedor não encontrado!"));

        return fornecedor;
    }

    @GetMapping("/fornecedor")
    public List<Fornecedor> consultar() {
        List<Fornecedor> fornecedores = fornecedorRepository.findAll();

        return fornecedores;
    }
}
