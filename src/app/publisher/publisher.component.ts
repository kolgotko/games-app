import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublishersService } from '../publishers.service';
import { GameInterface } from '../interfaces/game.interface';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  publisherId = 0;
  name = '';
  games: GameInterface[] = [];

  constructor(
    private router: ActivatedRoute,
    private publishersService: PublishersService
  ) { }

  ngOnInit() {

    this.publisherId = this.router.snapshot.params.id;
    this.loadPublishers();

  }

  loadPublishers() {

    this.publishersService.getPublisher(this.publisherId)
      .subscribe(publisher => {

        this.name = publisher.name;
        this.games = publisher.game;

      });

  }

}
