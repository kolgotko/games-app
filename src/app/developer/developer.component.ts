import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { GameInterface } from '../interfaces/game.interface';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  developerId: number = 0;
  title: string = "";
  games: GameInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private developersService: DevelopersService,
  ) { }

  ngOnInit() {

    let id = this.router.snapshot.params.id;
    this.developerId = id;

    this.developersService.getDeveloper(id)
      .subscribe(developer => {

        this.title = developer.name;
        this.games = developer.game;

      });

  }

}
