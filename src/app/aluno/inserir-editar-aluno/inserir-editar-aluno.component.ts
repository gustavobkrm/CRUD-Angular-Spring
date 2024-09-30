import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../shared';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-inserir-editar-aluno',
  templateUrl: './inserir-editar-aluno.component.html',
  styleUrl: './inserir-editar-aluno.component.css',
})
export class InserirEditarAlunoComponent implements OnInit {
  @ViewChild('formAluno') formAluno!: NgForm;
  novoAluno: boolean = true;
  aluno: Aluno = new Aluno();
  id!: string;
  loading!: boolean;
  mensagem: string = '';
  botaoDesabilitado = false;

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aluno = new Aluno();
    this.loading = false;

    this.id = this.route.snapshot.params['id'];
    this.novoAluno = !this.id;

    if (!this.novoAluno) {
      this.alunoService.buscarPorId(+this.id).subscribe({
        next: (aluno) => {
          if (aluno == null) {
            this.mensagem = 'Erro ao buscar Aluno';
            this.botaoDesabilitado = true;
          } else {
            this.aluno = aluno;
            this.botaoDesabilitado = false;
          }
        },
        error: (err) => {
          this.mensagem = 'Erro buscando aluno: ' + err.message;
        },
      });
    }
  }

  salvar(): void {
    this.loading = true;
    if (this.formAluno.form.valid) {
      if (this.novoAluno) {
        this.alunoService.inserir(this.aluno).subscribe({
          next: (aluno) => {
            this.loading = false;
            this.router.navigate(['alunos']);
          },
          error: (err) => {
            if ((err.status = 409)) this.mensagem = 'Aluno já existe!';
            else this.mensagem = 'Erro salvando aluno: ' + err.message;
          },
        });
      } else {
        this.alunoService.atualizar(this.aluno).subscribe({
          next: (aluno) => {
            this.loading = false;
            this.router.navigate(['alunos']);
          },
          error: (err) => {
            this.mensagem = 'Erro ao atualizar aluno: ' + err.message;
          },
        });
      }
    }
    this.loading = false;
  }
}
