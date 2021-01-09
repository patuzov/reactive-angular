import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { HackerNewsService } from './hacker-news.service';
import { News } from './news';
import { CognitiveService } from './cognitive.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private hnSvc: HackerNewsService, private cognitiveSvc: CognitiveService) { }

  story(id: string): Observable<News> {
    return this.hnSvc.story(id).pipe(
      filter(story => story.type === 'story'),
      map(story => new News(story)),
      mergeMap(story =>
        this.cognitiveSvc.sentiment(story.title).pipe(
          map(sentiment => {
            story.sentiment = sentiment;
            return story;
          })
        )
      ));
  }

  news(sentiments: string[] = ['positive', 'neutral', 'negative']): Observable<News> {
   console.log(sentiments);
    return this.hnSvc.topNewsIds().pipe(
      mergeMap(ids => from(ids)),
      mergeMap(id => this.hnSvc.story(id)),
      filter(story => story.type === 'story'),
      map(story => new News(story)),
      mergeMap(story =>
        this.cognitiveSvc.sentiment(story.title).pipe(
          map(sentiment => {
            story.sentiment = sentiment;
            return story;
          })
        )
      ),
      filter(story => sentiments.includes(story.sentiment))
    );
  }
}
