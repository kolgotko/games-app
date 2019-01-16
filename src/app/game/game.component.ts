import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../games.service';

import { GameInterface } from '../interfaces/game.interface';
import { GenreInterface } from '../interfaces/genre.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import { DeveloperInterface } from '../interfaces/developer.interface';

import * as Noty from 'noty';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameId = 0;
  game: GameInterface;
  gameGenres: GenreInterface[] = [];
  load = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
  ) { }

  async ngOnInit() {

    this.gameId = this.route.snapshot.params.id;
    await this.loadGame();

  }

  async loadGame() {

    try {

      const game = await this.gamesService
        .getGame(this.gameId)
        .toPromise();

      this.game = game;
      this.gameGenres = game.gameXrefGenre.map(xref => xref.genre);

      this.load = true;

    } catch (error) {

      new Noty({
        text: `Error loading game. Please try later. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

      this.router.navigate(['/']);

    }

  }

}
