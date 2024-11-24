import { Component, Input } from '@angular/core';
import { ITopic } from '../../store/search.models';
import { Router } from '@angular/router';

@Component({
  selector: 'topic-card',
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {
  @Input( {required: true }) topic: ITopic;
  @Input( {required: true }) searchTerm: string;

  constructor(private router: Router) {}

  gotToTopic(id: number): void {
    this.router.navigate(['topics',id]);
  }
}
