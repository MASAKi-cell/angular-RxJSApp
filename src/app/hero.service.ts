import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROS } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageservice: MessageService
    ) { }

  private log(message: string){
    this.messageservice.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // consoleにエラーを出力する。
      this.log(`${operation} failed: ${error.message}`); //ユーザーへの開示のためにエラーの変換処理を改善する。
      return of(result as T); // 空の結果を返して、アプリを持続可能にする。
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id:number): Observable<Hero[]> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero[]>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero){
    return this.http.put(this.heroesUrl,hero,this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
}
