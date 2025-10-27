package br.com.fiap.model.entity;

import br.com.fiap.model.dto.PedidoDTO;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    @Column(name = "nome_item", length = 200)
    private String nomeItem;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "data_pedido")
    private LocalDate dataPedido = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = false)
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "id_fornecedor", nullable = false)
    private Fornecedor fornecedor;

    // construtores
    public Pedido() {
    }

    public Pedido(PedidoDTO pedidoDTO, Funcionario funcionario, Fornecedor fornecedor) {
        this.nomeItem = pedidoDTO.nomeItem();
        this.quantidade = pedidoDTO.quantidade();
        this.status = pedidoDTO.status();
        this.dataPedido = pedidoDTO.dataPedido() != null ? pedidoDTO.dataPedido() : LocalDate.now();
        this.funcionario = funcionario;
        this.fornecedor = fornecedor;
    }

    // getters / setters
    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDataPedido() {
        return dataPedido;
    }

    public void setDataPedido(LocalDate dataPedido) {
        this.dataPedido = dataPedido;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }
}
