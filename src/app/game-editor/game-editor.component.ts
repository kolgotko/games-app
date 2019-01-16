import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl
} from '@angular/forms';
import { GamesService } from '../games.service';
import { DevelopersService } from '../developers.service';
import { PublishersService } from '../publishers.service';
import { GameXrefGenresService } from '../game-xref-genres.service';
import { GenresService } from '../genres.service';
import { GameInterface } from '../interfaces/game.interface';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import { GenreInterface } from '../interfaces/genre.interface';
import { GameXrefGenreInterface } from '../interfaces/game-xref-genre.interface';
import * as Noty from 'noty';

enum Action {
  Check,
  Uncheck,
  Skip,
}

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent implements OnInit {

  gameId = 0;
  game: GameInterface;
  publishers: PublisherInterface[] = [];
  developers: DeveloperInterface[] = [];
  genres: GenreInterface[];
  gameForm: FormGroup;
  load = false;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private developersService: DevelopersService,
    private publishersService: PublishersService,
    private genresService: GenresService,
    private gameXrefGenresService: GameXrefGenresService,
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
    this.load = true;

  }

  initGameForm() {

    this.gameForm = this.fb.group({

      name: ['', [
        Validators.required,
      ]],
      description: [''],
      developerId: [
        '', [Validators.required]
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

    const checkedGenres = this.game.gameXrefGenre
      .map(data => data.genreId);

    const genresFormControl = this.fb.array([]);

    this.genres.forEach(genre => {

      const state = checkedGenres.includes(genre.genreId);
      genresFormControl.push(this.fb.control(state));

    });

    this.gameForm.setControl('genres', genresFormControl);

  }

  async updateGameAndGenres() {

    if (this.gameForm.invalid) {
      Object.values(this.gameForm.controls)
        .forEach(control => {
          control.markAsTouched();
        });

      return;
    }

    await this.updateGame();
    await this.updateGameGenres();

    await this.loadGame();
    this.patchForms();

  }

  async updateGame() {

    const {
      name,
      description,
      developerId,
      publisherId,
      genres,
    } = this.gameForm.value;

    const data = {
      gameId: this.gameId,
      name,
      description,
      developerId,
      publisherId,
    } as GameInterface;

    try {

      await this.gamesService
        .updateGame(data)
        .toPromise();

      new Noty({
        text: 'game data saved!',
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: `Error update game data. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  async updateGameGenres() {

    const changesForGenres = this.getChangesForGenres();

    const promises = changesForGenres
      .filter(({ action }) => action !== Action.Skip)
      .map(({ action, genre }) => {

        if (action === Action.Check) {
          return this.gameXrefGenresService
            .addGenreToGame({
              gameId: this.gameId,
              genreId: genre.genreId,
            })
            .toPromise();
        } else {
          return this.gameXrefGenresService
            .deleteGenreFromGame(this.gameId, genre.genreId)
            .toPromise();
        }

      });

    try {

      await Promise.all(promises);

      new Noty({
        text: 'game genres saved!',
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: `Error update game genres. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  private getChangesForGenres() {

    const gameGenres = this.game.gameXrefGenre.map(data => data.genreId);
    const genresForm = this.gameForm.value.genres;

    return this.genres.map((genre, i) => {

      if (genresForm[i] && !gameGenres.includes(genre.genreId)) {

        return { action: Action.Check, genre };

      } else if (!genresForm[i] && gameGenres.includes(genre.genreId)) {

        return { action: Action.Uncheck, genre };

      } else {

        return { action: Action.Skip, genre };

      }

    });

  }

  get gameFormName() { return this.gameForm.get('name') as FormControl; }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  get gameFormDeveloperId() {
    return this.gameForm.get('developerId') as FormControl;
  }

  get gameFormGenres() {
    return this.gameForm.get('genres') as FormArray;
  }

}
