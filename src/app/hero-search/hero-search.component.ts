import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  public heroes$?: Observable<Hero[]>; //Observableを宣言
  private searchTime = new Subject<string>(); //インスタンス化
  

  constructor(
    private heroservicew: HeroService,
  ) { }

  ngOnInit(): void {
    this.heroes$ = <any>this.searchTime.pipe(

      debounceTime(300), //オブザーバルを流す時間を制御する。
      distinctUntilChanged(), //連続で同じ値が出力された場合、Observableから重複した値を取り除く。
      switchMap((value: string) => this.heroservicew.searchHeros(value)),
    );
  }

  search(value: string): void {
    this.searchTime.next(value);
  }

}
