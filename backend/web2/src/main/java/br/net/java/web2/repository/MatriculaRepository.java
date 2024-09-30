package br.net.java.web2.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.java.web2.model.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Integer> {
    public Optional<Matricula> findByIdMatricula(int id);

    public List<Matricula> findAll();
}
