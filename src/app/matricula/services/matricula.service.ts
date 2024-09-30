import { Injectable } from '@angular/core';
import { Matricula } from '../../shared';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

const LS_CHAVE = 'matriculas';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  BASE_URL = 'http://localhost:8080/matriculas';
  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Matricula[] | null> {
    return this.httpClient
      .get<Matricula[]>(this.BASE_URL, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Matricula[]>) => {
          if (resp.status != 200) {
            return [];
          } else {
            let lista: Matricula[] = [];

            if (resp.body && resp.body.length > 0) {
              let mat: Matricula = new Matricula();
              resp.body.forEach((a) => {
                mat = new Matricula(
                  a.idMatricula,
                  a.aluno,
                  a.curso,
                  a.dataMatricula,
                  a.nota
                );
                mat.dateFromRest();
                lista.push(mat);
              });
            }
            return lista;
          }
        }),
        catchError((e, c) => {
          if (e.status == 404) {
            return of([]);
          } else {
            return throwError(() => e);
          }
        })
      );
  }

  inserir(matricula: Matricula): Observable<Matricula | null> {
    return this.httpClient
      .post<Matricula>(
        this.BASE_URL,
        JSON.stringify(matricula),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Matricula>) => {
          if (resp.status != 201) return null;
          else {
            let mat: Matricula = new Matricula(
              resp.body?.idMatricula,
              resp.body?.aluno,
              resp.body?.curso,
              resp.body?.dataMatricula,
              resp.body?.nota
            );
            mat.dateFromRest();
            return mat;
          }
        }),
        catchError((e, c) => {
          if (e.status == 400) return of(null);
          else return throwError(() => e);
        })
      );
  }

  buscarPorId(id: number): Observable<Matricula | null> {
    return this.httpClient
      .get<Matricula>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Matricula>) => {
          if (resp.status != 200) return null;
          else return resp.body;
        }),
        catchError((e, c) => {
          if (e.status == 400) return of(null);
          else return throwError(() => e);
        })
      );
  }

  atualizar(matricula: Matricula): Observable<Matricula | null> {
    return this.httpClient
      .put<Matricula>(
        this.BASE_URL + '/' + matricula.idMatricula,
        JSON.stringify(matricula),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Matricula>) => {
          if (resp.status != 200) return null;
          else {
            let mat: Matricula = new Matricula(
              resp.body?.idMatricula,
              resp.body?.aluno,
              resp.body?.curso,
              resp.body?.dataMatricula,
              resp.body?.nota
            );
            mat.dateFromRest();
            return mat;
          }
        }),
        catchError((e, c) => {
          return throwError(() => e);
        })
      );
  }

  remover(id: number): Observable<Matricula | null> {
    return this.httpClient
      .delete<Matricula>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Matricula>) => {
          if (resp.status != 200) return null;
          else {
            let mat: Matricula = new Matricula(
              resp.body?.idMatricula,
              resp.body?.aluno,
              resp.body?.curso,
              resp.body?.dataMatricula,
              resp.body?.nota
            );
            mat.dateFromRest();
            return resp.body;
          }
        }),
        catchError((e, c) => {
          return throwError(() => e);
        })
      );
  }
}
