import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HackerNewsService } from './hacker-news.service';
import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private hnSvc: HackerNewsService) { }

  news(): Observable<News[]> {
    return this.hnSvc.topNewsIds().pipe(
      switchMap((ids: string[]) => {
        const news = ids.map(id => this.hnSvc.story(id));
        return forkJoin(news);
      }),
      map((news: any[]) => news.map(s => {
        return {
          title: s.title,
          url: s.url,
          type: s.type,
          discussion: `${environment.hnWeb}/item?id=${s.id}`,
          comments: s.kids
        };
      })),
      tap(x => console.log(x)),
      map((news: News[]) => news.filter(n => n.type === 'story'))
    );
  }
}
