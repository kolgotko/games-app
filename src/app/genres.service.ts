import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly url = `${environment.apiUrl}/Genres`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllGenres() {

    return this.http.get<Genre[]>(this.url);

  }

  createGenre(data: Genre) {

    return this.http.post(this.url, data);

  }

  deleteGenre(id: number) {

    return this.http.delete(`${this.url}/${id}`);

  }

  updateGenre(data: Genre) {

    return this.http.put(`${this.url}/${data.genreId}`, data);

  }

}
