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

  ngOnInit(): void {
    this.getHeros();
  }

  getHeros() {
    this.Heroservice.getHeroes().subscribe( heros => this.heros = heros);
  }
}
