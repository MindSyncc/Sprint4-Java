package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;

public record FornecedorDTO(

        @NotBlank
        String nomeFornecedor,

        @NotBlank
        @Pattern(regexp = "^[0-9]{8,20}$", message = "Telefone inválido")
        String telefone,

        @NotBlank
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank
        @Pattern(regexp = "^[0-9]{14}$", message = "CNPJ deve conter 14 dígitos numéricos")
        String cnpj,

        @NotBlank
        String rua,

        @NotBlank
        String numero,

        @NotBlank
        String bairro,

        @NotBlank
        String cidade,

        @NotBlank
        @Size(min = 2, max = 2, message = "O estado deve conter 2 caracteres (UF)")
        String estado,

        @NotBlank
        @Pattern(regexp = "^[0-9]{5}-?[0-9]{3}$", message = "CEP inválido")
        String cep
) {}
