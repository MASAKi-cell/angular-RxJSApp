import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(
    private service: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.service.getHeroes().subscribe((heros) => this.heroes = heros.slice(1,5));
  }

}
