import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchAction } from '../store/search.actions';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit {

  constructor (private store: Store){}

  keyControl = new FormControl();
  searchForm = new FormGroup({
    key: this.keyControl
  }) 
  ngOnInit(): void {
    this.searchForm.controls.key.valueChanges.pipe(debounce(() => timer(500))).subscribe(value =>
      this.store.dispatch(SearchAction({key: value}))
    )
  }
}
