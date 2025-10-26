package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record FuncionarioDTO(
        @NotBlank
        String funcional,
        @NotBlank
        String nome,
        @NotBlank
        String cpf,
        @NotNull
        @Past
        LocalDate dataNascimento,
        @NotNull
        @Positive
        Double salario,
        @NotNull
        @PastOrPresent
        LocalDate dataInicio,
        LocalDate dataTermino,
        @NotBlank
        String turno,
        @NotBlank
        String cargo,
        @NotBlank
        String senhaHash,
        @NotBlank
        String permissao,
        @NotBlank
        String rua,
        @NotBlank
        String numero,
        @NotBlank
        String bairro,
        @NotBlank
        String cidade,
        @NotBlank
        String estado,
        @NotBlank
        String cep,
        @NotNull
        Long idUnidade
) {}
