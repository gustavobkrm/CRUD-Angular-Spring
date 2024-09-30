package br.net.java.web2.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.net.java.web2.model.Matricula;
import br.net.java.web2.repository.MatriculaRepository;

@CrossOrigin
@RestController
public class MatriculaRest {
    @Autowired
    private MatriculaRepository matriculaRepository;

    @GetMapping("/matriculas")
    public ResponseEntity<List<Matricula>> getAll() {
        List<Matricula> lista = matriculaRepository.findAll();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/matriculas/{id}")
    public ResponseEntity<Matricula> getById(@PathVariable("id") int id) {

        Optional<Matricula> matricula = matriculaRepository.findById(Integer.valueOf(id));

        if (matricula.isPresent())
            return ResponseEntity.ok(matricula.get());
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/matriculas")
    public ResponseEntity<Matricula> insertMatricula(@RequestBody Matricula matriculaBody) {
        Optional<Matricula> matricula = matriculaRepository.findById(Integer.valueOf(matriculaBody.getIdMatricula()));

        if (matricula.isPresent())
            return ResponseEntity.status(HttpStatus.CREATED).body(matricula.get());
        else {
            matriculaBody.setIdMatricula(-1);
            matriculaRepository.save(matriculaBody);
            return ResponseEntity.status(HttpStatus.CREATED).body(matriculaBody);
        }
    }

    @PutMapping("matriculas/{id}")
    public ResponseEntity<Matricula> updateMatricula(@PathVariable("id") int id, @RequestBody Matricula matriculaBody) {

        Optional<Matricula> matricula = matriculaRepository.findById(Integer.valueOf(id));

        if (matricula.isPresent()) {
            matriculaBody.setIdMatricula(id);
            matriculaRepository.save(matriculaBody);
            return ResponseEntity.ok(matriculaBody);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("matriculas/{id}")
    public ResponseEntity<Matricula> delete(@PathVariable("id") int id) {
        Optional<Matricula> matricula = matriculaRepository.findById(Integer.valueOf(id));

        if (matricula.isPresent()) {
            matriculaRepository.delete(matricula.get());
            return ResponseEntity.ok(matricula.get());
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
