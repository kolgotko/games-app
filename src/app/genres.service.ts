import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GenreInterface } from './interfaces/genre.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly url = `${environment.apiUrl}/Genres`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllGenres(): Observable<GenreInterface[]> {

    return this.http.get<GenreInterface[]>(this.url);

  }

  getGenre(id: number): Observable<GenreInterface> {

    return this.http.get<GenreInterface>(`${this.url}/${id}`);

  }

  createGenre(data: GenreInterface): Observable<any> {

    return this.http.post(this.url, data);

  }

  deleteGenre(id: number): Observable<any> {

    return this.http.delete(`${this.url}/${id}`);

  }

  updateGenre(data: GenreInterface): Observable<any> {

    return this.http.put(`${this.url}/${data.genreId}`, data);

  }

}
