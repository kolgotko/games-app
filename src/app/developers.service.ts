import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Developer } from './interfaces/developer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  private readonly url = `${environment.apiUrl}/Developers`;

  constructor(
    private http: HttpClient,
  ) { }

  public getAllDevelopers(): Observable<Developer[]> {

    return this.http.get<Developer[]>(this.url);

  }

  public getDeveloper(id: number): Observable<Developer> {

    return this.http.get<Developer>(`${this.url}/${id}`);

  }

  public deleteDeveloper(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

  public createDeveloper(name: string): Observable<any> {

    return this.http.post(this.url, { id: 0, name });

  }

  public updateDeveloper(data: Developer): Observable<any> {

    return this.http.put(`${this.url}/${data.developerId}`, data);

  }

}
