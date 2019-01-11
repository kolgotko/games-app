import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  id: string;

  constructor(router: ActivatedRoute) {

    this.id = router.snapshot.params.id;

  }

  ngOnInit() {
  }

}
