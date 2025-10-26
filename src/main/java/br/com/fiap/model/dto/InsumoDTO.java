package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;


public record InsumoDTO(
        @NotBlank
        String nome,
        @NotBlank
        String lote,
        @NotNull
        LocalDate dataValidade,
        @NotBlank
        String unidadeMedida,
        @NotBlank
        String codigoDeBarras,
        @NotNull
        @PositiveOrZero
        Long idCategoria
) {
}



