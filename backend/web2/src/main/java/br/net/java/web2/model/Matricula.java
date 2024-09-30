package br.net.java.web2.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "matricula")
@NoArgsConstructor
@AllArgsConstructor
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    @Getter
    @Setter
    private int idMatricula;

    @ManyToOne
    @JoinColumn(name = "id_curso", referencedColumnName = "id")
    @Getter
    @Setter
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "id_aluno", referencedColumnName = "id")
    @Getter
    @Setter
    private Aluno aluno;

    @Column(name = "data_matricula")
    @Getter
    @Setter
    private LocalDate dataMatricula;

    @Column(name = "nota")
    @Getter
    @Setter
    private int nota;
}
