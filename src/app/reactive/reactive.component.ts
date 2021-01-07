import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-reactive',
  template: `
    <div *ngFor="let item of stories">
      <a [href]="item.url" target="_blank">{{item.title}}</a>
      (<a [href]="item.discussion" target="_blank">{{item.comments?.length}} comments</a>)
      [{{item.sentiment}}]
    </div>
  `,
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  stories: News[] = [];
  constructor(private storySvc: StoryService) { }

  ngOnInit(): void {    
    this.storySvc.news().subscribe(news => {
      this.stories.push(news);
    })
  }

}
