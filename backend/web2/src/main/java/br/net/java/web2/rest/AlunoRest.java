package br.net.java.web2.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import br.net.java.web2.model.Aluno;
import br.net.java.web2.repository.AlunoRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin
@RestController
public class AlunoRest {

        @Autowired
        private AlunoRepository alunoRepository;

        @GetMapping("/alunos")
        public ResponseEntity<List<Aluno>> getAll() {
                List<Aluno> lista = alunoRepository.findAll();
                return ResponseEntity.ok(lista);
        }

        @GetMapping("/alunos/{id}")
        public ResponseEntity<Aluno> getById(@PathVariable("id") int id) {

                Optional<Aluno> aluno = alunoRepository.findById(Integer.valueOf(id));

                if (aluno.isPresent())
                        return ResponseEntity.ok(aluno.get());
                else
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        @PostMapping("/alunos")
        public ResponseEntity<Aluno> insertAluno(@RequestBody Aluno alunoBody) {
                Optional<Aluno> aluno = alunoRepository.findById(Integer.valueOf(alunoBody.getId()));

                if (aluno.isPresent())
                        return ResponseEntity.status(HttpStatus.CREATED).body(aluno.get());
                else {
                        alunoBody.setId(-1);
                        alunoRepository.save(alunoBody);
                        return ResponseEntity.status(HttpStatus.CREATED).body(alunoBody);
                }
        }

        @PutMapping("alunos/{id}")
        public ResponseEntity<Aluno> updateAluno(@PathVariable("id") int id, @RequestBody Aluno alunoBody) {

                Optional<Aluno> aluno = alunoRepository.findById(Integer.valueOf(id));

                if (aluno.isPresent()) {
                        alunoBody.setId(id);
                        alunoRepository.save(alunoBody);
                        return ResponseEntity.ok(alunoBody);
                } else
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        @DeleteMapping("alunos/{id}")
        public ResponseEntity<Aluno> delete(@PathVariable("id") int id) {
                Optional<Aluno> aluno = alunoRepository.findById(Integer.valueOf(id));

                if (aluno.isPresent()) {
                        alunoRepository.delete(aluno.get());
                        return ResponseEntity.ok(aluno.get());
                } else
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

}
