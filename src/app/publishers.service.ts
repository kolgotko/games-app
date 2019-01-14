import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publisher } from './interfaces/publisher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  private readonly url: string = `${environment.apiUrl}/Publishers`;

  constructor(
    private http: HttpClient,
  ) { }

  public getAllPublishers(): Observable<Publisher[]> {

    return this.http.get<Publisher[]>(this.url);

  }

  public getPublisher(id): Observable<Publisher> {

    return this.http.get<Publisher>(`${this.url}/${id}`);

  }

  public deletePublisher(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

  public createPublisher(publisher: Publisher): Observable<any> {

    return this.http.post(this.url, publisher);

  }

  public updatePublisher(data: Publisher): Observable<any> {

    return this.http.put(`${this.url}/${data.publisherId}`, data);

  }

}
