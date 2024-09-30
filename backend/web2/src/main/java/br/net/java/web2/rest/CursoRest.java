package br.net.java.web2.rest;

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

import java.util.List;
import java.util.Optional;

import br.net.java.web2.model.Curso;
import br.net.java.web2.repository.CursoRepository;

@CrossOrigin
@RestController
public class CursoRest {
    @Autowired
    private CursoRepository cursoRepository;

    @GetMapping("/cursos")
    public ResponseEntity<List<Curso>> getAll() {
        List<Curso> lista = cursoRepository.findAll();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/cursos/{id}")
    public ResponseEntity<Curso> getById(@PathVariable("id") int id) {

        Optional<Curso> curso = cursoRepository.findById(Integer.valueOf(id));

        if (curso.isPresent())
            return ResponseEntity.ok(curso.get());
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/cursos")
    public ResponseEntity<Curso> insertCurso(@RequestBody Curso cursoBody) {
        Optional<Curso> curso = cursoRepository.findById(Integer.valueOf(cursoBody.getId()));

        if (curso.isPresent())
            return ResponseEntity.status(HttpStatus.CREATED).body(curso.get());
        else {
            cursoBody.setId(-1);
            cursoRepository.save(cursoBody);
            return ResponseEntity.status(HttpStatus.CREATED).body(cursoBody);
        }
    }

    @PutMapping("cursos/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable("id") int id, @RequestBody Curso cursoBody) {

        Optional<Curso> curso = cursoRepository.findById(Integer.valueOf(id));

        if (curso.isPresent()) {
            cursoBody.setId(id);
            cursoRepository.save(cursoBody);
            return ResponseEntity.ok(cursoBody);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("cursos/{id}")
    public ResponseEntity<Curso> delete(@PathVariable("id") int id) {
        Optional<Curso> curso = cursoRepository.findById(Integer.valueOf(id));

        if (curso.isPresent()) {
            cursoRepository.delete(curso.get());
            return ResponseEntity.ok(curso.get());
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
