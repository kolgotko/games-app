import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import { GameInterface } from '../interfaces/game.interface';
import * as Noty from 'noty';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  developerId = 0;
  developer: DeveloperInterface;
  games: GameInterface[] = [];
  load = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private developersService: DevelopersService,
  ) { }

  ngOnInit() {

    this.route.params.pipe(switchMap(params => {

      return this.developersService.getDeveloper(params.id);

    }))
      .subscribe(developer => {

        this.developer = developer;
        this.games = developer.game;
        this.load = true;

      }, error => {

        new Noty({
          text: `Error load developer data. Details: ${error.message}`,
          type: 'error',
          timeout: false,
        })
          .show();

        this.router.navigate(['/']);

      });

  }

}
