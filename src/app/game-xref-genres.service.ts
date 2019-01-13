import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameXrefGenre } from './interfaces/game-xref-genre';
import { Game } from './interfaces/game';
import { Genre } from './interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GameXrefGenresService {

  private readonly url = `${environment.apiUrl}/GameXrefGenres`;

  constructor(
    private http: HttpClient,
  ) { }

  public addGenreToGame(xref: GameXrefGenre) {

    return this.http.post(this.url, xref);

  }

  public deleteGenreFromGame(gameId: number, genreId: number) {

    return this.http.delete(`${this.url}/${gameId}?genre_id=${genreId}`);

  }

}