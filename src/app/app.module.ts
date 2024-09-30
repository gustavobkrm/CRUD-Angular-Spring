import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarAlunoComponent } from './aluno/listar-aluno/listar-aluno.component';
import { ListarCursoComponent } from './curso/listar-curso/listar-curso.component';
import { ModalAlunoComponent } from './aluno/modal-aluno/modal-aluno.component';
import { ModalCursoComponent } from './curso/modal-curso/modal-curso.component';
import { AlunoModule } from './aluno/aluno.module';
import { SharedModule } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursoModule } from './curso/curso.module';
import { HttpClientModule } from '@angular/common/http';
import { ListarMatriculaComponent } from './matricula/listar-matricula/listar-matricula.component';
import { MatriculaModule } from './matricula/matricula.module';

@NgModule({
  declarations: [
    AppComponent,
    ListarAlunoComponent,
    ListarCursoComponent,
    ModalAlunoComponent,
    ModalCursoComponent,
    ListarMatriculaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlunoModule,
    CursoModule,
    MatriculaModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
