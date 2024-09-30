import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AlunoService } from './services/aluno.service';
import { InserirEditarAlunoComponent } from './inserir-editar-aluno/inserir-editar-aluno.component';

@NgModule({
  declarations: [InserirEditarAlunoComponent],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule],
  providers: [AlunoService],
})
export class AlunoModule {}
