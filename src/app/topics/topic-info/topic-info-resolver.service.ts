
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTopicsSelector } from '../../store/search.selectors';
import { ITopic } from '../../store/search.models';

@Injectable()
export class TopicInfoResolverService implements Resolve<ITopic> {

    searchedTopics$ = this.store.select(selectTopicsSelector);
    
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.searchedTopics$.pipe(
        tap(topics => {
          if (!topics) {
            this.router.navigateByUrl('/')
          }
        }),
        map(topics => topics?.filter(topic => topic.id === +route.params['id'])[0]));
  }
}