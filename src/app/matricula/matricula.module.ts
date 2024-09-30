import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirEditarMatriculaComponent } from './inserir-editar-matricula/inserir-editar-matricula.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { MatriculaService } from './services/matricula.service';

@NgModule({
  declarations: [InserirEditarMatriculaComponent],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule],
  providers: [MatriculaService],
})
export class MatriculaModule {}
