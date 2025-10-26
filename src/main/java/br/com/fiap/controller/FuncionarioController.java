package br.com.fiap.controller;

import br.com.fiap.model.dto.FuncionarioDTO;
import br.com.fiap.model.entity.Funcionario;
import br.com.fiap.model.entity.Unidade;
import br.com.fiap.model.repository.FuncionarioRepository;
import br.com.fiap.model.repository.UnidadeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UnidadeRepository unidadeRepository;

    // ===== CADASTRAR FUNCIONÁRIO =====
    @PostMapping("/novo")
    public ModelAndView cadastrar(@Valid FuncionarioDTO funcionarioDTO, BindingResult result) {
        if (result.hasErrors()) {
            return new ModelAndView("funcionarios/formulario");
        }

        Unidade unidade = unidadeRepository.findById(funcionarioDTO.idUnidade())
                .orElseThrow(() -> new IllegalArgumentException("Unidade não encontrada"));

        Funcionario funcionario = new Funcionario(funcionarioDTO, unidade);
        funcionarioRepository.save(funcionario);

        return new ModelAndView("redirect:/funcionarios");
    }

    // ===== LOGIN FUNCIONÁRIO =====
    @PostMapping("/login")
    @ResponseBody
    public Funcionario login(@RequestBody FuncionarioDTO funcionarioDTO) {
        Funcionario funcionario = funcionarioRepository.findByFuncional(funcionarioDTO.funcional());
        if (funcionario == null || !funcionario.getSenhaHash().equals(funcionarioDTO.senhaHash())) {
            throw new IllegalArgumentException("Funcional ou senha incorretos!");
        }

        // Oculta a senha
        funcionario.setSenhaHash("Oculto");

        // Retorna DTO com idUnidade, sem expor senha
        return funcionario;
    }
}
