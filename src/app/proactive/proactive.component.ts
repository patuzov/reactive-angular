import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../hacker-news.service';

@Component({
  selector: 'app-proactive',
  template: `
    <div *ngFor="let item of news">
      <a [href]="item.url" target="_blank">{{item.title}}</a>
    </div>
  `,
  styles: [
  ]
})
export class ProactiveComponent implements OnInit {

  news: any[];
  constructor(private hnSvc: HackerNewsService) { }

  ngOnInit(): void {
    this.news = [];
    this.hnSvc.topNewsIds().subscribe(ids => {
      ids.forEach(id => {
        this.hnSvc.story(id).subscribe(story => {
          if(story.type === 'story') {
            this.news.push(story);
          }
        })
      })
    })
  }
}
