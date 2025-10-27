package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record PedidoDTO(
        @NotBlank
        String nomeItem,
        @NotNull
        @Positive
        Integer quantidade,

        @NotBlank
        String status,

        LocalDate dataPedido,

        @NotNull
        Long idFuncionario,

        @NotNull
        Long idFornecedor
) {}
