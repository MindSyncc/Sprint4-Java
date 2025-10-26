package br.com.fiap.model.entity;

import br.com.fiap.model.dto.FuncionarioDTO;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "FUNCIONARIOS")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_FUNCIONARIO")
    private Long id;

    @Column(name = "FUNCIONAL", nullable = false, unique = true)
    private String funcional;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "CPF", nullable = false, unique = true)
    private String cpf;

    @Column(name = "DATANASCIMENTO", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "SALARIO", nullable = false)
    private Double salario;

    @Column(name = "DATAINICIO", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "DATATERMINO")
    private LocalDate dataTermino;

    @Column(name = "TURNO", nullable = false)
    private String turno;

    @Column(name = "CARGO", nullable = false)
    private String cargo;

    @Column(name = "SENHAHASH", nullable = false)
    private String senhaHash;

    @Column(name = "PERMISSAO", nullable = false)
    private String permissao;

    @Column(name = "RUA", nullable = false)
    private String rua;

    @Column(name = "NUMERO", nullable = false)
    private String numero;

    @Column(name = "BAIRRO", nullable = false)
    private String bairro;

    @Column(name = "CIDADE", nullable = false, length = 50)
    private String cidade;

    @Column(name = "ESTADO", nullable = false, length = 2)
    private String estado;

    @Column(name = "CEP", nullable = false, length = 10)
    private String cep;

    // chave estrangeira
    @ManyToOne
    @JoinColumn(name = "id_unidade", nullable = false)
    private Unidade unidade;

    // construtores
    public Funcionario() {
    }

    public Funcionario(FuncionarioDTO funcionarioDTO, Unidade unidade) {
        this.funcional = funcionarioDTO.funcional();
        this.nome = funcionarioDTO.nome();
        this.cpf = funcionarioDTO.cpf();
        this.dataNascimento = funcionarioDTO.dataNascimento();
        this.salario = funcionarioDTO.salario();
        this.dataInicio = funcionarioDTO.dataInicio();
        this.dataTermino = funcionarioDTO.dataTermino();
        this.turno = funcionarioDTO.turno();
        this.cargo = funcionarioDTO.cargo();
        this.senhaHash = funcionarioDTO.senhaHash();
        this.permissao = funcionarioDTO.permissao();
        this.rua = funcionarioDTO.rua();
        this.numero = funcionarioDTO.numero();
        this.bairro = funcionarioDTO.bairro();
        this.cidade = funcionarioDTO.cidade();
        this.estado = funcionarioDTO.estado();
        this.cep = funcionarioDTO.cep();
        this.unidade = unidade;
    }

    // getters / setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFuncional() {
        return funcional;
    }

    public void setFuncional(String funcional) {
        this.funcional = funcional;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Double getSalario() {
        return salario;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(LocalDate dataTermino) {
        this.dataTermino = dataTermino;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getSenhaHash() {
        return senhaHash;
    }

    public void setSenhaHash(String senhaHash) {
        this.senhaHash = senhaHash;
    }

    public String getPermissao() {
        return permissao;
    }

    public void setPermissao(String permissao) {
        this.permissao = permissao;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }
}


