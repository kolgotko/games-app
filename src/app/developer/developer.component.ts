import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { GameInterface } from '../interfaces/game.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  developerId = 0;
  developer: DeveloperInterface;
  title = '';
  games: GameInterface[] = [];
  load = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private developersService: DevelopersService,
  ) { }

  async ngOnInit() {

    const id = this.route.snapshot.params.id;
    this.developerId = id;

    await this.loadDeveloper();

    this.games = this.developer.game;
    this.load = true;

  }

  async loadDeveloper() {

    try {

      this.developer = await this.developersService
        .getDeveloper(this.developerId)
        .toPromise();

    } catch (error) {

      new Noty({
        text: `Error load developer. Please try later. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

      this.router.navigate(['/']);

    }

  }

}
