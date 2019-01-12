import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevelopersService } from '../developers.service';
import { Developer } from '../interfaces/developer';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  title: string = "";
  games: Game[] = [];

  constructor(
    private router: ActivatedRoute,
    private developersService: DevelopersService,
  ) { }

  ngOnInit() {

    let id = this.router.snapshot.params.id;

    this.developersService.getDeveloper(id)
      .subscribe(developer => {

        this.title = developer.name;
        this.games = developer.game;

      });

  }

}
