import { Component, OnInit, Input, Output } from '@angular/core';
import { GenreInterface } from '../interfaces/genre.interface';

@Component({
  selector: 'app-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.scss']
})
export class GenreItemComponent implements OnInit {

  @Input() genre: GenreInterface;

  constructor() { }

  ngOnInit() {
  }

}
