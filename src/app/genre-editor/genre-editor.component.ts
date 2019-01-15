import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GenresService } from '../genres.service';
import { GenreInterface } from '../interfaces/genre.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-genre-editor',
  templateUrl: './genre-editor.component.html',
  styleUrls: ['./genre-editor.component.scss']
})
export class GenreEditorComponent implements OnInit {

  @Input() genre: GenreInterface;
  @Input() show: Boolean = false;
  @Output() del: EventEmitter<void> = new EventEmitter;
  @Output() update: EventEmitter<void> = new EventEmitter;
  control: FormControl;

  constructor(
    private fb: FormBuilder,
    private genresService: GenresService,
  ) { }

  ngOnInit() {

    this.control = this.fb.control(this.genre.name);

  }

  hideEditor() { this.show = false; }

  showEditor() { this.show = true; }

  async loadGenre() {

    try {

      this.genre = await this.genresService
        .getGenre(this.genre.genreId)
        .toPromise();

    } catch (error) {

      new Noty({
        text: error.message,
        type: error,
      })
        .show();

    }

  }

  async commitEditorChanges() {

    let data = {
      genreId: this.genre.genreId,
      name: this.control.value,
    };

    try {

      await this.genresService
        .updateGenre(data)
        .toPromise();

      this.hideEditor();

      await this.loadGenre();

      new Noty({
        text: 'genre saved!',
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: error.message,
        type: 'error',
      })
        .show();

    }

  }

  async deleteGenre() {

    try {

      await this.genresService
        .deleteGenre(this.genre.genreId)
        .toPromise();

      new Noty({
        text: `genre "${this.genre.name}" deleted!`,
        type: 'success',
      })
        .show();

      this.del.emit();

    } catch (error) {

      new Noty({
        text: error.message,
        type: 'error',
      })
        .show();

    }

  }

}
