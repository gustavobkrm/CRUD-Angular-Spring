import { Component, Input } from '@angular/core';
import { Aluno } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-aluno',
  templateUrl: './modal-aluno.component.html',
  styleUrl: './modal-aluno.component.css',
})
export class ModalAlunoComponent {
  @Input() aluno: Aluno = new Aluno();
  constructor(public activeModal: NgbActiveModal) {}
}
