import { Component, OnInit, OnDestroy, AfterViewChecked, EventEmitter } from '@angular/core';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';
import { GameInterface } from '../interfaces/game.interface';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {

  allGames: GameInterface[];
  allDevelopers: DeveloperInterface[];
  allPublishers: PublisherInterface[];

  gamesSlider: Swiper;
  developersSlider: Swiper;
  publishersSlider: Swiper;

  load = false;

  constructor(
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
  ) { }

  async ngOnInit() {

    console.log('ngOnInit');
    this.allGames = await this.gamesService
      .getAllGames()
      .toPromise();

    this.allDevelopers = await this.developersService
      .getAllDevelopers()
      .toPromise();

    this.allPublishers = await this.publishersService
      .getAllPublishers()
      .toPromise();

    this.load = true;

  }

  ngAfterViewChecked() {

    if (this.load && !this.gamesSlider) {

      this.gamesSlider = new Swiper('.games-slider', {
        slidesPerView: 'auto',
        mousewheel: true,
        freeMode: true,
      });

    }

    if (this.load && !this.developersSlider) {
      this.developersSlider = new Swiper('.developers-slider', {
        slidesPerView: 'auto',
        mousewheel: true,
        freeMode: true,
      });
    }

    if (this.load && !this.publishersSlider) {

      this.publishersSlider = new Swiper('.publishers-slider', {
        slidesPerView: 'auto',
        mousewheel: true,
        freeMode: true,
      });

    }

  }

  ngOnDestroy() {

    if (this.gamesSlider) this.gamesSlider.destroy();
    if (this.developersSlider) this.developersSlider.destroy();
    if (this.publishersSlider) this.publishersSlider.destroy();

  }

}
