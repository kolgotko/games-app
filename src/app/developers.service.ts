import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Developer } from './interfaces/developer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  private readonly url: string = "//pulter.tv/0CD29A8C-8968-4D0F-9F00-921DDDD938C3/api/Developers";

  constructor(
    private http: HttpClient,
  ) { }

  public getAllDevelopers(): Observable<Developer[]> {

    return this.http.get<Developer[]>(this.url);

  }

  public getDeveloper(id): Observable<Developer> {

    return this.http.get<Developer>(`${this.url}/${id}`);

  }

}
