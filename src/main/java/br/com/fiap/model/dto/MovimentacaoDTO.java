package br.com.fiap.model.dto;


import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record MovimentacaoDTO(
        String motivo,
        LocalDateTime dataHoraEntrada,
        LocalDateTime dataHoraSaida,
        @NotNull
        String tipoMovimentacao,
        @NotNull
        Integer quantidade,
        @NotNull
        Long idFuncionario
) {}