import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GenresService } from '../genres.service';
import { Genre } from '../interfaces/genre';

@Component({
  selector: 'app-genre-editor',
  templateUrl: './genre-editor.component.html',
  styleUrls: ['./genre-editor.component.scss']
})
export class GenreEditorComponent implements OnInit {

  @Input() genre: Genre;
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

    this.genre = await this.genresService
      .getGenre(this.genre.genreId)
      .toPromise();

  }

  async commitEditorChanges() {

    let data = {
      genreId: this.genre.genreId,
      name: this.control.value,
    };

    await this.genresService
      .updateGenre(data)
      .toPromise();

    await this.loadGenre();
    this.hideEditor();
    this.update.emit();

  }

  async deleteGenre() {

    await this.genresService
      .deleteGenre(this.genre.genreId)
      .toPromise();

    this.del.emit();

  }

}
