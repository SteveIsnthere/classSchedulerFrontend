import {Component} from '@angular/core';
import {dummyPost, Post} from "../data/models/Post";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  posts: Post[] = [dummyPost];

  constructor() {
  }

}
