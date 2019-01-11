import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly url: string = "//pulter.tv/0CD29A8C-8968-4D0F-9F00-921DDDD938C3/api/Games";
  private http: HttpClient;

  constructor(http: HttpClient) {

    this.http = http;

  }

  public getAllGames() {

    return this.http.get(this.url);

  }
}
