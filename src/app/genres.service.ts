import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './interfaces/genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly url = `${environment.apiUrl}/Genres`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllGenres(): Observable<Genre[]> {

    return this.http.get<Genre[]>(this.url);

  }

  createGenre(data: Genre): Observable<any> {

    return this.http.post(this.url, data);

  }

  deleteGenre(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

  updateGenre(data: Genre): Observable<any> {

    return this.http.put(`${this.url}/${data.genreId}`, data);

  }

}
