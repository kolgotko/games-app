import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, AbstractControl, FormGroup, FormControl, FormArray, Validators
} from '@angular/forms';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';
import { GenresService } from '../genres.service';
import { GameInterface } from '../interfaces/game.interface';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import { GenreInterface } from '../interfaces/genre.interface';
import { GameXrefGenreInterface } from '../interfaces/game-xref-genre.interface';
import * as Noty from 'noty';

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
  load = false;

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

    this.load = true;

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

    const genresFormControl = this.fb.array([]);

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

    if (this.newGameForm.invalid) {

      Object.values(this.newGameForm.controls)
        .forEach(control => {
          control.markAsTouched();
        });

      return;

    }

    const {
      name,
      description,
      developerId,
      publisherId,
      genres,
    } = this.newGameForm.value;

    const checkedGenres = this.genres.filter((genre, index) => genres[index]);

    const gameXrefGenre = checkedGenres.map(genre => {

      return {
        genreId: genre.genreId,
      } as GameXrefGenreInterface;

    });

    const data = {
      gameId: 0,
      name,
      description,
      developerId,
      publisherId,
      gameXrefGenre: gameXrefGenre,
    } as GameInterface;

    try {

      await this.gamesService
        .createGame(data)
        .toPromise();

      new Noty({
        text: `game "${data.name}" created!`,
        type: 'success',
      })
        .show();

      this.newGameForm.reset();
      await this.loadGames();

    } catch (error) {

      new Noty({
        text: `Error create game. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  async deleteGame(id: number) {

    await this.gamesService.deleteGame(id)
    .toPromise();

    new Noty({
      text: `game deleted!`,
      type: 'success',
    })
      .show();

    await this.loadGames();

  }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  get newGameFormName() {
    return this.newGameForm.get('name') as FormControl;
  }

  get newGameFormDeveloperId() {
    return this.newGameForm.get('developerId') as FormControl;
  }

  get newGameFormGenres() {
    return this.newGameForm.get('genres') as FormArray;
  }

}
