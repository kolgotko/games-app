import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';
import { GenresService } from '../genres.service';
import { GameInterface } from '../interfaces/game.interface';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import { GenreInterface } from '../interfaces/genre.interface';
import { GameXrefGenreInterface } from '../interfaces/game-xref-genre.interface';

@Component({
  selector: 'app-games-editor',
  templateUrl: './games-editor.component.html',
  styleUrls: ['./games-editor.component.scss']
})
export class GamesEditorComponent implements OnInit {

  games: GameInterface[] = [];
  developers: DeveloperInterface[] = [];
  publishers: PublisherInterface[] = [];
  genres: GenreInterface[] = [];
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

    let genresFormControl = this.fb.array([]);

    this.genres.forEach(genre => {

      genresFormControl.push(this.fb.control(false));

    });

    this.newGameForm.setControl('genres', genresFormControl);

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
      } as GameXrefGenreInterface;

    });

    let data = {
      gameId: 0,
      name,
      description,
      developerId,
      publisherId,
      gameXrefGenre: gameXrefGenre,
    } as GameInterface;

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
