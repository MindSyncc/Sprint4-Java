package br.com.fiap.controller;

import br.com.fiap.model.dto.EstoqueInsumoDTO;
import br.com.fiap.model.entity.Estoque;
import br.com.fiap.model.entity.EstoqueInsumo;
import br.com.fiap.model.entity.EstoqueInsumoId;
import br.com.fiap.model.entity.Insumo;
import br.com.fiap.model.repository.EstoqueInsumoRepository;
import br.com.fiap.model.repository.EstoqueRepository;
import br.com.fiap.model.repository.InsumoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estoque-insumo")
public class EstoqueInsumoController {

    @Autowired
    private EstoqueRepository estoqueRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    @Autowired
    private EstoqueInsumoRepository estoqueInsumoRepository;

    // Criar registro de estoque para um insumo
    @PostMapping("/novo/{estoqueId}/{insumoId}")
    public ResponseEntity<EstoqueInsumo> criar(
            @PathVariable Long estoqueId,
            @PathVariable Long insumoId,
            @Valid @RequestBody EstoqueInsumoDTO estoqueInsumoDTO) {

        // Verifica se o estoque existe
        Estoque estoque = estoqueRepository.findById(estoqueId)
                .orElseThrow(() -> new IllegalArgumentException("Estoque não encontrado"));
        // Verifique se o insumo existe
        Insumo insumo = insumoRepository.findById(insumoId)
                .orElseThrow(() -> new IllegalArgumentException("Insumo não encontrado"));

        EstoqueInsumo estoqueInsumo = new EstoqueInsumo(estoque, insumo, estoqueInsumoDTO.quantidade());
        estoqueInsumoRepository.save(estoqueInsumo);

        return ResponseEntity.ok(estoqueInsumo);
    }

    // Atualizar quantidade de um insumo
    @PutMapping("/atualizar/{estoqueId}/{insumoId}")
    public ResponseEntity<EstoqueInsumo> atualizar(
            @PathVariable Long estoqueId,
            @PathVariable Long insumoId,
            @Valid @RequestBody EstoqueInsumoDTO estoqueInsumoDTO) {

        // Verifica se o vínculo entre o insumo e o estoque existe
        EstoqueInsumoId id = new EstoqueInsumoId(estoqueId, insumoId);
        EstoqueInsumo estoqueInsumo = estoqueInsumoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de estoque não encontrado"));
        System.out.println(estoqueInsumo);

        estoqueInsumo.setQuantidade(estoqueInsumoDTO.quantidade());

        EstoqueInsumo atualizado = estoqueInsumoRepository.save(estoqueInsumo);

        return ResponseEntity.ok(atualizado);
    }

    // Deletar registro de estoque
    @DeleteMapping("/deletar/{estoqueId}/{insumoId}")
    public ResponseEntity<Void> deletar(
            @PathVariable Long estoqueId,
            @PathVariable Long insumoId
    ) {
        EstoqueInsumoId id = new EstoqueInsumoId(estoqueId, insumoId);
        estoqueInsumoRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/estoque-insumos")
    public List<EstoqueInsumo> consultar() {
        List<EstoqueInsumo> estoqueInsumos = estoqueInsumoRepository.findAll();
        return estoqueInsumos;
    }
}
