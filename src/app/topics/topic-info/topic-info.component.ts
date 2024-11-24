import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITopic } from '../../store/search.models';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrl: './topic-info.component.scss'
})
export class TopicInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('header') header: ElementRef;
  @ViewChild('body') body: ElementRef;
  @ViewChild('btn') btn: MatButton;

  topic: ITopic;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data) => {
        this.topic = data['topic'];
        console.log(this.topic);
      }
    );
  }

  ngAfterViewInit(): void {
    const reservedSpace = 30; //30 - distance between btn and body
    const difHeight = this.header.nativeElement.offsetHeight - this.body.nativeElement.offsetTop;
    const btnPosX = this.body.nativeElement.offsetHeight - difHeight + reservedSpace; 
    this.btn._elementRef.nativeElement.style.setProperty('top', `${btnPosX}px`);
    this.btn._elementRef.nativeElement.style.setProperty('left', `150px`);
  }


  goHome(): void {
    this.router.navigateByUrl('/');
  }

}
