import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { CursoService } from './services/curso.service';
import { InserirEditarCursoComponent } from './inserir-editar-curso/inserir-editar-curso.component';

@NgModule({
  declarations: [InserirEditarCursoComponent],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule],
  providers: [CursoService],
})
export class CursoModule {}
