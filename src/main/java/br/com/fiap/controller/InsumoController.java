package br.com.fiap.controller;

import br.com.fiap.model.dto.InsumoDTO;
import br.com.fiap.model.entity.Categoria;
import br.com.fiap.model.entity.Insumo;
import br.com.fiap.model.repository.CategoriaRepository;
import br.com.fiap.model.repository.InsumoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InsumoController {

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/insumos/{id}")
    public Insumo consultarPorId(@PathVariable Long id) {
        Insumo insumo = insumoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Insumo não encontrado com id: " + id));

        return insumo;
    }

    @PostMapping("/insumos")
    public Insumo adicionar(@Valid @RequestBody InsumoDTO insumoDTO, BindingResult result) {
        if (result.hasErrors()) {
            throw new IllegalArgumentException("Campos inválidos na criação do insumo");
        }

        // Busca a categoria
        Categoria categoria = categoriaRepository.findById(insumoDTO.idCategoria())
                .orElseThrow(() -> new IllegalArgumentException("Categoria inválida"));
        Insumo insumo = new Insumo(insumoDTO, categoria);

        // salva no banco
        insumoRepository.save(insumo);

        return insumo;
    }

    @PutMapping("/insumos/{id}")
    public Insumo atualizar(
            @PathVariable Long id,
            @Valid @RequestBody InsumoDTO insumoDTO,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            throw new IllegalArgumentException("Campos inválidos");
        }

        // Busca o insumo existente
        Insumo insumoExistente = insumoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Insumo não encontrado"));

        // Busca a categoria
        Categoria categoria = categoriaRepository.findById(insumoDTO.idCategoria())
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        Insumo insumo = new Insumo(insumoDTO, categoria);
        insumo.setIdInsumo(id);
        insumoRepository.save(insumo);
        return insumo;
    }

    @GetMapping("/insumos")
    public List<Insumo> consultar() {
        List<Insumo> insumos = insumoRepository.findAll();

        return insumos;
    }

}
