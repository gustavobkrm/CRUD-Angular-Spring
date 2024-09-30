import { Component } from '@angular/core';
import { MatriculaService } from '../services/matricula.service';
import { Matricula } from '../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrl: './listar-matricula.component.css',
})
export class ListarMatriculaComponent {
  matriculas: Matricula[] = [];
  mensagem: string = '';

  constructor(
    private matriculaService: MatriculaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): Matricula[] {
    this.matriculaService.listarTodos().subscribe({
      next: (data: Matricula[] | null) => {
        if (data == null) {
          this.matriculas = [];
        } else {
          this.matriculas = data;
        }
      },
      error: (err) => {
        this.mensagem = 'Erro ao buscar matriculas ' + err.message;
      },
    });
    return this.matriculas;
  }

  remover($event: any, matricula: Matricula): void {
    $event.preventDefault();
    if (confirm(`Deseja remover a matricula ${matricula.idMatricula} ?`)) {
      this.matriculaService.remover(matricula.idMatricula!).subscribe({
        complete: () => {
          this.listarTodos();
        },
      });
      this.matriculas = this.listarTodos();
    }
  }
}
