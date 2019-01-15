import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GenresService } from '../genres.service';
import { GenreInterface } from '../interfaces/genre.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-genres-editor',
  templateUrl: './genres-editor.component.html',
  styleUrls: ['./genres-editor.component.scss']
})
export class GenresEditorComponent implements OnInit {

  genres: GenreInterface[] = [];
  newGenreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private genresService: GenresService,
  ) { }

  async ngOnInit() {

    this.initNewGenreForm();
    await this.loadGenres();

  }

  initNewGenreForm() {

    this.newGenreForm = this.fb.group({
      name: ['', Validators.required],
    });

  }

  async loadGenres() {

    try {

      this.genres = await this.genresService
        .getAllGenres()
        .toPromise();

    } catch (error) {

      new Noty({
        text: error.message,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  async createGenre() {

    let data: GenreInterface = {
      genreId: 0,
      ...this.newGenreForm.value,
    };

    try {

      await this.genresService
        .createGenre(data)
        .toPromise();

      await this.loadGenres();

      this.newGenreForm.reset();

      new Noty({
        text: `genre "${data.name}" created!`,
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: error.message,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  get newGenreFormName() { return this.newGenreForm.get('name') as FormControl; }

}
