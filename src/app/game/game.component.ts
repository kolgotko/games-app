import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';

import { GameInterface } from '../interfaces/game.interface';
import { GenreInterface } from '../interfaces/genre.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import { DeveloperInterface } from '../interfaces/developer.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameId = 0;
  title = '';
  description = '';
  developer: DeveloperInterface;
  publisher: PublisherInterface;
  genres: GenreInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private gamesService: GamesService,
  ) { }

  ngOnInit() {

    this.gameId = this.router.snapshot.params.id;
    this.loadGame();

  }

  loadGame() {

    this.gamesService.getGame(this.gameId)
      .subscribe(game => {

        this.title = game.name;
        this.description = game.description;
        this.genres = game.gameXrefGenre.map(xref => xref.genre);
        this.developer = game.developer;
        this.publisher = game.publisher;

      });

  }

}
