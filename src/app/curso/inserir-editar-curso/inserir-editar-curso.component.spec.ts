import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirEditarCursoComponent } from './inserir-editar-curso.component';

describe('InserirEditarCursoComponent', () => {
  let component: InserirEditarCursoComponent;
  let fixture: ComponentFixture<InserirEditarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InserirEditarCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirEditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
