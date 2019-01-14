import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublisherInterface } from './interfaces/publisher.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  private readonly url: string = `${environment.apiUrl}/Publishers`;

  constructor(
    private http: HttpClient,
  ) { }

  public getAllPublishers(): Observable<PublisherInterface[]> {

    return this.http.get<PublisherInterface[]>(this.url);

  }

  public getPublisher(id): Observable<PublisherInterface> {

    return this.http.get<PublisherInterface>(`${this.url}/${id}`);

  }

  public deletePublisher(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

  public createPublisher(publisher: PublisherInterface): Observable<any> {

    return this.http.post(this.url, publisher);

  }

  public updatePublisher(data: PublisherInterface): Observable<any> {

    return this.http.put(`${this.url}/${data.publisherId}`, data);

  }

}
