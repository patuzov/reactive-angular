import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap} from 'rxjs/operators';
import { News } from '../news';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit, OnDestroy {
  
  stories: News[] = [];
  subscription: Subscription;
  possibleSentiments = ['positive', 'neutral', 'negative'];

  constructor(
    private storySvc: StoryService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.fragment.pipe(
      map(fragment => fragment === 'positive' ? ['positive'] : undefined),
      tap(_ => this.stories = []),
      switchMap(sentiments => this.storySvc.news(sentiments))
    ).subscribe(news => {
      this.stories.push(news);
    });
  }

  onFilter(showPositive: boolean): void {
    this.router.navigateByUrl(`#${showPositive ? 'positive' : ''}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
