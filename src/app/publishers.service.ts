import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  private readonly url: string = "//pulter.tv/0CD29A8C-8968-4D0F-9F00-921DDDD938C3/api/Publishers";

  constructor(
    private http: HttpClient,
  ) { }

  public getAllPublishers() {

    return this.http.get(this.url);

  }
}
