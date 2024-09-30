import { Injectable } from '@angular/core';
import { Aluno } from '../../shared';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

const LS_CHAVE = 'alunos';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  BASE_URL = 'http://localhost:8080/alunos';
  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Aluno[] | null> {
    return this.httpClient.get<Aluno[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resp: HttpResponse<Aluno[]>) => {
        if (resp.status != 200) {
          return [];
        } else {
          let lista: Aluno[] = [];

          if (resp.body && resp.body.length > 0) {
            let alun: Aluno = new Aluno();
            resp.body.forEach((a) => {
              alun = new Aluno(a.id, a.nome, a.cpf, a.email, a.dataNasc);
              alun.dateFromRest();
              lista.push(alun);
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

  inserir(aluno: Aluno): Observable<Aluno | null> {
    return this.httpClient
      .post<Aluno>(this.BASE_URL, JSON.stringify(aluno), this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Aluno>) => {
          if (resp.status != 201) return null;
          else {
            let alun: Aluno = new Aluno(
              resp.body?.id,
              resp.body?.nome,
              resp.body?.cpf,
              resp.body?.email,
              resp.body?.dataNasc
            );
            alun.dateFromRest();
            return alun;
          }
        }),
        catchError((e, c) => {
          if (e.status == 400) return of(null);
          else return throwError(() => e);
        })
      );
  }

  buscarPorId(id: number): Observable<Aluno | null> {
    return this.httpClient
      .get<Aluno>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Aluno>) => {
          if (resp.status != 200) return null;
          else return resp.body;
        }),
        catchError((e, c) => {
          if (e.status == 400) return of(null);
          else return throwError(() => e);
        })
      );
  }

  atualizar(aluno: Aluno): Observable<Aluno | null> {
    return this.httpClient
      .put<Aluno>(
        this.BASE_URL + '/' + aluno.id,
        JSON.stringify(aluno),
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<Aluno>) => {
          if (resp.status != 200) return null;
          else {
            let alun: Aluno = new Aluno(
              resp.body?.id,
              resp.body?.nome,
              resp.body?.cpf,
              resp.body?.email,
              resp.body?.dataNasc
            );
            alun.dateFromRest();
            return alun;
          }
        }),
        catchError((e, c) => {
          return throwError(() => e);
        })
      );
  }

  remover(id: number): Observable<Aluno | null> {
    return this.httpClient
      .delete<Aluno>(this.BASE_URL + '/' + id, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<Aluno>) => {
          if (resp.status != 200) return null;
          else {
            let alun: Aluno = new Aluno(
              resp.body?.id,
              resp.body?.nome,
              resp.body?.cpf,
              resp.body?.email,
              resp.body?.dataNasc
            );
            alun.dateFromRest();
            return resp.body;
          }
        }),
        catchError((e, c) => {
          return throwError(() => e);
        })
      );
  }
}
