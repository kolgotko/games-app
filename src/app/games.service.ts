import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from './interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly url: string = "//pulter.tv/0CD29A8C-8968-4D0F-9F00-921DDDD938C3/api/Games";
  private http: HttpClient;

  constructor(http: HttpClient) {

    this.http = http;

  }

  public getAllGames(): Observable<Game[]> {

    return this.http.get<Game[]>(this.url);

  }

  public getGame(id: string): Observable<Game> {

    return this.http.get<Game>(`${this.url}/${id}`);

  }

}
