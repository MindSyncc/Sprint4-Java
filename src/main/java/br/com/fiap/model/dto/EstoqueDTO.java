package br.com.fiap.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EstoqueDTO(
        @NotNull
        int qtdAtual,
        @NotNull
        int qtdMinima,
        @NotNull
        int qtdMaxima,
        @NotBlank
        String status
) {
}
