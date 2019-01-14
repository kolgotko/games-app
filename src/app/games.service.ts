import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GameInterface } from './interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly url = `${environment.apiUrl}/Games`;
  private http: HttpClient;

  constructor(http: HttpClient) {

    this.http = http;

  }

  public getAllGames(): Observable<GameInterface[]> {

    return this.http.get<GameInterface[]>(this.url);

  }

  public getGame(id: number): Observable<GameInterface> {

    return this.http.get<GameInterface>(`${this.url}/${id}`);

  }

  public createGame(data: GameInterface): Observable<any> {

    return this.http.post<GameInterface>(this.url, data);

  }

  public updateGame(data: GameInterface): Observable<any> {

    return this.http.put(`${this.url}/${data.gameId}`, data);

  }

  public deleteGame(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

}
