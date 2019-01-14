import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameXrefGenreInterface } from './interfaces/game-xref-genre.interface';
import { GameInterface } from './interfaces/game.interface';
import { GenreInterface } from './interfaces/genre.interface';

@Injectable({
  providedIn: 'root'
})
export class GameXrefGenresService {

  private readonly url = `${environment.apiUrl}/GameXrefGenres`;

  constructor(
    private http: HttpClient,
  ) { }

  public addGenreToGame(xref: GameXrefGenreInterface): Observable<any> {

    return this.http.post(this.url, xref);

  }

  public deleteGenreFromGame(gameId: number, genreId: number): Observable<any> {

    return this.http.delete(`${this.url}/${gameId}?genre_id=${genreId}`);

  }

}
