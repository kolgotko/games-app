import { Component, OnInit, Input, Output } from '@angular/core';
import { GameInterface } from '../interfaces/game.interface';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() game: GameInterface;

  constructor() { }

  ngOnInit() {
  }

}
