import { Aluno } from './aluno.model';
import { Curso } from './curso.model';

export class Matricula {
  constructor(
    public idMatricula?: number,
    public aluno?: Aluno,
    public curso?: Curso,
    public dataMatricula?: string,
    public nota?: number
  ) {}
  dateToRest() {
    if (this.dataMatricula) {
      let dia, mes, ano;

      if (this.dataMatricula.indexOf('/') == -1) {
        dia = this.dataMatricula.substring(0, 2);
        mes = this.dataMatricula.substring(2, 4);
        ano = this.dataMatricula.substring(4);
      } else [dia, mes, ano] = this.dataMatricula.split('/');
      this.dataMatricula = `${ano}-${mes}-${dia}`;
    }
  }

  dateFromRest() {
    if (this.dataMatricula) {
      const [ano, mes, dia] = this.dataMatricula.split('-');
      this.dataMatricula = `${ano}-${mes}-${dia}`;
    }
  }
}
