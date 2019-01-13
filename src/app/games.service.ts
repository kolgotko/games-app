import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from './interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly url = `${environment.apiUrl}/Games`;
  private http: HttpClient;

  constructor(http: HttpClient) {

    this.http = http;

  }

  public getAllGames(): Observable<Game[]> {

    return this.http.get<Game[]>(this.url);

  }

  public getGame(id: number): Observable<Game> {

    return this.http.get<Game>(`${this.url}/${id}`);

  }

  public createGame(data: Game) {

    return this.http.post<Game>(this.url, data);

  }

  public updateGame(data: Game) {

    return this.http.put<Game>(`${this.url}/${data.gameId}`, data);

  }

  public deleteGame(id: number) {

    return this.http.delete(`${this.url}/${id}`);

  }

}
