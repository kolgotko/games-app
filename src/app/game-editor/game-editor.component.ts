import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';
import { GenresService } from '../genres.service';
import { Game } from '../interfaces/game';
import { Developer } from '../interfaces/developer';
import { Publisher } from '../interfaces/publisher';
import { Genre } from '../interfaces/genre';
import { GameXrefGenre } from '../interfaces/game-xref-genre';

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent implements OnInit {

  gameId: number = 0;
  game: Game;
  publishers: Publisher[] = [];
  developers: Developer[] = [];
  genres: Genre[];
  gameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
    private genresService: GenresService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {

    this.gameId = this.route.snapshot.params.id;
    this.initGameForm();
    await this.loadGame();
    await this.loadDevelopers();
    await this.loadPublishers();
    await this.loadGenres();
    this.patchForms();

  }

  initGameForm() {

    this.gameForm = this.fb.group({

      name: ['', [
        Validators.required,
      ]],
      description: [''],
      developerId: [
        '', Validators.required
      ],
      publisherId: [''],
      genres: this.fb.array([]),

    });

  }

  async loadGenres() {

    this.genres = await this.genresService
      .getAllGenres()
      .toPromise();

  }

  async loadGame() {

    this.game = await this.gamesService
      .getGame(this.gameId)
      .toPromise();

  }

  async loadDevelopers() {

    this.developers = await this.developersService
      .getAllDevelopers()
      .toPromise();

  }

  async loadPublishers() {

    this.publishers = await this.publishersService
      .getAllPublishers()
      .toPromise();

  }

  patchForms() {

    this.gameForm.patchValue(this.game);

    let checkedGenres = this.game.gameXrefGenre
      .map(data => data.genreId);

    let gameFormGenres = this.gameFormGenres;

    this.genres.forEach(genre => {

      let state = checkedGenres.includes(genre.genreId);
      gameFormGenres.push(this.fb.control(state));

    });

  }

  async updateGame() {

    let {
      name,
      description,
      developerId,
      publisherId,
      genres,
    } = this.gameForm.value;

    let checkedGenres = this.genres.filter((genre, index) => genres[index]);

    let gameXrefGenre = checkedGenres.map(genre => {

      return {
        gameId: this.gameId,
        genreId: genre.genreId,
        genre
      } as GameXrefGenre;

    });

    let data = {
      gameId: this.gameId,
      name,
      description,
      developerId,
      publisherId,
      gameXrefGenre,
    } as Game;

    console.log(data);

    await this.gamesService
      .updateGame(data)
      .toPromise();

    await this.loadGame();

  }

  get gameFormGenres() {
    return this.gameForm.get('genres') as FormArray;
  }

}
