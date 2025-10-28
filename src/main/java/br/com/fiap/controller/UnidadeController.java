package br.com.fiap.controller;


import br.com.fiap.model.entity.Unidade;
import br.com.fiap.model.repository.UnidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")

public class UnidadeController {
    @Autowired
    UnidadeRepository unidadeRepository;

    @GetMapping("/unidades")
    public List<Unidade> consultar() {
        List<Unidade> unidades = unidadeRepository.findAll();

        return unidades;
    }
}
