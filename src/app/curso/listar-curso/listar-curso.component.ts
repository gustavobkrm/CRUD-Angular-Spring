import { Component } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { Curso } from '../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCursoComponent } from '../modal-curso/modal-curso.component';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css',
})
export class ListarCursoComponent {
  cursos: Curso[] = [];
  mensagem: string = '';

  constructor(
    private cursoService: CursoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): Curso[] {
    this.cursoService.listarTodos().subscribe({
      next: (data: Curso[] | null) => {
        if (data == null) {
          this.cursos = [];
        } else {
          this.cursos = data;
        }
      },
      error: (err) => {
        this.mensagem = 'Erro ao buscar cursos ' + err.message;
      },
    });
    return this.cursos;
  }

  remover($event: any, curso: Curso): void {
    $event.preventDefault();
    if (confirm(`Deseja remover o curso ${curso.nome} ?`)) {
      this.cursoService.remover(curso.id!).subscribe({
        complete: () => {
          this.listarTodos();
        },
      });
      this.cursos = this.listarTodos();
    }
  }

  abrirModal(curso: Curso) {
    const modalRef = this.modalService.open(ModalCursoComponent);
    modalRef.componentInstance.curso = curso;
  }
}
