import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoadAction, SearchAction } from '../store/search.actions';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { selectTopicsSelector } from '../store/search.selectors';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TopicsComponent implements OnInit {

  searchedTopics$ = this.store.select(selectTopicsSelector);
  keyPhrase: string;

  constructor (private store: Store){}

  keyControl = new FormControl();
  searchForm = new FormGroup({
    key: this.keyControl
  }) 
  ngOnInit(): void {
    this.store.dispatch(LoadAction());
    this.searchForm.controls.key.valueChanges.pipe(debounce(() => timer(500))).subscribe(value => {
      this.keyPhrase = value;
      this.store.dispatch(SearchAction({key: value}))
    }
    )
  }
}
