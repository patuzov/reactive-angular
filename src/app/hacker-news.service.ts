import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  constructor(private httpClient: HttpClient) { }

  topNewsIds(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.hnApi}/topstories.json?limitToFirst=20&orderBy="$key"`);
  }

  story(id: string): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.hnApi}/item/${id}.json`);
  }
}
