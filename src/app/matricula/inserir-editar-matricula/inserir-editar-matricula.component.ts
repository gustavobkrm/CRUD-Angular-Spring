import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno, Curso, Matricula } from '../../shared';
import { MatriculaService } from '../services/matricula.service';
import { AlunoService } from '../../aluno/services/aluno.service';
import { CursoService } from '../../curso/services/curso.service';

@Component({
  selector: 'app-inserir-editar-matricula',
  templateUrl: './inserir-editar-matricula.component.html',
  styleUrl: './inserir-editar-matricula.component.css',
})
export class InserirEditarMatriculaComponent implements OnInit {
  @ViewChild('formMatricula') formMatricula!: NgForm;
  novoMatricula: boolean = true;
  matricula: Matricula = new Matricula();
  id!: string;
  loading!: boolean;
  mensagem: string = '';
  botaoDesabilitado = false;

  listaAlunos: Aluno[] = [];
  listaCursos: Curso[] = [];

  constructor(
    private matriculaService: MatriculaService,
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.matricula = new Matricula();
    this.listaAlunos = [];
    this.listaCursos = [];
    this.loading = false;
    this.id = this.route.snapshot.params['id'];
    this.novoMatricula = !this.id;

    this.carregarAlunos();
    this.carregarCursos();

    if (!this.novoMatricula) {
      this.matriculaService.buscarPorId(+this.id).subscribe({
        next: (matricula) => {
          if (matricula == null) {
            this.mensagem = 'Erro ao buscar Matricula';
            this.botaoDesabilitado = true;
          } else {
            this.matricula = matricula;
            this.matricula.aluno = this.listaAlunos.find(
              (a) => a.id === matricula.aluno?.id
            );

            this.matricula.curso = this.listaCursos.find(
              (c) => c.id === matricula.curso?.id
            );
            this.botaoDesabilitado = false;
          }
        },
        error: (err) => {
          this.mensagem = 'Erro buscando matricula: ' + err.message;
        },
      });
    }
  }

  carregarAlunos(): void {
    this.alunoService.listarTodos().subscribe({
      next: (alunos) => {
        if (alunos == null) {
          this.mensagem = 'Erro ao buscar Alunos';
          this.botaoDesabilitado = true;
        } else {
          this.botaoDesabilitado = false;
          this.listaAlunos = alunos;
        }
      },
      error: (err) =>
        (this.mensagem = 'Erro ao carregar alunos: ' + err.message),
    });
  }

  carregarCursos(): void {
    this.cursoService.listarTodos().subscribe({
      next: (cursos) => {
        if (cursos == null) {
          this.mensagem = 'Erro ao buscar Cursos';
          this.botaoDesabilitado = true;
        } else {
          this.listaCursos = cursos;
          this.botaoDesabilitado = false;
        }
      },
      error: (err) =>
        (this.mensagem = 'Erro ao carregar cursos: ' + err.message),
    });
  }

  salvar(): void {
    this.loading = true;
    if (this.formMatricula.form.valid) {
      if (this.novoMatricula) {
        this.matriculaService.inserir(this.matricula).subscribe({
          next: (matricula) => {
            this.loading = false;
            this.router.navigate(['matriculas']);
          },
          error: (err) => {
            if ((err.status = 409)) this.mensagem = 'Matricula já existe!';
            else this.mensagem = 'Erro salvando matricula: ' + err.message;
          },
        });
      } else {
        this.matriculaService.atualizar(this.matricula).subscribe({
          next: (matricula) => {
            this.loading = false;
            this.router.navigate(['matriculas']);
          },
          error: (err) => {
            this.mensagem = 'Erro ao atualizar matricula: ' + err.message;
          },
        });
      }
    }
    this.loading = false;
  }
}
