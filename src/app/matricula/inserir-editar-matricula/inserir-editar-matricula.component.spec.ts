import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarMatriculaComponent } from './inserir-editar-matricula.component';

describe('InserirEditarMatriculaComponent', () => {
  let component: InserirEditarMatriculaComponent;
  let fixture: ComponentFixture<InserirEditarMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirEditarMatriculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirEditarMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
