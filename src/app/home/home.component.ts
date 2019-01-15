import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  allGames;
  allDevelopers;
  allPublishers;

  gamesSlider: Swiper;
  developersSlider: Swiper;
  publishersSlider: Swiper;

  constructor(
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
  ) { }

  async ngOnInit() {

    this.allGames = await this.gamesService
      .getAllGames()
      .toPromise();

    this.allDevelopers = await this.developersService
      .getAllDevelopers()
      .toPromise();

    this.allPublishers = await this.publishersService
      .getAllPublishers()
      .toPromise();

  }

  ngAfterViewInit() {

    this.gamesSlider = new Swiper('.games-slider', {});
    this.developersSlider = new Swiper('.developers-slider', {});
    this.publishersSlider = new Swiper('.publishers-slider', {});

  }

  ngOnDestroy() {

    this.gamesSlider.destroy();
    this.developersSlider.destroy();
    this.publishersSlider.destroy();

  }

}
