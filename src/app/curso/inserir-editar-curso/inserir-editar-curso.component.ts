import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../shared';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-inserir-editar-curso',
  templateUrl: './inserir-editar-curso.component.html',
  styleUrl: './inserir-editar-curso.component.css',
})
export class InserirEditarCursoComponent implements OnInit {
  @ViewChild('formCurso') formCurso!: NgForm;
  novoCurso: boolean = true;
  curso: Curso = new Curso();
  id!: string;
  loading!: boolean;
  mensagem: string = '';
  botaoDesabilitado = false;

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.curso = new Curso();
    this.loading = false;

    this.id = this.route.snapshot.params['id'];
    this.novoCurso = !this.id;

    if (!this.novoCurso) {
      this.cursoService.buscarPorId(+this.id).subscribe({
        next: (curso) => {
          if (curso == null) {
            this.mensagem = 'Erro ao buscar Curso';
            this.botaoDesabilitado = true;
          } else {
            this.curso = curso;
            this.botaoDesabilitado = false;
          }
        },
        error: (err) => {
          this.mensagem = 'Erro buscando curso: ' + err.message;
        },
      });
    }
  }

  salvar(): void {
    this.loading = true;
    if (this.formCurso.form.valid) {
      if (this.novoCurso) {
        this.cursoService.inserir(this.curso).subscribe({
          next: (curso) => {
            this.loading = false;
            this.router.navigate(['cursos']);
          },
          error: (err) => {
            if ((err.status = 409)) this.mensagem = 'Curso já existe!';
            else this.mensagem = 'Erro salvando curso: ' + err.message;
          },
        });
      } else {
        this.cursoService.atualizar(this.curso).subscribe({
          next: (curso) => {
            this.loading = false;
            this.router.navigate(['cursos']);
          },
          error: (err) => {
            this.mensagem = 'Erro ao atualizar curso: ' + err.message;
          },
        });
      }
    }
    this.loading = false;
  }
}
