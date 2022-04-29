import { Injectable } from '@angular/core';
import { Hero } from './model/hero';
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

  /**
   * メッセージを作成する。
   * @param message 
   * @returns {void}
   */
  private log(message: string): void{
    this.messageservice.add(`HeroService: ${message}`);
  }

  /**
   * 空の結果を返して、アプリを持続可能にする。
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // httpオプションの設定。
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /**
   * ヒーロ情報の一覧を取得する。
   * @returns {Observable<Hero[]>}
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * Id情報からヒーロ情報を取得する。
   * @param id 
   * @returns {Observable<Hero[]>}
   */
  getHero(id:number): Observable<Hero[]> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero[]>(`getHero id=${id}`))
    );
  }

  /**
   * ヒーロー情報をアップデートする。
   * @param hero 
   * @returns {any}
   */
  updateHero(hero: Hero): any {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  /**
   * ヒーロー情報を追加する。
   * @param hero 
   * @returns {Observable<Hero>}
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**
   * ヒーロー情報を削除する。
   * @param id 
   * @returns {Observable<Hero>}
   */
  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /**
   * ヒーロー情報を検索する。
   * @param term 
   * @returns {Observable<Hero>}
   */
  searchHeros(term: string): Observable<Hero>{
    if(!term.trim()){
      return of([] as any); //空の配列を返す。
    }
    return this.http.get<Hero>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero>('searchHeroes'))
    );
  }
  
}
