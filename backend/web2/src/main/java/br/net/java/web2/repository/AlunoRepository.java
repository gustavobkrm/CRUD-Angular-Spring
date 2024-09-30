package br.net.java.web2.repository;

import br.net.java.web2.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Integer> {
    public Optional<Aluno> findById(int id);

    public List<Aluno> findAll();
}
