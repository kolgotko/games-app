import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenresService } from '../genres.service';
import { Genre } from '../interfaces/genre';

@Component({
  selector: 'app-genres-editor',
  templateUrl: './genres-editor.component.html',
  styleUrls: ['./genres-editor.component.scss']
})
export class GenresEditorComponent implements OnInit {

  genres: Genre[] = [];
  newGenreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private genresService: GenresService,
  ) { }

  ngOnInit() {

    this.initNewGenreForm();
    this.loadGenres();

  }

  initNewGenreForm() {

    this.newGenreForm = this.fb.group({
      name: [''],
    });

  }

  loadGenres() {

    this.genresService.getAllGenres()
      .subscribe(data => {
        this.genres = data;
      });

  }

  createGenre() {

    let data: Genre = {
      genreId: 0,
      ...this.newGenreForm.value,
    };

    this.genresService.createGenre(data)
      .subscribe(_ => {

        this.loadGenres();
        this.newGenreForm.reset();

      });

  }

  deleteGenre(id: number) {

    this.genresService.deleteGenre(id)
      .subscribe(_ => {
        this.loadGenres();
      });

  }

}
