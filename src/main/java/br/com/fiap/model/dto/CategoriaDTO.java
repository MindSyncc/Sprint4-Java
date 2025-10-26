package br.com.fiap.model.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoriaDTO(
        @NotBlank
        String tipoCategoria
) {
}
