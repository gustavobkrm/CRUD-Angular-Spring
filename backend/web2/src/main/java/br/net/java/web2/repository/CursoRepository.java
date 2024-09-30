package br.net.java.web2.repository;

import java.util.Optional;
import java.util.List;
import br.net.java.web2.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Integer> {
    public Optional<Curso> findById(int id);

    public List<Curso> findAll();
}
