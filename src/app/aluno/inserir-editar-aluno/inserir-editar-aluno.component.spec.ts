import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarAlunoComponent } from './inserir-editar-aluno.component';

describe('InserirEditarAlunoComponent', () => {
  let component: InserirEditarAlunoComponent;
  let fixture: ComponentFixture<InserirEditarAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirEditarAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirEditarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
