package br.com.fiap.model.dto;

import jakarta.validation.constraints.Positive;

public record EstoqueInsumoDTO(
        @Positive
        int quantidade
) {}
