package br.com.fiap.controller;

import br.com.fiap.model.dto.PedidoDTO;
import br.com.fiap.model.entity.Fornecedor;
import br.com.fiap.model.entity.Funcionario;
import br.com.fiap.model.entity.Pedido;
import br.com.fiap.model.repository.FornecedorRepository;
import br.com.fiap.model.repository.FuncionarioRepository;
import br.com.fiap.model.repository.PedidoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class PedidoController {
    @Autowired
    PedidoRepository pedidoRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    FornecedorRepository fornecedorRepository;

    @GetMapping("/pedidos")
    public List<Pedido> consultar() {
        List<Pedido> pedidos = pedidoRepository.findAll();

        return pedidos;
    }

    @PostMapping("/pedidos")
    public Pedido adicionar(@Valid @RequestBody PedidoDTO pedidoDTO, BindingResult result) {
        if (result.hasErrors()) {
            throw new IllegalArgumentException("Campos inválidos na criação do pedido");
        }

        // Verifica se o funcionário existe
        Funcionario funcionario = funcionarioRepository.findById(pedidoDTO.idFuncionario())
                .orElseThrow(() -> new IllegalArgumentException("Funcionário inválido"));

        // Verifica se o fornecedor existe
        Fornecedor fornecedor = fornecedorRepository.findById(pedidoDTO.idFornecedor())
                .orElseThrow(() -> new IllegalArgumentException("Fornecedor inválido"));
        Pedido pedido = new Pedido(pedidoDTO, funcionario, fornecedor);

        // salva no banco
        pedidoRepository.save(pedido);

        return pedido;
    }
}
