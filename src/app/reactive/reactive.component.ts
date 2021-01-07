import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
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
