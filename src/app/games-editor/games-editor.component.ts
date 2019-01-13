import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  selector: 'app-games-editor',
  templateUrl: './games-editor.component.html',
  styleUrls: ['./games-editor.component.scss']
})
export class GamesEditorComponent implements OnInit {

  games: Game[] = [];
  developers: Developer[] = [];
  publishers: Publisher[] = [];
  genres: Genre[] = [];
  newGameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
    private genresService: GenresService,
  ) { }

  async ngOnInit() {

    this.initNewFormGroup();
    await this.loadGames();
    await this.loadDevelopers();
    await this.loadPublishers();
    await this.loadGenres();

    this.patchGenres();

  }

  initNewFormGroup() {

    this.newGameForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      developerId: ['', Validators.required],
      publisherId: [''],
      genres: this.fb.array([]),
    });

  }

  patchGenres() {

    let newGameFormGenres = this.newGameFormGenres;
    this.genres.forEach(genre => {

      newGameFormGenres.push(this.fb.control(false));

    });

  }

  async loadGames() {

    this.games = await this.gamesService
      .getAllGames()
      .toPromise();

  }

  async loadGenres() {

    this.genres = await this.genresService
      .getAllGenres()
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

  async createGame() {

    let {
      name,
      description,
      developerId,
      publisherId,
      genres,
    } = this.newGameForm.value;

    let checkedGenres = this.genres.filter((genre, index) => genres[index]);

    let gameXrefGenre = checkedGenres.map(genre => {

      return {
        genreId: genre.genreId,
      } as GameXrefGenre;

    });

    let data = {
      gameId: 0,
      name: name as string,
      description: description as string,
      developerId: Number(developerId),
      publisherId: Number(publisherId),
      gameXrefGenre: gameXrefGenre,
    } as Game;

    await this.gamesService.createGame(data)
      .toPromise();

    this.newGameForm.reset();
    await this.loadGames();

  }

  async deleteGame(id: number) {

    await this.gamesService.deleteGame(id)
    .toPromise();

    await this.loadGames();

  }

  get newGameFormGenres() {
    return this.newGameForm.get('genres') as FormArray;
  }

}
