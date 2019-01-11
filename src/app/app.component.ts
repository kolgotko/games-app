import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { DevelopersService } from './developers.service';
import { PublishersService } from './publishers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'games-app';
  allGames;
  allDevelopers;
  allPublishers;

  constructor(
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
  ) { }

  ngOnInit() {

    this.allGames = this.gamesService.getAllGames();
    this.allDevelopers = this.developersService.getAllDevelopers();
    this.allPublishers = this.publishersService.getAllPublishers();

  }

}
