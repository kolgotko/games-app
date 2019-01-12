import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';

import { Game } from '../interfaces/game';
import { Genre } from '../interfaces/genre';
import { Publisher } from '../interfaces/publisher';
import { Developer } from '../interfaces/developer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  title = "";
  description = "";
  developer: Developer;
  publisher: Publisher;
  genres: Genre[] = [];

  constructor(
    private router: ActivatedRoute,
    private gamesService: GamesService,
  ) { }

  ngOnInit() {

    let id = this.router.snapshot.params.id;

    this.gamesService.getGame(id)
      .subscribe(game => {

        this.title = game.name;
        this.description = game.description;
        this.genres = game.gameXrefGenre.map(xref => xref.genre);
        this.developer = game.developer;
        this.publisher = game.publisher;

      });

  }

}
