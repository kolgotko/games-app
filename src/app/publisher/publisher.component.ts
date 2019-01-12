import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublishersService } from '../publishers.service';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  name: string = '';
  games: Game[] = [];

  constructor(
    private router: ActivatedRoute,
    private publishersService: PublishersService
  ) { }

  ngOnInit() {

    let id = this.router.snapshot.params.id;
    this.publishersService.getPublisher(id)
      .subscribe(publisher => {

        this.name = publisher.name;
        this.games = publisher.game;

      });

  }

}
