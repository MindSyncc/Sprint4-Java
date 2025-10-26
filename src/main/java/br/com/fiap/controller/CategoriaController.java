package br.com.fiap.controller;

import br.com.fiap.model.entity.Categoria;
import br.com.fiap.model.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/categorias")
    public List<Categoria> consultar() {
        List<Categoria> categorias = categoriaRepository.findAll();
        return categorias;
    }
}
