export class Aluno {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public email?: string,
    public dataNasc?: string
  ) {}

  dateToRest() {
    if (this.dataNasc) {
      let dia, mes, ano;

      if (this.dataNasc.indexOf('/') == -1) {
        dia = this.dataNasc.substring(0, 2);
        mes = this.dataNasc.substring(2, 4);
        ano = this.dataNasc.substring(4);
      } else [dia, mes, ano] = this.dataNasc.split('/');
      this.dataNasc = `${ano}-${mes}-${dia}`;
    }
  }

  dateFromRest() {
    if (this.dataNasc) {
      const [ano, mes, dia] = this.dataNasc.split('-');
      this.dataNasc = `${ano}-${mes}-${dia}`;
    }
  }
}
