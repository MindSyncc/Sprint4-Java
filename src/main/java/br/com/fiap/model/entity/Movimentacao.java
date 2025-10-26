package br.com.fiap.model.entity;


import br.com.fiap.model.dto.MovimentacaoDTO;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity(name = "movimentacao")
@Table(name = "MOVIMENTACOES")

public class Movimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimentacoes")
    private Long idMovimentacao;

    @Column(name = "MOTIVO")
    private String motivo;

    @Column(name = "DATA_HORA_ENTRADA")
    private LocalDateTime dataHoraEntrada;

    @Column(name = "DATA_HORA_SAIDA")
    private LocalDateTime dataHoraSaida;

    @Column(name = "TIPO_MOVIMENTACAO")
    private String tipoMovimentacao;

    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "ID_FUNCIONARIO")
    private Funcionario funcionario;

    // construtores
    public Movimentacao() {
    }

    public Movimentacao(MovimentacaoDTO movimentacaoDTO, Funcionario funcionario) {
        this.motivo = movimentacaoDTO.motivo();
        this.dataHoraEntrada = movimentacaoDTO.dataHoraEntrada();
        this.dataHoraSaida = movimentacaoDTO.dataHoraSaida();
        this.tipoMovimentacao = movimentacaoDTO.tipoMovimentacao();
        this.quantidade = movimentacaoDTO.quantidade();
        this.funcionario = funcionario;
    }

    // getters / setters
    public Long getIdMovimentacao() {
        return idMovimentacao;
    }

    public void setIdMovimentacao(Long idMovimentacao) {
        this.idMovimentacao = idMovimentacao;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public LocalDateTime getDataHoraEntrada() {
        return dataHoraEntrada;
    }

    public void setDataHoraEntrada(LocalDateTime dataHoraEntrada) {
        this.dataHoraEntrada = dataHoraEntrada;
    }

    public LocalDateTime getDataHoraSaida() {
        return dataHoraSaida;
    }

    public void setDataHoraSaida(LocalDateTime dataHoraSaida) {
        this.dataHoraSaida = dataHoraSaida;
    }

    public String getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public void setTipoMovimentacao(String tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }
}
