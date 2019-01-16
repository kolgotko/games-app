import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishersService } from '../publishers.service';
import { GameInterface } from '../interfaces/game.interface';
import { PublisherInterface } from '../interfaces/publisher.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  publisherId = 0;
  publisher: PublisherInterface;
  games: GameInterface[] = [];
  load = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publishersService: PublishersService
  ) { }

  async ngOnInit() {

    this.publisherId = this.route.snapshot.params.id;
    await this.loadPublishers();
    this.load = true;

  }

  async loadPublishers() {

    try {

      this.publisher = await this.publishersService
        .getPublisher(this.publisherId)
        .toPromise();


      this.games = this.publisher.game;

    } catch (error) {

      new Noty({
        text: `Error loading publisher. Please try later. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

      this.router.navigate(['/']);

    }

  }

}
