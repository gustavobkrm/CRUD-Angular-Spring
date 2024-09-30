import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlunoComponent } from './aluno/listar-aluno/listar-aluno.component';
import { ListarCursoComponent } from './curso/listar-curso/listar-curso.component';
import { InserirEditarAlunoComponent } from './aluno/inserir-editar-aluno/inserir-editar-aluno.component';
import { InserirEditarCursoComponent } from './curso/inserir-editar-curso/inserir-editar-curso.component';
import { ListarMatriculaComponent } from './matricula/listar-matricula/listar-matricula.component';
import { InserirEditarMatriculaComponent } from './matricula/inserir-editar-matricula/inserir-editar-matricula.component';

const routes: Routes = [
  { path: '', redirectTo: 'alunos/listar', pathMatch: 'full' },
  { path: 'alunos', redirectTo: 'alunos/listar' },
  { path: 'alunos/listar', component: ListarAlunoComponent },
  { path: 'alunos/novo', component: InserirEditarAlunoComponent },
  { path: 'alunos/editar/:id', component: InserirEditarAlunoComponent },

  { path: 'cursos', redirectTo: 'cursos/listar' },
  { path: 'cursos/listar', component: ListarCursoComponent },
  { path: 'cursos/novo', component: InserirEditarCursoComponent },
  { path: 'cursos/editar/:id', component: InserirEditarCursoComponent },

  { path: 'matriculas', redirectTo: 'matriculas/listar' },
  { path: 'matriculas/listar', component: ListarMatriculaComponent },
  { path: 'matriculas/novo', component: InserirEditarMatriculaComponent },
  { path: 'matriculas/editar/:id', component: InserirEditarMatriculaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
