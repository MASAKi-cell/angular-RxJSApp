import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROS } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public heros: Hero[] = [];
  public selectHeros!: Hero;

  constructor(private Heroservice: HeroService,) { }

  ngOnInit(): void{
    this.getHeros();
  }

  getHeros(): void{
    this.Heroservice.getHeroes()
    .subscribe(
      heros => this.heros = heros
      );
  }

  add(name: string): void{
    name = name.trim();
    if(!name){
      return ;
    }
    this.Heroservice.addHero( {name} as Hero)
    .subscribe( 
      heros => this.heros.push(heros)
      );
  }

  delete(hero: Hero): void{
    this.heros = this.heros.filter(h => h !== hero);
    this.Heroservice.deleteHero(hero.id).subscribe();
  }

}
