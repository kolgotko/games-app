import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DeveloperInterface } from './interfaces/developer.interface';
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

  public getAllDevelopers(): Observable<DeveloperInterface[]> {

    return this.http.get<DeveloperInterface[]>(this.url);

  }

  public getDeveloper(id: number): Observable<DeveloperInterface> {

    return this.http.get<DeveloperInterface>(`${this.url}/${id}`);

  }

  public deleteDeveloper(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

  public createDeveloper(data: DeveloperInterface): Observable<any> {

    return this.http.post(this.url, data);

  }

  public updateDeveloper(data: DeveloperInterface): Observable<any> {

    return this.http.put(`${this.url}/${data.developerId}`, data);

  }

}
