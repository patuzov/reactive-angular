import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { HackerNewsService } from './hacker-news.service';
import { News } from './news';
import { CognitiveService } from './cognitive.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private hnSvc: HackerNewsService, private cognitiveSvc: CognitiveService) { }

  news(): Observable<News> {
    return this.hnSvc.topNewsIds().pipe(
      mergeMap(ids => from(ids)),
      mergeMap(id => this.hnSvc.story(id)),
      map(hackerNews => new News(hackerNews)),
      filter((news: News) => news.type === 'story'),
      mergeMap(story => forkJoin([
        of(story), 
        this.cognitiveSvc.sentiment(story.title)
      ])),
      map(([story, sentiment]) => {
        story.sentiment = sentiment;
        return story;
      })
    );
  }
}
