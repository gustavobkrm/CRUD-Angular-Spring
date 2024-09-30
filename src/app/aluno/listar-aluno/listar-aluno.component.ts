import { Component } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlunoComponent } from '../modal-aluno/modal-aluno.component';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrl: './listar-aluno.component.css',
})
export class ListarAlunoComponent {
  alunos: Aluno[] = [];
  mensagem: string = '';

  constructor(
    private alunoService: AlunoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): Aluno[] {
    this.alunoService.listarTodos().subscribe({
      next: (data: Aluno[] | null) => {
        if (data == null) {
          this.alunos = [];
        } else {
          this.alunos = data;
        }
      },
      error: (err) => {
        this.mensagem = 'Erro ao buscar alunos ' + err.message;
      },
    });
    return this.alunos;
  }

  remover($event: any, aluno: Aluno): void {
    $event.preventDefault();
    if (confirm(`Deseja remover o aluno ${aluno.nome} ?`)) {
      this.alunoService.remover(aluno.id!).subscribe({
        complete: () => {
          this.listarTodos();
        },
      });
      this.alunos = this.listarTodos();
    }
  }

  abrirModal(aluno: Aluno) {
    const modalRef = this.modalService.open(ModalAlunoComponent);
    modalRef.componentInstance.aluno = aluno;
  }
}
