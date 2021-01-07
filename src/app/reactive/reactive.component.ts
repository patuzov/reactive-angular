import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-reactive',
  template: `
    <div *ngFor="let item of stories | async">
      <a [href]="item.url" target="_blank">{{item.title}}</a>
      (<a [href]="item.discussion" target="_blank">{{item.comments.length}} comments</a>)
    </div>
  `,
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  stories = this.storySvc.news();
  constructor(private storySvc: StoryService) { }

  ngOnInit(): void {
  }

}
