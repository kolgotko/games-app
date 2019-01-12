import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
